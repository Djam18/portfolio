<template>
  <component :is="tag" class="inline-block">
    <span v-for="(char, i) in text.split('')" :key="i" class="inline-block transition-transform duration-200"
      :class="{ '-translate-y-1 text-accent': hover === i }" @mouseenter="hover = i" @mouseleave="hover = -1">
      {{ char === ' ' ? '\u00A0' : char }}
    </span>
  </component>
</template>
<script setup>
const props = defineProps({ text: String, tag: { type: String, default: 'span' } })
const hover = ref(-1)
</script>