//SkillBar
<template>
  <div class="rounded-lg border border-border bg-surface p-5">
    <div class="mb-2 flex items-center justify-between">
      <span class="font-medium">{{ name }}</span>
      <span class="text-sm text-accent">{{ level }}%</span>
    </div>
    <div class="h-2 rounded-full bg-background">
      <div class="h-2 rounded-full bg-accent" :style="{ width: level + '%' }" />
    </div>
  </div>
</template>
<script setup>
defineProps({ name: String, level: Number })
</script>