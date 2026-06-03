<template>
  <div class="min-h-screen bg-background pt-24 pb-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <h1 class="mb-4 font-display text-4xl font-bold text-text-primary sm:text-5xl">
          Blog
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-text-secondary">
          Thoughts on web development, tutorials, and lessons learned.
        </p>
      </div>

      <div v-if="pending" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 3" :key="i" class="h-80 animate-pulse rounded-card bg-surface" />
      </div>

      <div v-else-if="articles.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BlogCard
          v-for="article in articles"
          :key="article.path"
          :article="article"
        />
      </div>

      <div v-else class="py-20 text-center text-text-secondary">
        No articles yet. Coming soon!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Blog',
  meta: [{ name: 'description', content: 'Articles and thoughts on web development by Adam Abdel-Djamal.' }]
})

const { data: articles, pending } = await useAsyncData('blog-list', () =>
  queryCollection('blog').order('date', 'DESC').all()
)
</script>