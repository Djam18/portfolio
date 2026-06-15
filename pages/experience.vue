<!-- pages/experience.vue -->
<template>
  <div class="mx-auto max-w-4xl px-4 py-24">
    <h1 class="mb-4 font-display text-4xl font-bold">
      {{ t('experience.title') }}
    </h1>
    <p class="mb-12 text-text-secondary">{{ t('experience.subtitle') }}</p>

    <div class="space-y-0">
      <TimelineItem
        v-for="job in jobs"
        :key="rt(job.company)"
        :role="rt(job.role)"
        :company="rt(job.company)"
        :year="rt(job.year)"
        :period="rt(job.period)"
        :current="!!job.current"
        :description="rt(job.desc)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, tm, rt } = useI18n()

useHead({
  title: computed(() => t('metaTitles.experiencePage', { author: 'Adam Abdel-Djamal' }))
})

const jobs = computed(() => tm('experience.jobs'))
</script>