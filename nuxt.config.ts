// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  // ── Déploiement Vercel (statique) ───────────────────
  // nuxt generate → rendu statique complet
  // Évite le problème de better-sqlite3 en runtime (utilisé uniquement au build)
  nitro: {
    preset: 'vercel-static',
  },

  // ── Modules ─────────────────────────────────────────
  // Ordre : i18n avant content (routes localisées avant génération des routes Content)
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxtjs/seo',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-og-image',
    'nuxt-umami',
    '@nuxtjs/google-fonts',
  ],

  // ── Variables d'environnement ───────────────────────
  runtimeConfig: {
    public: {
      apiBase: '/api',
      calLink: process.env.NUXT_PUBLIC_CAL_LINK ?? 'https://cal.com/ton-compte',
      whatsappLink: process.env.NUXT_PUBLIC_WHATSAPP_LINK ?? 'https://wa.me/XXXX',
      linkedinProfile: process.env.NUXT_PUBLIC_LINKEDIN ?? 'https://linkedin.com/in/...',
    },
  },

  // ── Head global minimal ─────────────────────────────
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // ── SEO global (@nuxtjs/seo + nuxt-og-image) ────────
  site: {
    url: 'https://adam-portfolio.vercel.app',
    name: 'Adam Abdel-Djamal | Full Stack Developer',
    description: 'Portfolio of Adam Abdel-Djamal, Full Stack Developer specialized in Vue.js, Nuxt and Laravel.',
    defaultLocale: 'en',
  },

  // ── Sitemap (@nuxtjs/sitemap v8) ────────────────────
  // Avec prefix_except_default + i18n, le sitemap génère automatiquement
  // les URLs localisées avec les balises <xhtml:link hreflang="...">
  // Condition : les routes Nuxt Content doivent être découvertes automatiquement
  sitemap: {},

  // ── Robots (@nuxtjs/robots v5) ──────────────────────
  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
      },
    ],
    sitemap: ['/sitemap.xml'],
  },

  // ── Internationalisation (@nuxtjs/i18n v10) ─────────
  i18n: {
    // Les fichiers sont dans i18n/locales/ — correspond au restructureDir par défaut de v10
    langDir: 'locales/',
    defaultLocale: 'en',

    // CRITIQUE pour le SEO international :
    // prefix_except_default → URLs distinctes par langue
    // → Google peut indexer /blog/article (EN), /fr/blog/article (FR), /de/blog/artikel (DE)
    // → hreflang générés automatiquement par @nuxtjs/i18n
    // → sans ça, toutes les langues partagent la même URL → Google indexe une seule version
    strategy: 'prefix_except_default',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      // 'all' : détection sur chaque page, pas seulement sur /
      // Un japonais qui clique un lien direct vers /blog/article sera redirigé vers /ja/blog/article
      redirectOn: 'all',
      // false : évite les boucles de redirection quand l'utilisateur change manuellement de langue
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

    // baseUrl supprimé : redondant avec site.url
  },

  // ── Nuxt Image ──────────────────────────────────────
  image: {},

  // ── Nuxt Content v3 ─────────────────────────────────
  content: {},

  // ── Nuxt Umami ──────────────────────────────────────
  umami: {
    host: process.env.NUXT_UMAMI_HOST ?? '',
    id: process.env.NUXT_UMAMI_ID ?? '',
    autoTrack: true,
    ignoreLocalhost: true,
  },

  // ── OG Image (nuxt-og-image v6 + satori) ────────────
  ogImage: {
    compatibility: {
      runtime: 'node',
    },
    componentOptions: {
      renderer: 'satori',
    },
  },

  // ── Vite optimizations ──────────────────────────────
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'gsap/ScrollTrigger',
      ],
    },
  },

  // ── Résolution automatique des composants ───────────
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  googleFonts: {
  families: {
    Outfit: [300, 400, 500, 600, 700],
    Syne: [400, 500, 600, 700],
    'JetBrains Mono': [400, 500],
  },
  display: 'swap',
  download: true,   // télécharge les fonts au build → servies en local, pas depuis Google
  preload: true,
},
})