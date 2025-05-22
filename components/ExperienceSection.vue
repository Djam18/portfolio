<!--
  ExperienceSection.vue: Professional experience section
  Purpose: Displays work history in a visually appealing timeline format
  Props: None
  Hooks: onMounted - Initializes GSAP animations
  Uses GSAP/ScrollTrigger for staggered animations on scroll
-->
<template>
  <section id="experience" class="py-20 bg-neutral">
    <div class="container mx-auto px-4">
      <h2 class="font-heading text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
        {{ $t('experience.title') }}
      </h2>

      <div class="relative max-w-4xl mx-auto">
        <!-- Vertical timeline line -->
        <div class="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-primary/30 transform md:-translate-x-1/2"></div>

        <!-- Timeline items -->
        <div ref="timelineRef" class="space-y-12">
          <div v-for="(exp, i) in experiences" :key="exp.key"
            class="relative opacity-0 flex flex-col md:flex-row items-start md:items-center"
            :class="{ 'md:flex-row-reverse': i % 2 !== 0 }">

            <!-- Timeline dot -->
            <div
              class="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-secondary transform translate-x-[-7px] md:translate-x-[-8px]">
            </div>

            <!-- Content box -->
            <div class="ml-6 md:ml-0 md:w-5/12 p-5 bg-white rounded-lg shadow-md">
              <h3 class="font-heading text-xl font-bold text-primary mb-1">
                {{ $t(`${exp.title}`) }}
              </h3>
              <div class="text-accent2 font-medium mb-2">
                {{ $(exp.company) }} | {{ $t(exp.period) }}
              </div>
              <p class="text-dark/80">
                {{ $(exp.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { gsap } from 'gsap';
import { useI18n } from 'vue-i18n';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();
const timelineRef = ref(null);
const experience = {
  "title": "Experience",
  "positions": {
    "webDeveloperIntern": {
      "title": "Web Developer Intern",
      "company": "OSI Group",
      "period": "2022",
      "description": "Built full-stack web apps with clean architectures."
    },
    "webContentEditor": {
      "title": "Web Content Editor",
      "company": "RedacLink",
      "period": "2021",
      "description": "Wrote SEO-optimized articles and product descriptions."
    },
    "academicIntern": {
      "title": "Academic Intern",
      "company": "Rintio",
      "period": "2019",
      "description": "Developed an Angular interface for data collection."
    }
  }
};

// Get experience data from i18n as an array
const experiences = computed(() => {
  // Object.entries returns [[key, value], ...]
  return Object.entries(experience.positions).map(([key, data]) => ({
    key,
    title: data.title,
    company: data.company,
    period: data.period,
    description: data.description
  }));
});

onMounted(() => {
  // Select all timeline items
  const timelineItems = timelineRef.value.querySelectorAll('.opacity-0');

  // Create staggered animation for timeline items
  gsap.fromTo(timelineItems,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.3, // Stagger the animations for each item
      scrollTrigger: {
        trigger: timelineRef.value,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    }
  );
});
</script>