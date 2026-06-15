<!-- pages/privacy.vue -->
<template>
  <div class="mx-auto max-w-3xl px-4 py-24">
    <h1 class="mb-8 font-display text-4xl font-bold">{{ t('privacy.title') }}</h1>
    <div class="prose prose-invert max-w-none">
      <p>{{ t('privacy.cookies') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>