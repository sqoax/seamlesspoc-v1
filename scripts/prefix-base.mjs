// CI-only post-build step for GitHub Pages project URLs.
// The site is authored with root-absolute paths (correct for the final
// custom-domain deploy). GitHub project pages serve under /<repo>/, so this
// rewrites root-relative URLs in the built output. Never run for local dev
// or a root-domain deploy.
//
// Usage: node scripts/prefix-base.mjs <dist-dir> </base>

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const [, , distDir, base] = process.argv;
if (!distDir || !base || !base.startsWith('/') || base === '/') {
  console.error('usage: node scripts/prefix-base.mjs <dist-dir> </base>');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

let touched = 0;
for (const file of walk(distDir)) {
  const ext = extname(file);
  if (!['.html', '.css'].includes(ext)) continue;
  let text = readFileSync(file, 'utf8');
  const before = text;

  // url(/...) in CSS and inline styles
  text = text.replace(/url\(\s*\/(?!\/)/g, `url(${base}/`);

  if (ext === '.html') {
    // href/src/action/formaction/poster="/..." (not protocol-relative "//")
    text = text.replace(
      /(href|src|action|formaction|poster)="\/(?!\/)/g,
      `$1="${base}/`
    );
    // srcset="/a.webp 1x, /b.webp 2x"
    text = text.replace(/srcset="([^"]*)"/g, (m, v) =>
      `srcset="${v.replace(/(^|,\s*)\/(?!\/)/g, `$1${base}/`)}"`
    );
    // meta-refresh redirects: content="0;url=/services"
    text = text.replace(/url=\/(?!\/)/g, `url=${base}/`);
  }

  if (text !== before) {
    writeFileSync(file, text);
    touched++;
  }
}
console.log(`prefix-base: rewrote ${touched} files with base ${base}`);
