import {readdir, readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const htmlPath = resolve('dist/index.html');
const assetsPath = resolve('dist/assets');
const robotsPath = resolve('dist/robots.txt');
const sitemapPath = resolve('dist/sitemap.xml');
const html = await readFile(htmlPath, 'utf8');
const robots = await readFile(robotsPath, 'utf8');
const sitemap = await readFile(sitemapPath, 'utf8');
const assetFiles = await readdir(assetsPath);
const cssFiles = assetFiles.filter((file) => file.endsWith('.css'));
const css = (await Promise.all(
    cssFiles.map((file) => readFile(resolve(assetsPath, file), 'utf8')),
)).join('\n');

const failures = [];
const rawSiteUrl = process.env.VITE_SITE_URL
    || process.env.VERCEL_PROJECT_PRODUCTION_URL
    || process.env.VERCEL_URL;
const expectedSiteUrl = rawSiteUrl
    ? (/^https?:\/\//.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`).replace(/\/+$/, '')
    : undefined;

if (!html.includes('src="/assets/')) {
    failures.push('Le bundle JavaScript ne respecte pas la racine Vercel.');
}

if (!html.includes('href="/assets/')) {
    failures.push('Les feuilles de style ne respectent pas la racine Vercel.');
}

if (html.includes('/portfolio-ts/')) {
    failures.push('Le HTML contient encore une référence au sous-chemin GitHub Pages.');
}

if (!/<meta property="og:image" content="https?:\/\/[^"]+\/assets\/eric-adelaide-beaubrun\.webp"\/>/.test(html)) {
    failures.push('Les métadonnées sociales ne contiennent pas une image absolue.');
}

if (html.includes('ericbeaubrun.github.io')) {
    failures.push('Le HTML contient encore le domaine GitHub Pages.');
}

if ([robots, sitemap].some((file) => file.includes('ericbeaubrun.github.io'))) {
    failures.push('Les fichiers SEO contiennent encore le domaine GitHub Pages.');
}

if (!html.includes('<link rel="canonical" href="http')) {
    failures.push('Le canonical de production est absent.');
}

if (!robots.includes('Sitemap: http') || !sitemap.includes('<loc>http')) {
    failures.push('Les fichiers robots.txt ou sitemap.xml ne contiennent pas une URL absolue.');
}

if (expectedSiteUrl && ![html, robots, sitemap].every((file) => file.includes(expectedSiteUrl))) {
    failures.push(`Le domaine de production ${expectedSiteUrl} n'est pas utilisé partout.`);
}

if (/url\((['"]?)\/portfolio-ts\//.test(css)) {
    failures.push('Le CSS contient encore le sous-chemin GitHub Pages.');
}

if (failures.length > 0) {
    throw new Error(failures.join('\n'));
}

console.log('Build Vercel vérifié.');
