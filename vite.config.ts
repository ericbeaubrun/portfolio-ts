import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import {loadEnv, type Plugin} from 'vite'

const normalizeSiteUrl = (value: string | undefined) => {
  const candidate = value?.trim()
  if (!candidate) return 'http://localhost:4173'

  const url = /^https?:\/\//.test(candidate) ? candidate : `https://${candidate}`
  return url.replace(/\/+$/, '')
}

const seoAssetsPlugin = (siteUrl: string): Plugin => ({
  name: 'seo-assets',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    })
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
    })
  },
})

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '')
  const siteUrl = normalizeSiteUrl(
    env.VITE_SITE_URL || env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL,
  )

  return {
    base: '/',
    plugins: [react(), seoAssetsPlugin(siteUrl)],
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: false,
    },
  }
})
