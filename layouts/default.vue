<template>
  <div class="flex min-h-screen flex-col bg-background text-text-primary antialiased">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="font-display text-xl font-bold text-text-primary">
          ADAM<span class="text-accent">.</span>
        </NuxtLink>

        <nav class="hidden items-center gap-8 text-sm font-medium md:flex">
          <NuxtLink v-for="item in nav" :key="item.to" :to="item.to"
            class="text-text-secondary transition hover:text-text-primary"
            active-class="text-accent">
            {{ item.label }}
          </NuxtLink>
        </nav>

        <button class="p-2 text-text-secondary md:hidden" @click="isOpen = !isOpen">
          <Icon name="ph:list" class="h-6 w-6" />
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="isOpen" class="border-t border-border px-4 py-4 md:hidden">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to"
          class="block py-3 text-lg font-bold text-text-primary"
          @click="isOpen = false">
          {{ item.label }}
        </NuxtLink>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-border bg-surface">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p class="text-sm font-bold text-text-primary">Adam Abdel-Djamal</p>
        <div class="flex gap-4">
          <a href="https://github.com/Djam18" target="_blank" class="text-text-secondary hover:text-accent">
            <Icon name="ph:github-logo" class="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/abdel-djamal-adam-b952381b2/" target="_blank" class="text-text-secondary hover:text-accent">
            <Icon name="ph:linkedin-logo" class="h-5 w-5" />
          </a>
        </div>
        <ClientOnly>
          <p class="text-xs text-text-secondary">© {{ year }} Adam Abdel-Djamal</p>
        </ClientOnly>
      </div>
    </footer>
  </div>
</template>

<script setup>
const isOpen = ref(false)
const year = ref('')
onMounted(() => { year.value = new Date().getFullYear() })

const nav = [
  { to: '/', label: 'Home' },
  { to: '/skills', label: 'Skills' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]
</script>