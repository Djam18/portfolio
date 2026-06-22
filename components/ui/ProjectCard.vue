<!-- components/ui/ProjectCard.vue -->
<template>
  <article
    class="group relative overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/5"
  >
    <!-- Image Container -->
    <div class="relative aspect-video overflow-hidden bg-background">
      <NuxtImg
        v-if="project?.image"
        :src="project.image"
        :alt="project?.title"
        class="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        width="600"
        height="340"
      />
      <div v-else class="flex h-full items-center justify-center">
        <Icon name="ph:image" class="h-10 w-10 text-text-secondary" />
      </div>

      <!-- Overlay — uniquement sur l'image -->
      <Transition name="fade">
        <div
          v-if="project?.status && project.status !== 'live'"
          class="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/70 to-transparent p-5 opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          <!-- Badge statut -->
          <span
            :class="[
              'mb-3 w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium',
              statusConfig[project.status]?.class
            ]"
          >
            {{ t(`portfolio.status.${project.status}`) }}
          </span>

          <!-- Vision courte -->
          <p
            v-if="project?.vision"
            class="mb-3 line-clamp-3 text-sm leading-relaxed text-text-secondary"
          >
            {{ project.vision }}
          </p>

          <!-- Mention wireframe -->
          <p
            v-if="project?.wireframe"
            class="flex items-center gap-1.5 text-xs text-accent"
          >
            <Icon name="ph:frame-corners" class="h-3.5 w-3.5" />
            {{ t('portfolio.wireframeAvailable') }}
          </p>
        </div>
      </Transition>
    </div>

    <!-- Contenu card -->
    <div class="p-5">
      <div class="mb-3 flex flex-wrap gap-2">
        <BadgeTag v-for="tech in project?.stack" :key="tech">{{ tech }}</BadgeTag>
      </div>

      <div class="mb-1 flex items-center justify-between gap-2">
        <h3 class="text-xl font-bold transition group-hover:text-accent">
          {{ project?.title }}
        </h3>

        <!-- Badge statut visible en permanence (non-live) -->
        <span
          v-if="project?.status && project.status !== 'live'"
          :class="[
            'shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium',
            statusConfig[project.status]?.class
          ]"
        >
          {{ t(`portfolio.status.${project.status}`) }}
        </span>
      </div>

      <p v-if="project?.role" class="mb-2 text-sm text-accent">
        {{ project.role }} · {{ project.year }}
      </p>

      <p class="mb-4 text-sm text-text-secondary line-clamp-3">
        {{ project?.description }}
      </p>

      <div class="flex flex-wrap items-center gap-4">
        <NuxtLink
          :to="localePath(`/portfolio/${projectSlug}`)"
          class="text-sm font-medium text-accent hover:underline"
        >
          {{ project?.status === 'live' ? t('projectCard.caseStudy') : t('projectCard.seeVision') }} →
        </NuxtLink>

        <a
          v-if="project?.status === 'live' && project?.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-text-secondary transition-colors hover:text-accent"
        >
          {{ t('projectCard.live') }} ↗
        </a>

        <a
          v-if="project?.status === 'live' && project?.repoUrl"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-text-secondary transition-colors hover:text-accent"
        >
          {{ t('projectCard.code') }} ↗
        </a>
      </div>
    </div>
  </article>
</template>
<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const props = defineProps<{
  project: {
    slug?: string
    path?: string
    image?: string
    title?: string
    description?: string
    stack?: string[]
    role?: string
    year?: string
    liveUrl?: string | null
    repoUrl?: string | null
    status?: 'live' | 'in-progress' | 'concept' | 'draft'
    vision?: string
    wireframe?: string
  }
}>()

const statusConfig = {
  live: { class: 'bg-green-500/10 text-green-400 border-green-500/30' },
  'in-progress': { class: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
  concept: { class: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  draft: { class: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30' },
}

const projectSlug = computed(() =>
  props.project?.path?.split('/').pop() ?? props.project?.slug
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>