<!-- components/ui/BlogCard.vue -->
<template>
  <NuxtLink
    :to="localePath(`/blog/${slug}`)"
    class="block rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
  >
    <p class="mb-2 text-xs text-accent">{{ post.date }}</p>
    <h3 class="mb-2 text-xl font-bold">{{ post.title }}</h3>
    <p class="text-sm text-text-secondary line-clamp-2">
      {{ post.description }}
    </p>
  </NuxtLink>
</template>

<script setup>
const localePath = useLocalePath();
const props = defineProps({ post: Object });
const slug = computed(() => {
  if (!props.post?.id) return "";
  return props.post.id.split("/").pop()?.replace(/\.md$/, "") ?? "";
});
</script>
