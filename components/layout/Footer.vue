<template>
  <footer class="border-t border-border bg-surface">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div class="text-center md:text-left">
          <p class="font-display text-lg font-bold text-text-primary">Adam Abdel-Djamal</p>
          <p class="mt-1 text-sm text-text-secondary">Full Stack Web Developer</p>
        </div>

        <div class="flex gap-6">
          <a v-for="social in SOCIALS" :key="social.name" :href="social.url" target="_blank"
            class="text-text-secondary hover:text-accent transition-colors">
            <Icon :name="social.icon" class="h-5 w-5" />
          </a>
        </div>
        <ClientOnly>
          <p class="text-sm text-text-secondary">
            © {{ year }}
          </p>
        </ClientOnly>
      </div>
    </div>
  </footer>
</template>

<script setup lang='ts'>
import { SOCIALS } from '@/constants/socials'
const year = ref('')
onMounted(() => { year.value = new Date().getFullYear() })
</script>