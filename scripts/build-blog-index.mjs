#!/usr/bin/env node
// Rebuilds the post cards in blog.html and adds missing entries to sitemap.xml.
// It reads every blog-*.html file, so a new post needs no manual index edit.
//
//   node scripts/build-blog-index.mjs           update the files
//   node scripts/build-blog-index.mjs --check   exit 1 if the files are out of date
//
// Each post must have: an <h1>, a meta description, "Mon D · N min read" in its
// header, and a datePublished value in its JSON-LD. Older posts are listed below.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://aerocardia.com';
const FALLBACK_IMAGE = 'assets/img/aerocardia-logo.png';
const START = '<!-- BLOG-CARDS:START -->';
const END = '<!-- BLOG-CARDS:END -->';

// These posts show a month and day but no year or datePublished. The dates are
// used only to sort them and are never displayed. The year is an assumption;
// the order matches the homepage list.
const LEGACY_SORT_DATES = {
  'blog-how-aro2-senses-your-breath.html': '2026-09-17',
  'blog-founder-showcase.html': '2026-09-11',
  'blog-tour-de-france-vo2-max.html': '2026-08-20',
  'blog-vo2-max-measurement-guide.html': '2026-07-27',
  'blog-vo2-max-healthspan.html': '2026-07-13',
};

const stripTags = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? '';

function readPost(file) {
  const html = readFileSync(join(root, file), 'utf8');
  const start = html.indexOf('<article');
  const end = html.indexOf('</article>');
  if (start < 0 || end < 0) throw new Error('no <article> element');
  const article = html.slice(start, end);

  const title = stripTags(article.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
  if (!title) throw new Error('no <h1> in the article');

  const summary = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!summary) throw new Error('no meta description');

  const meta = stripTags(article).match(/([A-Z][a-z]{2} \d{1,2}) · (\d+ min read)/);
  if (!meta) throw new Error('no "Mon D · N min read" text in the article header');

  const sortDate =
    html.match(/"datePublished":\s*"(\d{4}-\d{2}-\d{2})/)?.[1] ?? LEGACY_SORT_DATES[file];
  if (!sortDate) throw new Error('no datePublished in the JSON-LD');

  const heroTag = article.match(/<img\b[^>]*>/)?.[0];
  return {
    file,
    title,
    summary,
    date: meta[1],
    readTime: meta[2],
    sortDate,
    image: heroTag ? attr(heroTag, 'src') : FALLBACK_IMAGE,
    imageAlt: heroTag ? attr(heroTag, 'alt') : '',
    hasHero: Boolean(heroTag),
  };
}

function card(post) {
  const fit = post.hasHero ? 'object-cover' : 'object-contain p-space-2xl';
  return `<a class="reveal group flex flex-col overflow-hidden rounded-2xl bg-surface-card hover:bg-surface-card-elevated border-subtle transition-all duration-300" href="${post.file}">
<div class="aspect-[16/9] overflow-hidden bg-surface-container-lowest"><img alt="${post.imageAlt}" class="w-full h-full ${fit}" loading="lazy" src="${post.image}"/></div>
<div class="flex flex-col flex-1 gap-space-sm p-space-lg">
<p class="font-mono text-caption text-text-tertiary">${post.date} · ${post.readTime}</p>
<h2 class="font-headline-md text-headline-md text-text-primary group-hover:text-primary-container transition-colors">${post.title}</h2>
<p class="font-body-sm text-body-sm text-text-secondary">${post.summary}</p>
<span class="mt-auto pt-space-sm inline-flex items-center gap-space-xs text-primary-container font-mono text-caption font-semibold"><span>Read the post</span><span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span></span>
</div>
</a>`;
}

const withEol = (text, sample) => (sample.includes('\r\n') ? text.replace(/\r?\n/g, '\r\n') : text);

function buildIndex(current, posts) {
  const from = current.indexOf(START);
  const to = current.indexOf(END);
  if (from < 0 || to < 0) throw new Error(`blog.html is missing the ${START} / ${END} markers`);
  const cards = `${START}\n${posts.map(card).join('\n')}\n`;
  return current.slice(0, from) + withEol(cards, current) + current.slice(to);
}

function buildSitemap(current, posts) {
  const urls = [`${SITE}/blog`, ...posts.map((post) => `${SITE}/${post.file}`)];
  const missing = urls.filter((url) => !current.includes(`<loc>${url}</loc>`));
  if (!missing.length) return current;
  const lines = missing.map((url) => `  <url><loc>${url}</loc></url>\n`).join('');
  return current.replace('</urlset>', withEol(lines, current) + '</urlset>');
}

const files = readdirSync(root).filter((name) => /^blog-.*\.html$/.test(name));
const problems = [];
const posts = files.flatMap((file) => {
  try {
    return [readPost(file)];
  } catch (error) {
    problems.push(`${file}: ${error.message}`);
    return [];
  }
});
if (problems.length) {
  console.error(`Blog index not updated. Fix these posts:\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
posts.sort((a, b) => b.sortDate.localeCompare(a.sortDate) || a.file.localeCompare(b.file));

const outputs = [
  ['blog.html', (text) => buildIndex(text, posts)],
  ['sitemap.xml', (text) => buildSitemap(text, posts)],
];
const check = process.argv.includes('--check');
let stale = false;
for (const [name, build] of outputs) {
  const path = join(root, name);
  const current = readFileSync(path, 'utf8');
  const next = build(current);
  if (next === current) continue;
  stale = true;
  if (!check) writeFileSync(path, next);
  console.log(`${check ? 'Out of date' : 'Updated'}: ${name}`);
}
console.log(`${posts.length} posts checked.`);
if (check && stale) process.exit(1);
