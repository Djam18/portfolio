<template>
  <div ref="el" class="transition-all duration-700" :class="show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
    <slot />
  </div>
</template>
<script setup>
const el = ref(null)
const show = ref(false)
onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) show.value = true }, { threshold: 0.1 })
  if (el.value) observer.observe(el.value)
})
</script>