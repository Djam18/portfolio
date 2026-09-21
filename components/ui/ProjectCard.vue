<!-- components/ui/ProjectCard.vue -->
<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-accent hover:shadow-xl hover:shadow-accent/5"
  >
    <!-- Mockup Header Bar -->
    <div class="flex items-center justify-between border-b border-border bg-surface-elevated/70 px-4 py-2.5 backdrop-blur-sm">
      <div class="flex items-center gap-1.5">
        <span class="h-2.5 w-2.5 rounded-full bg-red-500/70"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-yellow-500/70"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-green-500/70"></span>
        <span class="ml-2 font-mono text-[11px] text-text-secondary">
          ~/projects/{{ projectSlug }}
        </span>
      </div>

      <!-- Status Badge -->
      <span
        v-if="project?.status"
        :class="[
          'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide',
          statusConfig[project.status]?.class || statusConfig.inProgress.class
        ]"
      >
        <span class="relative flex h-1.5 w-1.5">
          <span
            v-if="project.status === 'live' || project.status === 'in-progress'"
            :class="[
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              statusConfig[project.status]?.dot
            ]"
          ></span>
          <span :class="['relative inline-flex h-1.5 w-1.5 rounded-full', statusConfig[project.status]?.dot]"></span>
        </span>
        {{ t(`portfolio.status.${project.status}`) }}
      </span>
    </div>

    <!-- Visual Media Container -->
    <div class="relative aspect-video w-full overflow-hidden bg-background">
      <!-- 1. Real Screenshot -->
      <NuxtImg
        v-if="project?.image"
        :src="project.image"
        :alt="project?.title"
        class="h-full w-full object-cover object-top opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        width="600"
        height="340"
      />

      <!-- 2. Architectural Blueprint Canvas (when no screenshot) -->
      <div
        v-else
        class="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-background via-surface to-background p-6 font-mono text-xs"
      >
        <!-- Background Grid Graphic -->
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>

        <div class="relative z-10 flex items-center justify-between text-text-secondary">
          <span class="flex items-center gap-2 font-semibold text-accent">
            <Icon name="ph:cpu" class="h-4 w-4" />
            ARCHITECTURE BLUEPRINT
          </span>
          <span class="rounded border border-border bg-surface px-2 py-0.5 text-[10px]">
            {{ project?.category?.toUpperCase() || 'BACKEND' }}
          </span>
        </div>

        <div class="relative z-10 my-auto text-center">
          <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-lg shadow-accent/10">
            <Icon :name="getProjectIcon(projectSlug)" class="h-6 w-6" />
          </div>
          <p class="font-display text-base font-bold text-text-primary">
            {{ project?.title }}
          </p>
          <p class="mt-1 text-[11px] text-text-secondary">
            Multi-Tenant Isolation · Database Per Tenant · Stripe Webhooks
          </p>
        </div>

        <div class="relative z-10 flex items-center justify-between text-[11px] text-text-secondary">
          <span>● Stack: {{ project?.stack?.slice(0, 3)?.join(' · ') }}</span>
          <span class="text-accent">Ready for review →</span>
        </div>
      </div>
    </div>

    <!-- Card Content -->
    <div class="flex flex-1 flex-col p-5">
      <!-- Tech Stack Badges -->
      <div class="mb-3 flex flex-wrap gap-1.5">
        <BadgeTag v-for="tech in project?.stack?.slice(0, 5)" :key="tech">
          {{ tech }}
        </BadgeTag>
        <span
          v-if="(project?.stack?.length || 0) > 5"
          class="inline-flex items-center rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-text-secondary"
        >
          +{{ (project?.stack?.length || 0) - 5 }}
        </span>
      </div>

      <!-- Title & Year -->
      <div class="mb-1 flex items-start justify-between gap-2">
        <h3 class="font-display text-xl font-bold text-text-primary transition group-hover:text-accent">
          {{ project?.title }}
        </h3>
      </div>

      <p v-if="project?.role" class="mb-3 text-xs font-medium text-accent">
        {{ project.role }} · {{ project.year }}
      </p>

      <!-- Description -->
      <p class="mb-6 text-sm leading-relaxed text-text-secondary line-clamp-3">
        {{ project?.description }}
      </p>

      <!-- Action Footer -->
      <div class="mt-auto flex flex-wrap items-center gap-2.5 pt-3 border-t border-border">
        <!-- Direct GitHub Link -->
        <a
          v-if="project?.repoUrl"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-primary transition hover:border-accent hover:text-accent"
        >
          <Icon name="ph:github-logo" class="h-4 w-4" />
          <span>{{ t('projectCard.code') }}</span>
        </a>

        <!-- Direct Live Link -->
        <a
          v-if="project?.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-primary transition hover:border-accent hover:text-accent"
        >
          <Icon name="ph:arrow-square-out" class="h-4 w-4" />
          <span>{{ t('projectCard.live') }}</span>
        </a>

        <!-- Case Study / Details Link -->
        <NuxtLink
          :to="localePath(`/portfolio/${projectSlug}`)"
          class="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-accent transition hover:underline"
        >
          <span>
            {{
              project?.status === 'live'
                ? t('projectCard.caseStudy')
                : (project?.status === 'analysis'
                    ? (t('projectCard.seeAnalysis') || t('projectCard.seeVision'))
                    : t('projectCard.seeVision'))
            }}
          </span>
          <Icon name="ph:arrow-right" class="h-3.5 w-3.5" />
        </NuxtLink>
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
    image?: string | null
    title?: string
    description?: string
    stack?: string[]
    role?: string
    year?: string
    category?: string
    liveUrl?: string | null
    repoUrl?: string | null
    status?: 'live' | 'in-progress' | 'concept' | 'draft' | 'analysis'
    vision?: string
    wireframe?: string
  }
}>()

const statusConfig: Record<string, { class: string; dot: string }> = {
  live: {
    class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    dot: 'bg-emerald-400'
  },
  'in-progress': {
    class: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    dot: 'bg-amber-400'
  },
  analysis: {
    class: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    dot: 'bg-purple-400'
  },
  concept: {
    class: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    dot: 'bg-blue-400'
  },
  draft: {
    class: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30',
    dot: 'bg-zinc-400'
  },
}

const projectSlug = computed(() =>
  props.project?.path?.split('/').pop() ?? props.project?.slug ?? 'project'
)

function getProjectIcon(slug: string): string {
  if (slug.includes('operia')) return 'ph:robot'
  if (slug.includes('ats')) return 'ph:file-text'
  if (slug.includes('shop')) return 'ph:storefront'
  return 'ph:code'
}
</script>