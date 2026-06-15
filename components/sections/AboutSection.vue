<!-- components/sections/AboutSection.vue -->
<template>
  <section class="mx-auto max-w-4xl px-4 py-24">
    <h2 class="mb-8 font-display text-3xl font-bold text-text-primary">
      {{ t('about.title') }}
    </h2>
    <div class="space-y-4 text-lg leading-relaxed text-text-secondary">
      <p>{{ t('about.p1') }}</p>
      <p>{{ t('about.p2') }}</p>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n()
</script>