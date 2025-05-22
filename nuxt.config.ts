// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap', '@nuxtjs/seo', '@nuxtjs/robots', '@nuxtjs/i18n'],
  app: {
    head: {
      title: 'Adam Abdel-Djamal | Full Stack Developer Portfolio',
      meta: [
        { name: 'description', content: 'Portfolio of Adam Abdel-Djamal, Full Stack Web Developer specialized in Vue.js, Laravel, and modern web technologies.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'author', content: 'Adam Abdel-Djamal' },
        { name: 'keywords', content: 'Vue.js, Laravel, Full Stack Developer, Web Developer, Portfolio, Tailwind CSS, Nuxt.js' },
        { property: 'og:title', content: 'Adam Abdel-Djamal | Web Developer' },
        { property: 'og:description', content: 'Modern and responsive web applications built with Vue.js and Laravel.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/favicon.ico' },
        { property: 'og:url', content: 'https://votre-domaine.com' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://votre-domaine.com' },
      ]
    }
  },
  sitemap: {
    siteUrl: 'https://adam-portfolio.vercel.app',
    gzip: true,
    routes: []
  },
  robots: {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://adam-portfolio.vercel.app/sitemap.xml'
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français' }
    ],
    baseUrl: 'https://adam-portfolio.vercel.app'
  }
})