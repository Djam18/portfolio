<!-- components/ui/LevelBadge.vue -->
<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider"
    :class="[
      level === 'expert' ? 'bg-accent/10 text-accent' : '',
      level === 'proficient' ? 'bg-yellow-500/10 text-yellow-400' : '',
      level === 'familiar' ? 'bg-text-secondary/10 text-text-secondary' : '',
      size === 'sm' ? 'px-2 py-0.5 text-[10px]' : ''
    ]"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  level: 'expert' | 'proficient' | 'familiar'
  size?: 'md' | 'sm'
}>()

const size = computed(() => props.size ?? 'md')

const { t } = useI18n()

const label = computed(() => {
  const labels: Record<string, string> = {
    expert: t('skills.levels.expert'),
    proficient: t('skills.levels.proficient'),
    familiar: t('skills.levels.familiar')
  }
  return labels[props.level]
})
</script>