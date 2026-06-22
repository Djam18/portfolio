<!-- components/sections/ExperienceSection.vue -->
<template>
  <section class="mx-auto max-w-4xl px-4 py-24">
    <div class="mb-12 flex items-end justify-between">
      <h2 class="font-display text-3xl font-bold text-text-primary">
        {{ t('experience.title') }}
      </h2>
      <NuxtLink
        :to="localePath('/experience')"
        class="text-sm text-accent hover:underline"
      >
        {{ t('experience.viewAll') }} →
      </NuxtLink>
    </div>

    <div class="space-y-10">
      <div
        v-for="job in experience.slice(0, 2)"
        :key="job.slug"
        class="relative border-l-2 border-accent pl-8"
      >
        <!-- Pastille timeline — balise fermée explicitement, pas auto-fermante -->
        <span class="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-accent ring-4 ring-background"></span>

        <div class="mb-1 flex flex-wrap items-center justify-between gap-2">
          <h3 class="text-xl font-bold text-text-primary">
            {{ t(`portfolioData.experience.${job.slug}.role`) }}
          </h3>
          <span
            v-if="job.current"
            class="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent"
          >
            {{ t('experience.current') }}
          </span>
        </div>

        <p class="mb-1 text-sm font-medium text-accent">
          {{ t(`portfolioData.experience.${job.slug}.company`) }}
          ·
          {{ t(`portfolioData.experience.${job.slug}.type`) }}
        </p>

        <p class="mb-3 font-mono text-xs text-text-secondary">
          {{ t(`portfolioData.experience.${job.slug}.period`) }}
          ·
          {{ t(`portfolioData.experience.${job.slug}.location`) }}
        </p>

        <p class="mb-4 text-text-secondary">
          {{ t(`portfolioData.experience.${job.slug}.description`) }}
        </p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in job.skills"
            :key="skill"
            class="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-text-secondary"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// experience vient de app.config.ts — chaque item a maintenant un slug
const { experience } = useAppConfig()
</script>