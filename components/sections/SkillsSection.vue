<template>
  <section class="mx-auto max-w-5xl px-4 py-24">
    <h2 class="mb-12 font-display text-3xl font-bold">{{ t('skills.title') }}</h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <SkillBar v-for="s in skills" :key="s.name" :name="s.name" :level="s.level" />
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const skills = [
  { name: 'Vue.js / Nuxt', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Laravel / PHP', level: 85 },
  { name: 'React / React Native', level: 80 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 75 },
  { name: 'Tailwind CSS', level: 92 },
  { name: 'PostgreSQL / SQL', level: 82 },
  { name: 'Docker / DevOps', level: 70 },
]
</script>