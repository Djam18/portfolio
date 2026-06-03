// PortfolioSection

<template>
  <section class="mx-auto max-w-7xl px-4 py-24">
    <div class="mb-12 flex items-end justify-between">
      <h2 class="font-display text-3xl font-bold text-text-primary">Featured Projects</h2>
      <NuxtLink to="/portfolio" class="text-sm text-accent hover:underline">
        View all →
      </NuxtLink>
    </div>

    <!-- Projets trouvés -->
    <div v-if="featured.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="p in featured" :key="p.path" :project="p" />
    </div>

    <!-- Fallback si pas encore de projets -->
    <div v-else class="rounded-lg border border-dashed border-border bg-surface p-12 text-center">
      <Icon name="ph:folder-open" class="mx-auto mb-4 h-12 w-12 text-text-secondary" />
      <p class="text-text-secondary">
        No projects yet. Add your first one in
        <code class="rounded bg-background px-2 py-1 font-mono text-accent">content/projects/</code>
      </p>
      <NuxtLink to="/portfolio" class="mt-4 inline-block text-sm text-accent hover:underline">
        Go to Portfolio page
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
const { data: projects } = await useAsyncData('featured-home', () =>
  queryCollection('projects').order('date', 'DESC').limit(3).all()
)

const featured = computed(() => projects.value || [])
</script>