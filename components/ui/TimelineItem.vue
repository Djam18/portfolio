<!-- components/ui/TimelineItem.vue -->
<template>
  <div class="relative border-l-2 border-accent pl-8 pb-10 last:pb-0">

    <span
      class="absolute -left-[9px] top-0 h-4 w-4 rounded-full ring-4 ring-background transition-transform"
      :class="current ? 'bg-accent scale-125' : 'bg-accent/50'"
    />

    <div class="flex flex-wrap items-center gap-2">
      <h3 class="text-xl font-bold text-text-primary">{{ role }}</h3>

      <span
        v-if="current"
        class="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent"
      >
        {{ t('experience.current') }}
      </span>
    </div>

    <p class="mt-1 text-sm font-medium text-accent">
      {{ company }}
      <span class="text-text-secondary font-normal"> · {{ period }}</span>
    </p>

    <p class="mt-2 text-text-secondary leading-relaxed">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  role: string
  company: string
  year: string
  period?: string
  current?: boolean
  description: string
}>()

const { t } = useI18n()
</script>