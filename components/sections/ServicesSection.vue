<!-- components/sections/ServicesSection.vue -->
<template>
  <section class="mx-auto max-w-6xl px-4 py-24">

    <h2 class="mb-4 text-center font-display text-3xl font-bold text-text-primary">
      {{ t("services.title") }}
    </h2>

    <!-- intro existait dans le JSON mais n'était pas affiché -->
    <p class="mb-12 text-center text-text-secondary">
      {{ t("services.intro") }}
    </p>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="svc in services"
        :key="svc.title"
        class="rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
      >
        <Icon :name="svc.icon" class="mb-4 h-8 w-8 text-accent" />
        <h3 class="mb-2 text-lg font-bold text-text-primary">
          {{ svc.title }}                   <!-- plus de t() ici -->
        </h3>
        <p class="text-sm text-text-secondary">{{ svc.desc }}</p>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
const { t, tm, rt } = useI18n()

// Les icônes par index : fragile si tu réordonnes le JSON
// → voir note ci-dessous pour les déplacer dans le JSON
const ICONS = ['ph:code', 'ph:device-mobile', 'ph:globe']

const services = computed(() =>
  (tm('services.items') as any[]).map((item, i) => ({
    icon: ICONS[i] ?? 'ph:star',           // fallback si un item s'ajoute
    title: rt(item.title),                 // rt() appliqué ici, pas dans le template
    desc: rt(item.desc),
  }))
)
</script>