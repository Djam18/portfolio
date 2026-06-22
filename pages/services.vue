<template>
  <div class="mx-auto max-w-5xl px-4 py-24">

    <!-- Header -->
    <div class="mb-16 text-center">
      <h1 class="mb-4 font-display text-4xl font-bold text-text-primary">
        {{ t('services.title') }}
      </h1>
      <p class="mx-auto max-w-2xl text-lg text-text-secondary">
        {{ t('services.intro') }}
      </p>
      <a :href="appConfig.links.cal" target="_blank" rel="noopener noreferrer"
        class="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-medium text-white transition hover:opacity-90">
        {{ t('services.cta') }}
      </a>
    </div>

    <!-- Services Grid -->
    <div class="grid gap-8 md:grid-cols-2">
      <article v-for="service in appConfig.services" :key="service.slug"
        class="group rounded-card border border-border bg-surface p-6 transition hover:border-accent hover:shadow-lg hover:shadow-accent/5">
        <!-- Icon -->
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <Icon :name="service.icon" class="h-6 w-6 text-accent" />
        </div>

        <!-- Title -->
        <h3 class="mb-2 font-display text-2xl font-bold text-text-primary">
          {{ t(`portfolioData.services.${service.slug}.title`) }}
        </h3>

        <!-- Pain Point -->
        <blockquote class="mb-4 border-l-2 border-accent/50 pl-4 italic text-text-secondary">
          « {{ t(`portfolioData.services.${service.slug}.painPoint`) }} »
        </blockquote>

        <!-- Solution -->
        <p class="mb-4 font-medium text-text-primary">
          {{ t(`portfolioData.services.${service.slug}.solution`) }}
        </p>

        <!-- Business Results -->
        <ul class="mb-6 space-y-2">
          <li v-for="(result, index) in tm(`portfolioData.services.${service.slug}.results`)" :key="index"
            class="flex items-start gap-2 text-sm text-text-secondary">
            <Icon name="ph:check-circle" class="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{{ rt(result) }}</span>
          </li>
        </ul>

        <!-- Technologies -->
        <div class="mb-4 flex flex-wrap gap-2">
          <BadgeTag v-for="tech in service.techs" :key="tech" variant="default">
            {{ tech }}
          </BadgeTag>
        </div>

        <!-- Project link -->
        <NuxtLink v-if="service.project" :to="`/portfolio/${service.project}`"
          class="mb-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
          {{ t('services.seeProject') }}
          <Icon name="ph:arrow-right" class="h-4 w-4" />
        </NuxtLink>

        <!-- CTA -->
        <a :href="appConfig.links.cal" target="_blank" rel="noopener noreferrer"
          class="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
          {{ t(`portfolioData.services.${service.slug}.cta`) }}
          <Icon name="ph:calendar-plus" class="h-4 w-4" />
        </a>
      </article>
    </div>

  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
// tm() + rt() est le pattern correct pour les tableaux i18n
// tm() retourne le tableau de messages, rt() résout chaque item en string
const { t, tm, rt } = useI18n()
</script>