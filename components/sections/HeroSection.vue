<!-- components/sections/HeroSection.vue -->

<template>
  <section class="relative flex min-h-[90vh] flex-col items-center justify-center px-4 text-center">

    <!-- Badge disponibilité -->
    <div class="mb-6 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm">
      <span class="relative flex h-2 w-2">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span class="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
      </span>
      <span class="font-mono text-text-secondary">
        {{ t('hero.available') }}
      </span>
    </div>

    <!-- Titre / rôle -->
    <p class="mb-3 font-mono text-sm uppercase tracking-widest text-accent">
      {{ t('portfolioData.identity.title') }}
    </p>

    <!-- Nom -->
    <h1 class="mb-6 font-display text-5xl font-bold text-text-primary sm:text-7xl">
      {{ t('portfolioData.identity.name') }}
    </h1>

    <!-- Tagline -->
    <p class="mx-auto mb-4 max-w-xl font-mono text-sm text-text-secondary">
      {{ t('portfolioData.identity.tagline') }}
    </p>

    <!-- Bio -->
    <p class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary">
      {{ t('portfolioData.identity.bio') }}
    </p>

    <!-- CTAs -->
    <div class="mb-10 flex flex-wrap justify-center gap-4">
      <NuxtLink to="/portfolio"
        class="rounded-lg bg-accent px-8 py-3 font-medium text-white transition hover:opacity-90">
        {{ t('hero.viewProjects') }}
      </NuxtLink>

      <NuxtLink to="/contact"
        class="rounded-lg border border-border px-8 py-3 font-medium text-text-primary transition hover:bg-surface">
        {{ t('hero.contactMe') }}
      </NuxtLink>
    </div>

    <!-- Liens sociaux + localisation -->
    <div class="flex items-center gap-6">
      <a :href="links.github" target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary">
        <Icon name="ph:github-logo" class="h-5 w-5" />
        {{ t('hero.github') }}
      </a>

      <span class="h-4 w-px bg-border"></span>

      <a :href="links.linkedin" target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary">
        <Icon name="ph:linkedin-logo" class="h-5 w-5" />
        {{ t('hero.linkedin') }}
      </a>

      <span class="h-4 w-px bg-border"></span>

      <span class="flex items-center gap-2 text-sm text-text-secondary">
        <Icon name="ph:map-pin" class="h-5 w-5" />
        {{ t('portfolioData.identity.location') }}
      </span>
    </div>

    <!-- Flèche défilement -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <Icon name="ph:arrow-down" class="h-5 w-5 text-text-secondary" />
    </div>

  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const links = useAppConfig().links
</script>