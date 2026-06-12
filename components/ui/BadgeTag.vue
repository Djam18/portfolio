<!-- components/ui/BadgeTag.vue-->
<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
    :class="
      variant === 'accent'
        ? 'bg-accent/10 text-accent'
        : 'border border-border bg-surface text-text-secondary'
    "
  >
    <slot />
  </span>
</template>
<script setup>
defineProps({ variant: { type: String, default: "default" } });
</script>
