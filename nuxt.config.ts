// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'vercel-static',
  },

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
    '@vercel/analytics',
  ],

  runtimeConfig: {
    public: {
      apiBase: '/api',
      calLink: process.env.NUXT_PUBLIC_CAL_LINK ?? 'https://cal.com/ton-compte',
      whatsappLink: process.env.NUXT_PUBLIC_WHATSAPP_LINK ?? 'https://wa.me/XXXX',
      linkedinProfile: process.env.NUXT_PUBLIC_LINKEDIN ?? 'https://linkedin.com/in/...',
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  site: {
    url: 'https://adam-portfolio.vercel.app',
    name: 'Adam Abdel-Djamal | Full Stack Developer',
    description: 'Portfolio of Adam Abdel-Djamal, Full Stack Developer specialized in Vue.js, Nuxt and Laravel.',
    defaultLocale: 'en',
  },

  sitemap: {},

  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
      },
    ],
    sitemap: ['/sitemap.xml'],
  },

  i18n: {
    langDir: 'locales/',
    defaultLocale: 'en',

    strategy: 'prefix_except_default',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'all',
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

  image: {},

  content: {},

  umami: {
    host: process.env.NUXT_UMAMI_HOST ?? '',
    id: process.env.NUXT_UMAMI_ID ?? '',
    autoTrack: true,
    ignoreLocalhost: true,
  },

  ogImage: {
    compatibility: {
      runtime: 'node',
    },
    componentOptions: {
      renderer: 'satori',
    },
  },

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
    download: true,
    preload: true,
  },
})