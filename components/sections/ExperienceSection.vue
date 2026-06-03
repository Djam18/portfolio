<template>
  <section class="mx-auto max-w-4xl px-4 py-24">

    <div class="mb-12 flex items-end justify-between">
      <h2 class="font-display text-3xl font-bold text-text-primary">Experience</h2>
      <NuxtLink to="/experience" class="text-sm text-accent hover:underline">
        View all →
      </NuxtLink>
    </div>

    <div class="space-y-10">
      <div
        v-for="job in experience.slice(0, 2)"
        :key="job.company"
        class="relative border-l-2 border-accent pl-8"
      >
        <!-- Dot timeline -->
        <span class="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-accent ring-4 ring-background" />

        <!-- Header -->
        <div class="mb-1 flex flex-wrap items-center justify-between gap-2">
          <h3 class="text-xl font-bold text-text-primary">{{ job.role }}</h3>
          <!-- Badge "current" -->
          <span
            v-if="job.current"
            class="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent"
          >
            Current
          </span>
        </div>

        <!-- Entreprise + période -->
        <p class="mb-1 text-sm font-medium text-accent">
          {{ job.company }} · {{ job.type }}
        </p>
        <p class="mb-3 font-mono text-xs text-text-secondary">
          {{ job.period }} · {{ job.location }}
        </p>

        <!-- Description -->
        <p class="mb-4 text-text-secondary">{{ job.description }}</p>

        <!-- Skills -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in job.skills"
            :key="skill"
            class="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-text-secondary"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
const { experience } = useAppConfig()
</script>