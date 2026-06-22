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
    <div v-if="pending" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 6"
        :key="i"
        class="h-80 animate-pulse rounded-lg bg-surface"
      ></div>
    </div>

    <div v-else-if="projects?.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.path"
        :project="project"
      />
    </div>

    <div v-else class="py-20 text-center text-text-secondary">
      {{ t('portfolio.noProjects') }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const categories = ['all', 'frontend', 'backend', 'devops', 'ai', 'database']
const activeFilter = ref('all')

const { data: projects, pending } = await useAsyncData(
  `projects-${locale.value}`,
  () =>
    queryCollection('projects')
      .where('path', 'LIKE', `/projects/${locale.value}/%`)
      .all(),
  { default: () => [] }
)

const filteredProjects = computed(() => {
  if (!projects.value) return []
  if (activeFilter.value === 'all') return projects.value
  // Le filtre par catégorie reste géré via appConfig si besoin
  // ou on ajoute un champ `category` dans le schema
  return projects.value
})
</script>