<template>
  <div class="min-h-screen bg-background pt-24 pb-20">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <NuxtLink
        to="/blog"
        class="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
      >
        <Icon name="ph:arrow-left" class="h-4 w-4" />
        Back to blog
      </NuxtLink>

      <article v-if="article">
        <div class="mb-6 flex flex-wrap gap-2">
          <BadgeTag v-for="tag in article.tags" :key="tag" variant="accent">
            {{ tag }}
          </BadgeTag>
        </div>

        <h1 class="mb-4 font-display text-3xl font-bold text-text-primary sm:text-4xl">
          {{ article.title }}
        </h1>

        <p v-if="article.date" class="mb-8 font-mono text-sm text-text-secondary">
          {{ formatDate(article.date) }}
        </p>

        <p class="mb-8 text-lg text-text-secondary">
          {{ article.description }}
        </p>

        <div class="prose prose-invert max-w-none">
          <ContentRenderer v-if="article" :value="article" />
        </div>
      </article>

      <div v-else class="py-20 text-center text-text-secondary">
        Article not found.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: article } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').path(`/blog/${slug}`).first()
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useHead({
  title: article.value?.title,
  meta: [{ name: 'description', content: article.value?.description }]
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>