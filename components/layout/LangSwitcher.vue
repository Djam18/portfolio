<template>
  <div class="relative">
    <select v-model="locale"
      class="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text-primary focus:border-accent focus:outline-none">
      <option v-for="l in locales" :key="l.code" :value="l.code">
        {{ l.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
const { locale, locales } = useI18n()
</script>