<!-- components/ui/TimelineItem.vue -->

<template>
  <div class="relative border-l-2 border-accent pl-8">
    <span class="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-accent" />
    <h3 class="text-xl font-bold">{{ role }}</h3>
    <p class="mt-1 text-sm font-medium text-accent">
      {{ company }} | {{ year }}
    </p>
    <p class="mt-2 text-text-secondary">{{ description }}</p>
  </div>
</template>
<script setup lang="ts">
defineProps({
  role: String,
  company: String,
  year: String,
  description: String,
});
</script>
