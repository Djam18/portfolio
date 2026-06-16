<!-- components/ui/ProjectCard.vue -->
<template>
  <article
    class="group overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/5"
  >
    <div class="aspect-video overflow-hidden bg-background">
      <NuxtImg
        v-if="project?.image"
        :src="project?.image"
        :alt="project?.title"
        class="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        width="600"
        height="340"
      />
      <div v-else class="flex h-full items-center justify-center">
        <Icon name="ph:image" class="h-10 w-10 text-text-secondary" />
      </div>
    </div>
    <div class="p-5">
      <div class="mb-3 flex flex-wrap gap-2">
        <BadgeTag v-for="t in project?.stack" :key="t">{{ t }}</BadgeTag>
      </div>
      <h3 class="mb-1 text-xl font-bold transition group-hover:text-accent">
        {{ project?.title }}
      </h3>
      <p v-if="project?.role" class="mb-2 text-sm text-accent">
        {{ project?.role }} · {{ project?.year }}
      </p>
      <p class="mb-4 text-sm text-text-secondary line-clamp-3">
        {{ project?.description }}
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <NuxtLink
          :to="`/portfolio/${projectSlug}`"
          class="text-sm font-medium text-accent hover:underline"
        >
          {{ t('projectCard.caseStudy') }} →
        </NuxtLink>
        <a
          v-if="project?.liveUrl"
          :href="project?.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-text-secondary hover:text-accent transition-colors"
        >
          {{ t('projectCard.live') }} ↗
        </a>
        <a
          v-if="project?.repoUrl"
          :href="project?.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-text-secondary hover:text-accent transition-colors"
        >
          {{ t('projectCard.code') }} ↗
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const { t } = useI18n()
const props = defineProps({ project: Object })
const projectSlug = computed(() =>
  props.project?.path?.split('/').pop() ?? props.project?.slug
)

</script>