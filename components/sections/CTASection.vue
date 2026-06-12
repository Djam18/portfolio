<!-- components/sections/CTASection.vue -->
<template>
  <section class="mx-auto max-w-4xl px-4 py-24 text-center">
    <h2 class="mb-4 font-display text-3xl font-bold text-text-primary">
      {{ t('cta.title') }}
    </h2>
    <p class="mb-8 text-lg text-text-secondary">
      {{ t('cta.description') }}
    </p>
    <NuxtLink
      :to="localePath('/contact')"
      class="inline-block rounded-lg bg-accent px-8 py-3 font-medium text-white transition hover:opacity-90"
    >
      {{ t('cta.button') }}
    </NuxtLink>
  </section>
</template>

<script setup>
  const { t } = useI18n()
  const localePath = useLocalePath()
</script>