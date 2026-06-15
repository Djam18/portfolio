<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
const { theme, applyTheme } = useColorTheme()

// Applique le thème sauvegardé dès le montage
onMounted(() => applyTheme(theme.value))
</script>