<!-- pages/portfolio/index.vue -->
<template>
  <div class="mx-auto max-w-5xl px-4 py-24">
    <div class="mb-16">
      <h1 class="mb-4 font-display text-4xl font-bold text-text-primary">
        {{ t('portfolio.title') }}
      </h1>
      <p class="max-w-2xl text-lg text-text-secondary">
        {{ t('portfolio.intro') }}
      </p>
    </div>

    <!-- Optional filters (if you have many projects) -->
    <div v-if="categories.length > 1" class="mb-12 flex flex-wrap gap-3">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeFilter = cat"
        :class="[
          'rounded-full border px-4 py-1.5 text-sm font-medium transition',
          activeFilter === cat
            ? 'border-accent bg-accent/10 text-accent'
            : 'border-border text-text-secondary hover:text-text-primary'
        ]"
      >
        {{ cat === 'all' ? t('portfolio.all') : t(`skills.categories.${cat}`) }}
      </button>
    </div>

    <!-- Project grid -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="project in filteredProjects" :key="project.slug" :project="project" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const appConfig = useAppConfig()
// Ideally, fetch projects from a content collection or a composable.
// For now, define them directly (or load from content/projects via queryContent)
const projects = appConfig.projects

// Filtering logic
const categories = ['all', 'frontend', 'backend', 'devops', 'ai'] // adjust based on actual categories
const activeFilter = ref('all')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter(p => p.category === activeFilter.value)
})
</script>