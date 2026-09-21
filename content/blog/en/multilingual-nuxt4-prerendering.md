---
title: "How to Build a Lightning-Fast Multilingual Website with Nuxt 4 & Static Prerendering"
description: "Front-end developers looking for production-ready internationalization (@nuxtjs/i18n), SEO best practices, and 100 Lighthouse scores."
date: "2026-09-17"
tags: ["nuxt", "i18n", "seo", "vue", "web-performance"]
author: "Adam Abdel-Djamal"
readingTime: 7
featured: false
slug: "multilingual-nuxt4-prerendering"
---

Building a multilingual website often turns into a performance and SEO compromise: slow dynamic routing, duplicated canonical URLs, broken browser redirect cookies, and plummeting Lighthouse scores.

When building this portfolio, my goal was strict: **5 languages (EN, FR, DE, ES, JA), sub-50ms static load times, perfect hreflang sitemaps, and 100/100 Lighthouse scores**.

In this guide, I share the exact configuration that achieves zero-runtime static prerendering with **Nuxt 4** and **`@nuxtjs/i18n`**.

---

## 1. The Core Routing Strategy: `prefix_except_default`

By default, multilingual setups often create redundant redirects for the root URL (`/` -> `/en`), adding a costly 200ms TTFB penalty.

The optimal strategy is **`prefix_except_default`**:
- English (default): `/`, `/portfolio`, `/blog`
- French: `/fr`, `/fr/portfolio`, `/fr/blog`
- German: `/de`, `/de/portfolio`, `/de/blog`
- Spanish: `/es`, `/es/portfolio`, `/es/blog`
- Japanese: `/ja`, `/ja/portfolio`, `/ja/blog`

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap'],

  i18n: {
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', language: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'de', language: 'de-DE', file: 'de.json', name: 'Deutsch' },
      { code: 'es', language: 'es-ES', file: 'es.json', name: 'Español' },
      { code: 'ja', language: 'ja-JP', file: 'ja.json', name: '日本語' },
    ],
  },
})
```

---

## 2. Preventing Broken Links with `useLocalePath()`

Never hardcode internal navigation links (`<NuxtLink to="/contact">`). If a visitor on the French version (`/fr`) clicks an unlocalized link, they are forcefully knocked back to the English version.

Always wrap navigation targets in `localePath()`:

```vue
<template>
  <NuxtLink :to="localePath('/contact')">
    {{ t('nav.contact') }}
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
</script>
```

---

## 3. Automated Multilingual Sitemap with `xhtml:link`

For Google to rank your pages in target countries without duplicate content penalties, your sitemap must declare **hreflang alternate links**.

`@nuxtjs/sitemap` pairs with `@nuxtjs/i18n` to generate this automatically:

```xml
<url>
  <loc>https://adam-portfolio.vercel.app/portfolio</loc>
  <xhtml:link rel="alternate" hreflang="en-US" href="https://adam-portfolio.vercel.app/portfolio" />
  <xhtml:link rel="alternate" hreflang="fr-FR" href="https://adam-portfolio.vercel.app/fr/portfolio" />
  <xhtml:link rel="alternate" hreflang="de-DE" href="https://adam-portfolio.vercel.app/de/portfolio" />
  <xhtml:link rel="alternate" hreflang="es-ES" href="https://adam-portfolio.vercel.app/es/portfolio" />
  <xhtml:link rel="alternate" hreflang="ja-JP" href="https://adam-portfolio.vercel.app/ja/portfolio" />
</url>
```

---

## 4. Prerendering the Entire Site with Nitro

To achieve instant delivery, configure Nitro to crawl and generate static HTML files at build time:

```typescript
nitro: {
  prerender: {
    crawlLinks: true,
    routes: ['/robots.txt', '/sitemap.xml'],
  },
}
```

Running `npm run build` generates 100% pre-compiled HTML into `.vercel/output/static`. The site deploys to Vercel's Edge Network with global sub-30ms response times.
