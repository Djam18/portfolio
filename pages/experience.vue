<template>
  <div class="mx-auto max-w-4xl px-4 py-24">
    <h1 class="mb-12 font-display text-4xl font-bold">Experience</h1>
    <div class="space-y-10">
      <div v-for="job in jobs" :key="job.company" class="relative border-l-2 border-accent pl-8">
        <span class="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-accent" />
        <h3 class="text-xl font-bold text-text-primary">{{ job.role }}</h3>
        <p class="mt-1 text-sm font-medium text-accent">{{ job.company }} | {{ job.year }}</p>
        <p class="mt-2 text-text-secondary">{{ job.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({ title: 'Experience | Adam Abdel-Djamal' })
const jobs = [
  { role: 'Web Developer Intern', company: 'OSI Group', year: '2022', desc: 'Built full-stack web apps with clean architectures and modern UI patterns.' },
  { role: 'Web Content Editor', company: 'RedacLink', year: '2021', desc: 'Wrote SEO-optimized articles and product descriptions for e-commerce platforms.' },
  { role: 'Academic Intern', company: 'Rintio', year: '2019', desc: 'Developed an Angular interface for data collection and visualization dashboards.' },
]
</script>