<template>
  <footer class="border-t border-border bg-surface">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div class="text-center md:text-left">
          <p class="font-display text-lg font-bold text-text-primary">Adam Abdel-Djamal</p>
          <p class="mt-1 text-sm text-text-secondary">Full Stack Web Developer</p>
        </div>

        <div class="flex gap-6">
          <a v-for="link in socials" :key="link.name" :href="link.url" target="_blank"
            class="text-text-secondary hover:text-accent transition-colors">
            <Icon :name="link.icon" class="h-5 w-5" />
          </a>
        </div>
        <ClientOnly>
          <p class="text-sm text-text-secondary">
            © {{ year }} Adam Abdel-Djamal
          </p>
        </ClientOnly>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = ref('')
onMounted(() => { year.value = new Date().getFullYear() })

const socials = [
  { name: 'GitHub', icon: 'ph:github-logo', url: 'https://github.com' },
  { name: 'LinkedIn', icon: 'ph:linkedin-logo', url: 'https://linkedin.com' },
  { name: 'Email', icon: 'ph:envelope', url: 'mailto:contact@example.com' },
]
</script>