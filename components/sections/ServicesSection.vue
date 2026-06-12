<!-- components/sections/ServicesSection.vue -->
<template>
  <section class="mx-auto max-w-6xl px-4 py-24">
    <h2
      class="mb-12 text-center font-display text-3xl font-bold text-text-primary"
    >
      {{ t("services.title") }}
    </h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="svc in services"
        :key="svc.title"
        class="rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
      >
        <Icon :name="svc.icon" class="mb-4 h-8 w-8 text-accent" />
        <h3 class="mb-2 text-lg font-bold text-text-primary">
          {{ svc.title }}
        </h3>
        <p class="text-sm text-text-secondary">{{ svc.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const servicesItems = computed(() => t("services.items"));
const services = computed(() => [
  { icon: "ph:code", ...servicesItems.value[0] },
  { icon: "ph:device-mobile", ...servicesItems.value[1] },
  { icon: "ph:globe", ...servicesItems.value[2] },
]);
</script>
