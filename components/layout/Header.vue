<!-- components/layout/Header.vue -->
<template>
  <header class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <NuxtLink :to="localePath('/')" class="font-display text-xl font-bold text-gradient">
        Adam.
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          active-class="text-accent"
        >
          {{ item.label }}
        </NuxtLink>

        <div class="h-4 w-px bg-border" />

        <button
          @click="toggle"
          class="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
          :aria-label="theme === 'dark' ? t('button.light') : t('button.dark')"
        >
          <Icon :name="theme === 'dark' ? 'ph:sun' : 'ph:moon'" class="h-5 w-5" />
        </button>

        <LangSwitcher />
      </nav>

      <button class="md:hidden p-2 text-text-secondary" @click="mobileMenuStore.toggle">
        <Icon name="ph:list" class="h-6 w-6" />
      </button>
    </div>
  </header>
</template>

<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const mobileMenuStore = useMobileMenu()
const { theme, toggle } = useColorTheme()

const nav = computed(() => [
  { to: localePath('/'),           label: t('nav.home') },
  { to: localePath('/portfolio'),  label: t('nav.projects') },
  { to: localePath('/skills'),     label: t('nav.skills') },
  { to: localePath('/experience'), label: t('nav.experience') },
  { to: localePath('/blog'),       label: t('nav.blog') },
  { to: localePath('/contact'),    label: t('nav.contact') },
])
</script>