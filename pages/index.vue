<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <PortfolioSection />
    <ExperienceSection />
    <CTASection />
  </div>
</template>

<script setup lang="ts">
const { t, locale, localeProperties } = useI18n()
const route = useRoute()

const SITE_URL = 'https://adam-portfolio.vercel.app'
const canonicalUrl = computed(() => `${SITE_URL}${route.path === '/' ? '' : route.path}`)

useSeoMeta({
  googleSiteVerification: 'rUgeDLkGwQHDLAQZiYYg7epAtDcErq4IjOV1gshZ8A4',
  title: () => t('metaTitles.home'),
  description: () => t('metaTitles.homeDesc'),
  ogTitle: () => t('metaTitles.home'),
  ogDescription: () => t('metaTitles.homeDesc'),
  ogImage: `${SITE_URL}/images/og-default.jpg`,
  ogUrl: canonicalUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('metaTitles.home'),
  twitterDescription: () => t('metaTitles.homeDesc'),
  twitterImage: `${SITE_URL}/images/og-default.jpg`,
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'Adam Abdel-Djamal',
            givenName: 'Adam Abdel-Djamal',
            familyName: 'Adam',
            alternateName: ['Abdel-Djamal Adam', 'Abdel Adam', 'Djam18'],
            url: SITE_URL,
            jobTitle: 'Full Stack Developer & AI Engineer',
            image: `${SITE_URL}/images/og-default.jpg`,
            sameAs: [
              'https://github.com/Djam18',
              'https://www.linkedin.com/in/abdel-djamal-adam-b952381b2/'
            ],
            knowsAbout: [
              'Vue.js',
              'Nuxt.js',
              'Laravel',
              'Python',
              'TypeScript',
              'PostgreSQL',
              'Artificial Intelligence',
              'Model Context Protocol',
              'Docker',
              'Web Performance'
            ]
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'Adam Abdel-Djamal | Full Stack Developer',
            description: 'Portfolio and engineering blog of Adam Abdel-Djamal.',
            inLanguage: localeProperties.value.language,
            publisher: {
              '@id': `${SITE_URL}/#person`
            }
          }
        ]
      })
    }
  ]
})
</script>