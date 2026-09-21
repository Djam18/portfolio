<!-- pages/experience.vue -->
<template>
  <div class="mx-auto max-w-4xl px-4 py-24">
    <h1 class="mb-4 font-display text-4xl font-bold">
      {{ t('experience.title') }}
    </h1>
    <p class="mb-12 text-text-secondary">{{ t('experience.subtitle') }}</p>

    <div class="space-y-0">
      <TimelineItem
        v-for="job in experience"
        :key="job.slug"
        :role="t(`portfolioData.experience.${job.slug}.role`)"
        :company="t(`portfolioData.experience.${job.slug}.company`)"
        :type="t(`portfolioData.experience.${job.slug}.type`)"
        :location="t(`portfolioData.experience.${job.slug}.location`)"
        :period="t(`portfolioData.experience.${job.slug}.period`)"
        :current="job.current"
        :description="t(`portfolioData.experience.${job.slug}.description`)"
        :skills="job.skills"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { experience } = useAppConfig()

useHead({
  title: computed(() => t('metaTitles.experiencePage', { author: 'Adam Abdel-Djamal' }))
})
</script>