<!-- components/ui/SocialLink.vue -->
<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="ariaLabel"
    class="
      flex flex-col items-center gap-2 rounded-lg border
      border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-accent
      focus:outline-none focus:ring-2 focus:ring-accent"
  >
    <Icon :name="icon" class="h-10 w-10 text-accent" />
    <span class="text-sm font-medium">{{ name }}</span>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  url: { type: String, required: true },
});
const { t } = useI18n()
const ariaLabel = `${props.name} (${t('socialLink.opensInNewTab')})`;
</script>
