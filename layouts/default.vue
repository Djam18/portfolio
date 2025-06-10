<!-- Default layout with sticky header and responsive footer -->
<template>
  <div class="flex flex-col min-h-screen">
    <!-- Sticky Header -->
    <header class="sticky top-0 z-50 bg-white shadow-md">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <!-- Logo -->
        <div class="font-heading font-bold text-primary text-xl">
          <NuxtLink to="/">ADAM Abdel-Djamal</NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-6">
          <NuxtLink v-for="(item, key) in navItems" :key="key" :to="item.to"
            class="font-medium hover:text-secondary transition-colors"
            :class="{ 'text-secondary': $route.path === item.to }">
            {{ $t(`navigation.${key}`) }}
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button class="md:hidden focus:outline-none" @click="isMenuOpen = !isMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="isMenuOpen" class="md:hidden bg-white pb-4 shadow-lg">
        <nav class="container mx-auto px-4 flex flex-col space-y-3">
          <NuxtLink v-for="(item, key) in navItems" :key="key" :to="item.to"
            class="font-medium py-2 hover:text-secondary transition-colors"
            :class="{ 'text-secondary': $route.path === item.to }"
            @click="isMenuOpen = false">
            {{ $t(`navigation.${key}`) }}
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Brand Section -->
          <div>
            <h3 class="font-heading font-bold text-xl mb-3">ADAM Abdel-Djamal</h3>
            <p class="text-neutral/80">Full Stack Web Developer</p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="font-heading font-bold text-lg mb-3">Quick Links</h3>
            <ul class="space-y-2">
              <li v-for="(item, key) in navItems" :key="key">
                <NuxtLink :to="item.to" class="hover:text-secondary transition-colors">
                  {{ $t(`navigation.${key}`) }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Social Links -->
          <div>
            <h3 class="font-heading font-bold text-lg mb-3">Connect</h3>
            <div class="flex space-x-4">
              <a href="https://www.linkedin.com/in/abdel-djamal-adam-b952381b2/" class="text-white hover:text-secondary transition-colors">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
              <a href="https://github.com/Djam18" class="text-white hover:text-secondary transition-colors">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Language Selector -->
          <div>
            <h3 class="font-heading font-bold text-lg mb-3">Language</h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="locale in availableLocales"
                :key="locale.code"
                @click="switchLocale(locale.code)"
                class="px-3 py-1 rounded border border-white hover:bg-white hover:text-dark transition-colors flex items-center justify-center"
                :class="{ 'bg-white text-dark': $i18n.locale === locale.code }"
              >
                {{ locale.name }}
              </button>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-white/20 text-center text-sm text-neutral/60">
          &copy; {{ new Date().getFullYear() }} Adam Abdel-Djamal. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRuntimeConfig } from '#app';

const { locale, setLocale } = useI18n();
const config = useRuntimeConfig();
const isMenuOpen = ref(false);

// Available locales
const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ja', name: '日本語' },
  { code: 'es', name: 'Español' }
];

// Navigation items
const navItems = {
  home: { to: '/' },
  skills: { to: '/skills' },
  portfolio: { to: '/portfolio' },
  services: { to: '/services' },
  contact: { to: '/contact' }
};

// Switch locale
const switchLocale = async (newLocale) => {
  try {
    await setLocale(newLocale);
    // Save the locale preference in a cookie
    document.cookie = `i18n_redirected=${newLocale}; path=/; max-age=31536000`;
  } catch (error) {
    console.error("Erreur lors du changement de locale:", error);
  }
};
</script>