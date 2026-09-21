<!-- components/ui/BlogCard.vue -->
<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/70 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/5"
  >
    <!-- Cover Image / Gradient Header -->
    <NuxtLink :to="localePath(`/blog/${slug}`)" :aria-label="post.title" class="relative block aspect-[16/9] overflow-hidden bg-surface-alt">
      <NuxtImg
        v-if="post.image"
        :src="post.image"
        :alt="post.title"
        loading="lazy"
        format="webp"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        v-else
        class="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-surface to-surface-alt p-6"
      >
        <!-- Subtle dot grid background -->
        <div
          class="absolute inset-0 opacity-15"
          style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 16px 16px;"
        />
        <div class="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
          <Icon name="ph:article-medium" class="h-7 w-7" />
        </div>
      </div>

      <!-- Featured Pill if applicable -->
      <div
        v-if="post.featured"
        class="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur shadow-md"
      >
        <Icon name="ph:star-fill" class="h-3 w-3 text-yellow-300" />
        <span>{{ t('blog.featured') }}</span>
      </div>
    </NuxtLink>

    <!-- Card Body -->
    <div class="flex flex-1 flex-col p-6">
      <!-- Tags -->
      <div v-if="post.tags?.length" class="mb-3 flex flex-wrap gap-1.5">
        <BadgeTag
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          variant="accent"
          class="text-xs"
        >
          #{{ tag }}
        </BadgeTag>
      </div>

      <!-- Metadata: Date + Reading Time -->
      <div class="mb-3 flex items-center gap-3 font-mono text-xs text-text-secondary">
        <span v-if="post.date" class="flex items-center gap-1">
          <Icon name="ph:calendar-blank" class="h-3.5 w-3.5 text-accent/80" />
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        </span>
        <span v-if="post.readingTime" class="flex items-center gap-1">
          <Icon name="ph:clock" class="h-3.5 w-3.5 text-accent/80" />
          {{ t('blog.readingTime', { time: post.readingTime }) }}
        </span>
      </div>

      <!-- Title -->
      <NuxtLink :to="localePath(`/blog/${slug}`)">
        <h3
          class="font-display text-xl font-bold leading-snug text-text-primary transition-colors duration-200 line-clamp-2 group-hover:text-accent"
        >
          {{ post.title }}
        </h3>
      </NuxtLink>

      <!-- Description -->
      <p class="mt-2 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
        {{ post.description }}
      </p>

      <!-- Footer CTA -->
      <div class="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
        <NuxtLink
          :to="localePath(`/blog/${slug}`)"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-all group-hover:gap-2"
        >
          <span>{{ t('blog.readArticle') }}</span>
          <Icon name="ph:arrow-right" class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </NuxtLink>
        <span v-if="post.author" class="text-xs text-text-secondary/70">
          {{ post.author }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const { t, localeProperties } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
  post: {
    id?: string
    slug?: string
    title: string
    description: string
    date?: string
    tags?: string[]
    image?: string
    author?: string
    readingTime?: number
    featured?: boolean
  }
}>()

const slug = computed(() => {
  if (props.post.slug) return props.post.slug
  if (!props.post.id) return ""
  return props.post.id.split("/").pop()?.replace(/\.md$/, "") ?? ""
})

function formatDate(dateStr?: string) {
  if (!dateStr) return ""
  try {
    return new Date(dateStr).toLocaleDateString(localeProperties.value.language || 'en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}
</script>
