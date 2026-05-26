// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  // ── Modules ─────────────────────────────────────────
  // Ordre important : sitemap/robots avant seo (meta-module qui les englobe)
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-og-image',
    'nuxt-umami',
  ],

  // ── Variables d'environnement ────────────────────────
  runtimeConfig: {
    // Privées (serveur uniquement)
    // SMTP retiré : le projet utilise uniquement @sendgrid/mail, pas nodemailer
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    sendgridFrom: process.env.SENDGRID_FROM,
    sendgridTo: process.env.SENDGRID_TO,
    // Publiques (accessibles côté client)
    public: {
      apiBase: '/api',
      calLink: process.env.NUXT_PUBLIC_CAL_LINK ?? 'https://cal.com/ton-compte',
      whatsappLink: process.env.NUXT_PUBLIC_WHATSAPP_LINK ?? 'https://wa.me/XXXX',
      linkedinProfile: process.env.NUXT_PUBLIC_LINKEDIN ?? 'https://linkedin.com/in/...',
    },
  },

  // ── Head global minimal ──────────────────────────────
  // @nuxtjs/seo gère title/description/og/* automatiquement via site{}
  // useSeoMeta() dans chaque page surcharge au besoin
  // Ne pas dupliquer ici ce que seo/og-image génèrent déjà
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // ── SEO global (@nuxtjs/seo + nuxt-og-image) ─────────
  // Source unique de vérité pour l'URL et le nom du site
  site: {
    url: 'https://adam-portfolio.vercel.app',
    name: 'Adam Abdel-Djamal | Full Stack Developer',
    description: 'Portfolio of Adam Abdel-Djamal, Full Stack Developer specialized in Vue.js, Nuxt 3 and Laravel.',
    defaultLocale: 'en',
  },

  // ── Sitemap (@nuxtjs/sitemap v8) ─────────────────────
  // hostname et gzip supprimés (dépréciés) — l'URL vient de site.url
  // Les routes dynamiques (blog/portfolio) sont découvertes automatiquement
  sitemap: {},

  // ── Robots (@nuxtjs/robots v5) ────────────────────────
  // FIX: rules{} supprimé en v5, remplacé par groups[]
  // sitemap en chemin relatif — résolu via site.url au runtime
  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
      },
    ],
    sitemap: ['/sitemap.xml'],
  },

  // ── Internationalisation (@nuxtjs/i18n v9) ────────────
  // FIX: iso → language (breaking change v9, confirmé dans migration guide)
  // FIX: langDir mis à jour selon la nouvelle structure i18n/ de v9
  //      Si tu gardes locales/ à la racine, ajoute restructureDir: false
  i18n: {
    restructureDir: false, // conserve locales/ à la racine (hors i18n/)
    langDir: 'locales/',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      fallbackLocale: 'en',
    },
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', language: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'ja', language: 'ja-JP', file: 'ja.json', name: '日本語' },
      { code: 'es', language: 'es-ES', file: 'es.json', name: 'Español' },
    ],
    baseUrl: 'https://adam-portfolio.vercel.app',
    strategy: 'no_prefix',
  },

  // ── Nuxt Image ───────────────────────────────────────
  image: {
    // provider ipx par défaut (local)
    // Décommente si tu veux des tailles d'écran prédéfinies :
    // screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280 },
  },

  // ── Nuxt Content v3 ──────────────────────────────────
  content: {},

  // ── Nuxt Umami ───────────────────────────────────────
  // Passe par des variables d'env pour ne pas exposer l'ID en dur
  umami: {
    host: process.env.NUXT_UMAMI_HOST ?? '',
    id: process.env.NUXT_UMAMI_ID ?? '',
    autoTrack: true,
    ignoreLocalhost: true, // ne track pas les visites en dev
  },
})