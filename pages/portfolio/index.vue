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

    <!-- Filtres -->
    <div v-if="categories.length > 1" class="mb-12 flex flex-wrap gap-3">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="[
          'rounded-full border px-4 py-1.5 text-sm font-medium transition',
          activeFilter === cat
            ? 'border-accent bg-accent/10 text-accent'
            : 'border-border text-text-secondary hover:text-text-primary'
        ]"
        @click="activeFilter = cat"
      >
        {{ cat === 'all' ? t('portfolio.all') : t(`skills.categories.${cat}`) }}
      </button>
    </div>

    <!-- Grille projets -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.slug"
        :project="project"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const { t } = useI18n()

// app.config retourne des valeurs plain (pas des refs) — pas de .value
const projects = appConfig.projects

const categories = ['all', 'frontend', 'backend', 'devops', 'ai', 'database']
const activeFilter = ref('all')

const filteredProjects = computed(() => {
  // Pas de .value ici — projects est déjà un tableau plain
  if (!projects) return []
  if (activeFilter.value === 'all') return projects
  return projects.filter((p: { category: string }) => p.category === activeFilter.value)
})
</script>