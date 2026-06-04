<template>
  <div class="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
    :class="visible ? 'opacity-100' : 'opacity-0'">
    <div class="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-sm"
      :style="{ left: x + 'px', top: y + 'px' }" />
  </div>
</template>
<script setup>
const x = ref(0), y = ref(0), visible = ref(false)
const move = (e) => { x.value = e.clientX; y.value = e.clientY; visible.value = true }
onMounted(() => { window.addEventListener('mousemove', move) })
onUnmounted(() => { window.removeEventListener('mousemove', move) })
</script>