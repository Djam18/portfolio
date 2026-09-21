<!-- components/ui/TimelineItem.vue -->
<template>
  <div class="relative border-l-2 border-accent pl-8 pb-10 last:pb-0">

    <span
      class="absolute -left-[9px] top-0 h-4 w-4 rounded-full ring-4 ring-background transition-transform"
      :class="current ? 'bg-accent scale-125' : 'bg-accent/50'"
    />

    <div class="flex flex-wrap items-center justify-between gap-2">
      <h3 class="text-xl font-bold text-text-primary">{{ role }}</h3>

      <span
        v-if="current"
        class="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent"
      >
        {{ t('experience.current') }}
      </span>
    </div>

    <p class="mt-1 text-sm font-medium text-accent">
      {{ company }}
      <span v-if="type"> · {{ type }}</span>
    </p>

    <p v-if="period || location" class="mt-1 font-mono text-xs text-text-secondary">
      {{ period }}<span v-if="period && location"> · </span>{{ location }}
    </p>

    <p class="mt-3 text-text-secondary leading-relaxed">{{ description }}</p>

    <div v-if="skills?.length" class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="skill in skills"
        :key="skill"
        class="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-text-secondary"
      >
        {{ skill }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  role: string
  company: string
  year?: string
  period?: string
  type?: string
  location?: string
  current?: boolean
  description: string
  skills?: string[]
}>()

const { t } = useI18n()
</script>