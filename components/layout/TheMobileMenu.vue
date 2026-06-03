<template>
  <div class="md:hidden">
    <!-- Menu overlay simple -->
    <div v-if="isOpen" class="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-20 px-6">
      <button @click="isOpen = false" class="absolute top-4 right-4 p-2 text-text-secondary">
        <Icon name="ph:x" class="h-6 w-6" />
      </button>
      <nav class="flex flex-col gap-6">
        <NuxtLink v-for="item in nav" :key="item.path" :to="item.path"
          @click="isOpen = false"
          class="text-2xl font-display font-bold text-text-primary">
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false)
const nav = [
  { path: '/', label: 'Home' },
  { path: '/portfolio', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/experience', label: 'Experience' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
]

// Exposer une méthode pour l'header
provide('toggleMobile', () => isOpen.value = !isOpen.value)
</script>