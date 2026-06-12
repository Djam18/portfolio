<!-- components/ui/ContactCard.vue -->

<template>
  <a
    :href="href"
    target="_blank"
    class="flex items-center gap-4 rounded-lg border border-border bg-surface p-5 transition hover:border-accent"
  >
    <div
      class="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10"
    >
      <Icon :name="icon" class="h-5 w-5 text-accent" />
    </div>
    <div>
      <p class="text-sm font-medium text-text-secondary">{{ label }}</p>
      <p class="font-medium text-text-primary">{{ value }}</p>
    </div>
  </a>
</template>

<script setup>
defineProps({ icon: String, label: String, value: String, href: String });
</script>
