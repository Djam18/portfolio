<!-- pages/blog/[slug].vue -->
<template>
  <div class="min-h-screen bg-background">
    <div
      class="fixed left-0 top-0 z-50 h-0.5 bg-accent transition-all duration-150"
      :style="{ width: `${readingProgress}%` }"
    ></div>

    <div class="mx-auto max-w-3xl px-4 pt-24 pb-20 sm:px-6">
      <NuxtLink
        :to="localePath('/blog')"
        class="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
      >
        <Icon name="ph:arrow-left" class="h-4 w-4" />
        {{ t("blog.backToBlog") }}
      </NuxtLink>

      <article v-if="article">
        <div class="mb-6 flex flex-wrap gap-2">
          <BadgeTag v-for="tag in article.tags" :key="tag" variant="accent">
            {{ tag }}
          </BadgeTag>
        </div>

        <h1
          class="mb-5 font-display text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          {{ article.title }}
        </h1>

        <div
          class="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm text-text-secondary"
        >
          <time :datetime="article.date" class="flex items-center gap-1.5">
            <Icon name="ph:calendar-blank" class="h-3.5 w-3.5" />
            {{ formatDate(article.date) }}
          </time>
          <span v-if="article.author" class="flex items-center gap-1.5">
            <Icon name="ph:user" class="h-3.5 w-3.5" />
            {{ article.author }}
          </span>
          <span v-if="article.readingTime" class="flex items-center gap-1.5">
            <Icon name="ph:clock" class="h-3.5 w-3.5" />
            {{ t("blog.readingTime", { time: article.readingTime }) }}
          </span>
        </div>

        <p
          class="mb-12 border-l-2 border-accent pl-5 text-lg leading-relaxed text-text-secondary"
        >
          {{ article.description }}
        </p>

        <NuxtImg
          v-if="article.image"
          :src="article.image"
          :alt="article.title"
          class="mb-12 w-full rounded-xl object-cover"
          width="800"
          height="420"
          loading="lazy"
        />

        <div
          class="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-text-primary prose-headings:scroll-mt-24 prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-2xl prose-h2:font-bold prose-h2:border-b prose-h2:border-border prose-h2:pb-3 prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-p:text-text-secondary prose-p:leading-7 prose-strong:text-text-primary prose-strong:font-semibold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-code:text-accent prose-code:bg-surface prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:shadow-lg prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:text-text-secondary prose-blockquote:not-italic prose-hr:border-border prose-hr:my-12 prose-table:text-sm prose-table:w-full prose-thead:bg-surface prose-th:text-text-primary prose-th:font-semibold prose-th:px-4 prose-th:py-3 prose-td:text-text-secondary prose-td:px-4 prose-td:py-3 prose-tr:border-b prose-tr:border-border prose-ul:text-text-secondary prose-ol:text-text-secondary prose-li:my-1 prose-img:rounded-lg"
        >
          <ContentRenderer :value="article" />
        </div>

        <div class="mt-16 border-t border-border pt-8">
          <p class="mb-3 text-sm text-text-secondary">
            {{ t("blog.shareTitle") }}
          </p>
          <div class="flex gap-4">
            <a
              :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(canonicalUrl)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              <Icon name="ph:twitter-logo" class="h-4 w-4" />
              {{ t("blog.twitter") }}
            </a>
            <a
              :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              <Icon name="ph:linkedin-logo" class="h-4 w-4" />
              {{ t("blog.linkedin") }}
            </a>
          </div>
        </div>
      </article>

      <div v-else class="py-20 text-center text-text-secondary">
        {{ t("blog.notFound") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale, localeProperties } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const slug = route.params.slug as string;

const { data: article } = await useAsyncData(
  `blog-${locale.value}-${slug}`,
  () => queryCollection("blog").path(`/blog/${locale.value}/${slug}`).first(),
);

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: "Article not found" });
}

const SITE_URL = "https://adam-portfolio.vercel.app";
const canonicalUrl = `${SITE_URL}${route.path}`;

const ogImage = article.value.image
  ? `${SITE_URL}${article.value.image}`
  : `${SITE_URL}/images/og-default.jpg`;

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
});

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
});

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString(localeProperties.value.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const readingProgress = ref(0);

function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  readingProgress.value =
    total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0;
}

onMounted(() =>
  window.addEventListener("scroll", updateProgress, { passive: true }),
);
onUnmounted(() => window.removeEventListener("scroll", updateProgress));
</script>
