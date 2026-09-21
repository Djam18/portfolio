<!-- pages/blog/index.vue -->
<template>
  <div class="min-h-screen bg-background pt-24 pb-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <!-- Header Section -->
      <div class="mb-14 text-center">
        <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold text-accent backdrop-blur">
          <Icon name="ph:newspaper" class="h-3.5 w-3.5" />
          <span>{{ t("blog.index.title") }}</span>
        </div>
        <h1 class="mb-4 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          {{ t("blog.index.title") }}
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-text-secondary">
          {{ t("blog.index.subtitle") }}
        </p>
      </div>

      <!-- Search & Tag Filter Bar -->
      <div v-if="allTags.length > 1" class="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <!-- Tags Filter -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            :class="[
              'rounded-full px-4 py-1.5 text-xs font-semibold transition',
              selectedTag === 'all'
                ? 'border border-accent bg-accent/15 text-accent'
                : 'border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-accent/40'
            ]"
            @click="selectedTag = 'all'"
          >
            {{ t("blog.allTags") }}
          </button>
          <button
            v-for="tag in allTags"
            :key="tag"
            type="button"
            :class="[
              'rounded-full px-3.5 py-1.5 text-xs font-semibold transition',
              selectedTag === tag
                ? 'border border-accent bg-accent/15 text-accent'
                : 'border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-accent/40'
            ]"
            @click="selectedTag = tag"
          >
            #{{ tag }}
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full sm:w-72">
          <Icon
            name="ph:magnifying-glass"
            class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
          />
          <input
            v-model="searchQuery"
            type="search"
            :placeholder="t('blog.searchPlaceholder')"
            class="w-full rounded-full border border-border bg-surface py-2 pl-10 pr-4 text-xs text-text-primary placeholder:text-text-secondary/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="i in 3"
          :key="i"
          class="h-80 animate-pulse rounded-2xl bg-surface"
        />
      </div>

      <!-- Content Area -->
      <div v-else-if="filteredPosts.length" class="space-y-12">
        <!-- Featured Hero Card (Shown only when viewing 'all' and no active search) -->
        <div
          v-if="featuredPost && selectedTag === 'all' && !searchQuery"
          class="group relative overflow-hidden rounded-3xl border border-border bg-surface/80 p-6 transition-all duration-300 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/5 lg:p-8"
        >
          <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
            <!-- Left: Hero Info -->
            <div class="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div class="mb-4 flex flex-wrap items-center gap-2">
                  <span class="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                    <Icon name="ph:star-fill" class="h-3.5 w-3.5 text-yellow-400" />
                    {{ t("blog.featured") }}
                  </span>
                  <BadgeTag
                    v-for="tag in featuredPost.tags?.slice(0, 3)"
                    :key="tag"
                    variant="accent"
                    class="text-xs"
                  >
                    #{{ tag }}
                  </BadgeTag>
                </div>

                <NuxtLink :to="localePath(`/blog/${featuredSlug}`)">
                  <h2 class="font-display text-2xl font-bold leading-tight text-text-primary transition-colors group-hover:text-accent sm:text-3xl lg:text-4xl">
                    {{ featuredPost.title }}
                  </h2>
                </NuxtLink>

                <p class="mt-4 text-base leading-relaxed text-text-secondary line-clamp-3">
                  {{ featuredPost.description }}
                </p>
              </div>

              <div class="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/50">
                <div class="flex items-center gap-4 font-mono text-xs text-text-secondary">
                  <span v-if="featuredPost.date" class="flex items-center gap-1.5">
                    <Icon name="ph:calendar-blank" class="h-4 w-4 text-accent/80" />
                    <time :datetime="featuredPost.date">{{ formatDate(featuredPost.date) }}</time>
                  </span>
                  <span v-if="featuredPost.readingTime" class="flex items-center gap-1.5">
                    <Icon name="ph:clock" class="h-4 w-4 text-accent/80" />
                    {{ t("blog.readingTime", { time: featuredPost.readingTime }) }}
                  </span>
                </div>

                <NuxtLink
                  :to="localePath(`/blog/${featuredSlug}`)"
                  class="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 shadow-md shadow-accent/20"
                >
                  <span>{{ t("blog.readArticle") }}</span>
                  <Icon name="ph:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
              </div>
            </div>

            <!-- Right: Cover Image / Graphic -->
            <NuxtLink
              :to="localePath(`/blog/${featuredSlug}`)"
              class="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-alt lg:col-span-5"
            >
              <NuxtImg
                v-if="featuredPost.image"
                :src="featuredPost.image"
                :alt="featuredPost.title"
                format="webp"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                v-else
                class="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-surface-alt p-8"
              >
                <div
                  class="absolute inset-0 opacity-20"
                  style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 16px 16px;"
                />
                <div class="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl border border-accent/40 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <Icon name="ph:newspaper-clipping" class="h-10 w-10" />
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Grid of Remaining / Filtered Posts -->
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BlogCard
            v-for="post in gridPosts"
            :key="post.path"
            :post="post"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="py-24 text-center">
        <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-text-secondary">
          <Icon name="ph:magnifying-glass" class="h-6 w-6" />
        </div>
        <p class="text-base text-text-secondary">
          {{ t("blog.index.noPosts") }}
        </p>
        <button
          v-if="selectedTag !== 'all' || searchQuery"
          type="button"
          class="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent hover:underline"
          @click="selectedTag = 'all'; searchQuery = ''"
        >
          {{ t("blog.allTags") }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale, localeProperties } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const SITE_URL = 'https://adam-portfolio.vercel.app'
const canonicalUrl = computed(() => `${SITE_URL}${route.path}`)

useSeoMeta({
  title: () => t('blog.index.metaTitle'),
  description: () => t('blog.index.metaDesc'),
  ogTitle: () => t('blog.index.metaTitle'),
  ogDescription: () => t('blog.index.metaDesc'),
  ogUrl: canonicalUrl,
  ogImage: `${SITE_URL}/images/og-default.jpg`,
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('blog.index.metaTitle'),
  twitterDescription: () => t('blog.index.metaDesc'),
  twitterImage: `${SITE_URL}/images/og-default.jpg`,
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
})

const { data: posts, pending } = await useAsyncData(
  `blog-list-${locale.value}`,
  () =>
    queryCollection("blog")
      .where("path", "LIKE", `/blog/${locale.value}/%`)
      .order("date", "DESC")
      .all(),
  {
    watch: [locale],
    default: () => [],
  },
)

const selectedTag = ref('all')
const searchQuery = ref('')

// Extract unique tags
const allTags = computed(() => {
  if (!posts.value?.length) return []
  const tagsSet = new Set<string>()
  for (const post of posts.value) {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((t: string) => tagsSet.add(t))
    }
  }
  return Array.from(tagsSet).sort()
})

// Filtered posts based on tag and search input
const filteredPosts = computed(() => {
  if (!posts.value?.length) return []
  return posts.value.filter((post: any) => {
    const matchesTag = selectedTag.value === 'all' || post.tags?.includes(selectedTag.value)
    const matchesSearch =
      !searchQuery.value ||
      post.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesTag && matchesSearch
  })
})

// Featured post: find first marked as featured, or fallback to first post
const featuredPost = computed(() => {
  if (!posts.value?.length) return null
  return posts.value.find((p: any) => p.featured) || posts.value[0]
})

const featuredSlug = computed(() => {
  if (!featuredPost.value) return ''
  return featuredPost.value.slug || featuredPost.value.id?.split('/').pop()?.replace(/\.md$/, '') || ''
})

// Posts to show in the grid below
const gridPosts = computed(() => {
  if (selectedTag.value !== 'all' || searchQuery.value) {
    return filteredPosts.value
  }
  if (!featuredPost.value) return filteredPosts.value
  return filteredPosts.value.filter((p: any) => p.path !== featuredPost.value.path)
})

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString(localeProperties.value.language || 'en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}
</script>
