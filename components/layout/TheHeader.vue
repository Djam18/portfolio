<template>
  <header class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="font-display text-xl font-bold text-gradient">
        Adam.
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink v-for="item in nav" :key="item.path" :to="item.path"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          {{ item.label }}
        </NuxtLink>
        <LangSwitcher />
      </nav>

      <button class="md:hidden p-2 text-text-secondary" @click="toggleMobile">
        <Icon name="ph:list" class="h-6 w-6" />
      </button>
    </div>
  </header>
</template>

<script setup>
const nav = [
  { path: '/', label: 'Home' },
  { path: '/portfolio', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/experience', label: 'Experience' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
]

const toggleMobile = () => {
  // Émettre un événement ou utiliser un store si tu veux,
  // mais pour l'instant TheMobileMenu peut utiliser un v-model global simple
  // ou tu peux juste utiliser un état local partagé via provide/inject
}
</script>