<!--
  SkillsSection.vue: Skills and expertise display component
  Purpose: Displays developer skills with animated progress bars
  Props: None
  Hooks: onMounted - Initializes GSAP animations for progress bars
  Uses GSAP/ScrollTrigger for animated progress bars on scroll
-->
<template>
  <section id="skills" class="py-20 bg-white relative overflow-hidden">
    <!-- Background SVG -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <img src="~/assets/images/skills-bg.svg" alt="" class="w-full h-full object-cover" />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <h2 class="font-heading text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
        {{ t('skills.title') }}
      </h2>

      <p class="text-center text-dark/70 max-w-3xl mx-auto mb-12">
        {{ t('skills.subtitle') }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <!-- Languages Skills -->
        <div class="bg-neutral/30 p-6 rounded-lg shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow">
          <h3 class="font-heading text-xl font-bold text-primary mb-6 flex items-center">
            <span class="bg-accent2/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent2" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            {{ t('skills.categories.languages.title') }}
          </h3>

          <div class="space-y-6">
            <SkillBar v-for="(skill, index) in languageSkills" :key="index" :name="skill.name" :level="skill.level" />
          </div>
        </div>

        <!-- Frameworks Skills -->
        <div class="bg-neutral/30 p-6 rounded-lg shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow">
          <h3 class="font-heading text-xl font-bold text-primary mb-6 flex items-center">
            <span class="bg-secondary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            {{ t('skills.categories.frameworks.title') }}
          </h3>

          <div class="space-y-6">
            <SkillBar v-for="(skill, index) in frameworkSkills" :key="index" :name="skill.name" :level="skill.level" />
          </div>
        </div>

        <!-- Tools Skills -->
        <div
          class="lg:col-span-1 md:col-span-2 bg-neutral/30 p-6 rounded-lg shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow">
          <h3 class="font-heading text-xl font-bold text-primary mb-6 flex items-center">
            <span class="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            {{ t('skills.categories.tools.title') }}
          </h3>

          <div class="space-y-6">
            <SkillBar v-for="(skill, index) in toolSkills" :key="index" :name="skill.name" :level="skill.level" />
          </div>
        </div>
      </div>
      <div class="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <!-- Databases -->
        <div class="bg-neutral/30 p-6 rounded-lg shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow">
          <h3 class="font-heading text-xl font-bold text-primary mb-6 flex items-center">
            <span class="bg-accent2/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">

              <!-- SVG pour DATABASES -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent2" viewBox="0 0 20 20"
                fill="currentColor">
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
            </span>
            {{ t('otherSkills.databases.title') }}
          </h3>

          <div class="space-y-6">
            <SkillBar v-for="(skill, index) in databasesSkills" :key="index" :name="skill.name" :level="skill.level" />
          </div>
        </div>

        <!-- Testing Skills -->
        <div class="bg-neutral/30 p-6 rounded-lg shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow">
          <h3 class="font-heading text-xl font-bold text-primary mb-6 flex items-center">
            <span class="bg-secondary/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
              <!-- Alternative pour TESTING (icône de becher/laboratoire) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent2" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.121-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.18l-3.065-1.022A1 1 0 017 10.172z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            {{ t('otherSkills.testing.title') }}
          </h3>

          <div class="space-y-6">
            <SkillBar v-for="(skill, index) in testingSkills" :key="index" :name="skill.name" :level="skill.level" />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Skills data mapped from i18n with demo levels
// In a real app, these could come from a backend API
const skills = {
  "title": "Skills",
  "categories": {
    "languages": {
      "title": "Languages",
      "items": ["HTML", "CSS", "JavaScript", "PHP"]
    },
    "frameworks": {
      "title": "Frameworks",
      "items": ["Laravel", "Vue.js", "Bootstrap", "Tailwind CSS", "Nuxt.js"]
    },
    "tools": {
      "title": "Tools",
      "items": ["Docker", "Linux", "Git"]
    }
  }
};
const otherSkills = {
  "title": "",
  "databases": {
    "title": "Databases",
    "items": ["MySQL", "PostgreSQL", "MongoDB"]
  },
  "testing": {
    "title": "Testing",
    "items": ["Jest", "PHPUnit", "Postman"]
  },
}

const languageSkills = computed(() => {
  const items = Object.values(skills.categories.languages.items) || [];
  return items.map((name, index) => ({
    name: name,
    index: index,
    // Demo skill levels with decreasing values for visual variety
    level: 90 - (index * 5)
  }));
});


const frameworkSkills = computed(() => {
  const items = Object.values(skills.categories.frameworks.items) || [];
  return items.map((name, index) => ({
    name,
    // Different pattern of skill levels
    level: 85 - (index * 4)
  }));
});

const toolSkills = computed(() => {
  const items = Object.values(skills.categories.tools.items) || [];
  return items.map((name, index) => ({
    name,
    // Another pattern
    level: 88 - (index * 7)
  }));
});

const databasesSkills = computed(() => {
  const items = Object.values(otherSkills.databases.items) || [];
  return items.map((name, index) => ({
    name,
    level: 85 - (index * 4)
  }));
});

const testingSkills = computed(() => {
  const items = Object.values(otherSkills.testing.items) || [];
  return items.map((name, index) => ({
    name,
    level: 68 + (index * 4)
  }));
});
</script>