<!-- pages/blog/[slug].vue -->
<template>
  <div class="min-h-screen bg-background">
    <!-- Reading Progress Bar -->
    <div
      class="fixed left-0 top-0 z-50 h-1 bg-accent transition-all duration-150 shadow-sm shadow-accent/50"
      :style="{ width: `${readingProgress}%` }"
    />

    <div class="mx-auto max-w-3xl px-4 pt-24 pb-20 sm:px-6">
      <!-- Back Link -->
      <NuxtLink
        :to="localePath('/blog')"
        class="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent"
      >
        <Icon name="ph:arrow-left" class="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {{ t("blog.backToBlog") }}
      </NuxtLink>

      <article v-if="article">
        <!-- Tags -->
        <div class="mb-6 flex flex-wrap gap-2">
          <BadgeTag v-for="tag in article.tags" :key="tag" variant="accent">
            #{{ tag }}
          </BadgeTag>
        </div>

        <!-- Title -->
        <h1
          class="mb-6 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          {{ article.title }}
        </h1>

        <!-- Metadata Row -->
        <div
          class="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border/60 pb-6 font-mono text-sm text-text-secondary"
        >
          <time :datetime="article.date" class="flex items-center gap-1.5">
            <Icon name="ph:calendar-blank" class="h-4 w-4 text-accent" />
            {{ formatDate(article.date) }}
          </time>
          <span v-if="article.author" class="flex items-center gap-1.5">
            <Icon name="ph:user" class="h-4 w-4 text-accent" />
            {{ article.author }}
          </span>
          <span v-if="article.readingTime" class="flex items-center gap-1.5">
            <Icon name="ph:clock" class="h-4 w-4 text-accent" />
            {{ t("blog.readingTime", { time: article.readingTime }) }}
          </span>
        </div>

        <!-- Lead Description -->
        <p
          class="mb-10 rounded-r-xl border-l-4 border-accent bg-surface/50 p-5 text-lg leading-relaxed text-text-secondary"
        >
          {{ article.description }}
        </p>

        <!-- Cover Image -->
        <NuxtImg
          v-if="article.image"
          :src="article.image"
          :alt="article.title"
          class="mb-10 w-full rounded-2xl object-cover shadow-xl"
          width="800"
          height="420"
          loading="lazy"
        />

        <!-- Table of Contents (TOC) -->
        <div
          v-if="tocLinks.length"
          class="mb-12 rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur"
        >
          <div class="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-text-primary">
            <Icon name="ph:list-bullets" class="h-4 w-4 text-accent" />
            <span>{{ t("blog.tableOfContents") }}</span>
          </div>
          <nav class="space-y-2 text-sm">
            <a
              v-for="link in tocLinks"
              :key="link.id"
              :href="`#${link.id}`"
              class="block text-text-secondary transition hover:text-accent"
              :class="{ 'pl-4 text-xs': link.depth === 3 }"
            >
              {{ link.text }}
            </a>
          </nav>
        </div>

        <!-- Markdown Content -->
        <div
          class="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-text-primary prose-headings:scroll-mt-24 prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-2xl prose-h2:font-bold prose-h2:border-b prose-h2:border-border prose-h2:pb-3 prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-p:text-text-secondary prose-p:leading-7 prose-strong:text-text-primary prose-strong:font-semibold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-code:text-accent prose-code:bg-surface prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:shadow-lg prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:text-text-secondary prose-blockquote:not-italic prose-hr:border-border prose-hr:my-12 prose-table:text-sm prose-table:w-full prose-thead:bg-surface prose-th:text-text-primary prose-th:font-semibold prose-th:px-4 prose-th:py-3 prose-td:text-text-secondary prose-td:px-4 prose-td:py-3 prose-tr:border-b prose-tr:border-border prose-ul:text-text-secondary prose-ol:text-text-secondary prose-li:my-1 prose-img:rounded-xl"
        >
          <ContentRenderer :value="article" />
        </div>

        <!-- Share Buttons -->
        <div class="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <p class="text-sm font-semibold text-text-primary">
            {{ t("blog.shareTitle") }}
          </p>
          <div class="flex gap-3">
            <a
              :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(canonicalUrl)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary transition hover:border-accent hover:text-accent"
            >
              <Icon name="ph:twitter-logo" class="h-4 w-4" />
              {{ t("blog.twitter") }}
            </a>
            <a
              :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary transition hover:border-accent hover:text-accent"
            >
              <Icon name="ph:linkedin-logo" class="h-4 w-4" />
              {{ t("blog.linkedin") }}
            </a>
          </div>
        </div>

        <!-- Author Bio Card / Hire Me CTA -->
        <div class="mt-12 rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur sm:p-8">
          <div class="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-accent/15 font-display text-xl font-bold text-accent shadow-md">
              AA
            </div>
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="font-display text-lg font-bold text-text-primary">Adam Abdel-Djamal</h3>
                <span class="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
                  Full Stack Developer
                </span>
              </div>
              <p class="mt-1.5 text-sm leading-relaxed text-text-secondary">
                {{ t('blog.authorBio.bio') }}
              </p>
              <div class="mt-4 flex flex-wrap gap-3">
                <NuxtLink
                  :to="localePath('/contact')"
                  class="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 shadow-md shadow-accent/20"
                >
                  <Icon name="ph:paper-plane-tilt" class="h-3.5 w-3.5" />
                  {{ t('blog.authorBio.cta') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/portfolio')"
                  class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-4 py-2 text-xs font-semibold text-text-primary transition hover:border-accent hover:text-accent"
                >
                  <Icon name="ph:briefcase" class="h-3.5 w-3.5" />
                  {{ t('nav.portfolio') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Articles Section -->
        <div v-if="relatedArticles?.length" class="mt-16 border-t border-border pt-12">
          <h2 class="mb-8 font-display text-2xl font-bold tracking-tight text-text-primary">
            {{ t('blog.relatedPosts') }}
          </h2>
          <div class="grid gap-6 sm:grid-cols-2">
            <BlogCard v-for="rel in relatedArticles" :key="rel.path" :post="rel" />
          </div>
        </div>
      </article>

      <!-- Not Found State -->
      <div v-else class="py-20 text-center text-text-secondary">
        {{ t("blog.notFound") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale, localeProperties } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string

const { data: article } = await useAsyncData(
  `blog-${locale.value}-${slug}`,
  () => queryCollection("blog").path(`/blog/${locale.value}/${slug}`).first(),
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: "Article not found" })
}

const { data: relatedArticles } = await useAsyncData(
  `blog-related-${locale.value}-${slug}`,
  () =>
    queryCollection("blog")
      .where("path", "LIKE", `/blog/${locale.value}/%`)
      .where("path", "<>", `/blog/${locale.value}/${slug}`)
      .limit(2)
      .all(),
  { default: () => [] },
)

// Extract Table of Contents links from article body if available
const tocLinks = computed(() => {
  const body = article.value?.body as any
  if (body?.toc?.links && Array.isArray(body.toc.links)) {
    return body.toc.links
  }
  return []
})

const SITE_URL = "https://adam-portfolio.vercel.app"
const canonicalUrl = `${SITE_URL}${route.path}`

const ogImage = article.value.image
  ? `${SITE_URL}${article.value.image}`
  : `${SITE_URL}/images/og-default.jpg`

useSeoMeta({
  title: article.value.title,
  description: article.value.description,
  ogTitle: article.value.title,
  ogDescription: article.value.description,
  ogType: "article",
  ogUrl: canonicalUrl,
  ogImage,
  twitterCard: "summary_large_image",
  twitterTitle: article.value.title,
  twitterDescription: article.value.description,
  twitterImage: ogImage,
  articlePublishedTime: article.value.date,
  articleTag: article.value.tags,
})

useHead({
  link: [{ rel: "canonical", href: canonicalUrl }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.value.title,
        description: article.value.description,
        datePublished: article.value.date,
        dateModified: article.value.date,
        author: {
          "@type": "Person",
          name: article.value.author ?? "Adam Abdel-Djamal",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          name: "Adam Abdel-Djamal",
          url: SITE_URL,
        },
        image: ogImage,
        url: canonicalUrl,
        inLanguage: localeProperties.value.language,
        keywords: article.value.tags?.join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
      }),
    },
  ],
})

function formatDate(date: string): string {
  try {
    return new Date(date).toLocaleDateString(localeProperties.value.language || 'en', {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return date
  }
}

// Reading progress indicator
const readingProgress = ref(0)

function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value =
    total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0
}

onMounted(() =>
  window.addEventListener("scroll", updateProgress, { passive: true }),
)
onUnmounted(() => window.removeEventListener("scroll", updateProgress))
</script>
