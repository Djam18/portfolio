<!-- pages/portfolio/[slug].vue -->
<template>
  <article class="mx-auto max-w-3xl px-4 py-24">

    <!-- Retour -->
    <NuxtLink
      :to="localePath('/portfolio')"
      class="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
    >
      <Icon name="ph:arrow-left" class="h-4 w-4" />
      {{ t("portfolio.backToList") }}
    </NuxtLink>

    <!-- Bandeau statut (non-live) -->
    <div
      v-if="project?.status && project.status !== 'live'"
      class="mb-8 flex items-start gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-5 py-4"
    >
      <Icon name="ph:warning" class="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
      <div>
        <p class="font-medium text-yellow-300">
          {{ t(`portfolio.statusBanner.${project.status}.title`) }}
        </p>
        <p class="mt-0.5 text-sm text-text-secondary">
          {{ t(`portfolio.statusBanner.${project.status}.description`) }}
        </p>
      </div>
    </div>

    <!-- Image principale -->
    <NuxtImg
      v-if="project?.image"
      :src="project.image"
      :alt="project?.title ?? ''"
      format="webp"
      loading="lazy"
      class="mb-8 w-full rounded-lg object-cover"
    />

    <!-- Titre + meta -->
    <h1 class="mb-4 font-display text-4xl font-bold">{{ project?.title }}</h1>
    <div class="mb-6 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
      <span class="text-accent">{{ project?.role }}</span>
      <span>{{ project?.year }}</span>
    </div>

    <!-- Stack -->
    <div class="mb-8 flex flex-wrap gap-2">
      <BadgeTag v-for="tech in project?.stack" :key="tech" variant="accent">
        {{ tech }}
      </BadgeTag>
    </div>

    <!-- CONTENU SELON STATUT -->

    <!-- Projet live : case study -->
    <div v-if="project?.status === 'live'" class="prose prose-invert max-w-none">
      <h2>{{ t("portfolio.context") }}</h2>
      <p>{{ project?.context }}</p>
      <h2>{{ t("portfolio.challenges") }}</h2>
      <p>{{ project?.challenges }}</p>
      <h2>{{ t("portfolio.solution") }}</h2>
      <p>{{ project?.solution }}</p>
      <h2>{{ t("portfolio.results") }}</h2>
      <p>{{ project?.results }}</p>
    </div>

    <!-- Projet non-live : vision + wireframe -->
    <div v-else class="space-y-6">

      <p class="text-lg leading-relaxed text-text-secondary">
        {{ project?.description }}
      </p>

      <div v-if="project?.vision" class="rounded-xl border border-accent/20 bg-accent/5 p-6">
        <h2 class="mb-3 font-display text-xl font-bold text-accent">
          {{ t("portfolio.vision.title") }}
        </h2>
        <p class="text-text-secondary">{{ project.vision }}</p>
      </div>

      <div v-if="project?.motivation" class="rounded-xl border border-border bg-surface p-6">
        <h2 class="mb-3 font-display text-xl font-bold">
          {{ t("portfolio.vision.motivation") }}
        </h2>
        <p class="text-text-secondary">{{ project.motivation }}</p>
      </div>

      <div v-if="project?.approach" class="rounded-xl border border-border bg-surface p-6">
        <h2 class="mb-3 font-display text-xl font-bold">
          {{ t("portfolio.vision.approach") }}
        </h2>
        <p class="text-text-secondary">{{ project.approach }}</p>
      </div>

      <div v-if="project?.expectedOutcome" class="rounded-xl border border-border bg-surface p-6">
        <h2 class="mb-3 font-display text-xl font-bold">
          {{ t("portfolio.vision.expectedOutcome") }}
        </h2>
        <p class="text-text-secondary">{{ project.expectedOutcome }}</p>
      </div>

      <!-- Wireframe -->
      <div v-if="project?.wireframe" class="mt-8">
        <h2 class="mb-4 font-display text-xl font-bold">
          {{ t("portfolio.vision.wireframe") }}
        </h2>
        <div class="overflow-hidden rounded-xl border border-border bg-surface">
          <NuxtImg
            :src="project.wireframe"
            :alt="`Wireframe ${project.title}`"
            format="webp"
            loading="lazy"
            class="w-full"
          />
        </div>
        <p class="mt-3 text-sm text-text-secondary">
          {{ t("portfolio.vision.wireframeNote") }}
        </p>
      </div>

    </div>

    <!-- CTA -->
    <div class="mt-12 flex flex-wrap gap-4">
      <template v-if="project?.status === 'live'">
<a
          v-if="project?.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener"
          class="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
        >
          {{ t("portfolio.liveSite") }} ↗
        </a>
<a
          v-if="project?.repoUrl"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener"
          class="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
        >
          {{ t("portfolio.sourceCode") }} ↗
        </a>
      </template>
      <NuxtLink
        v-else
        :to="localePath('/contact')"
        class="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-bg transition hover:opacity-90"
      >
        {{ t("portfolio.statusBanner.cta") }} →
      </NuxtLink>
    </div>

  </article>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const { t, locale } = useI18n()

const slug = route.params.slug as string

const { data: project } = await useAsyncData(
  `project-${locale.value}-${slug}`,
  () =>
    queryCollection('projects')
      .path(`/projects/${locale.value}/${slug}`)
      .first(),
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}
</script>