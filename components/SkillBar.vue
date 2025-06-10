<!--
  SkillBar.vue: Animated skill progress bar component
  Purpose: Displays an individual skill with animated progress bar and tooltip
  Props:
    - name: String - Name of the skill
    - level: Number - Skill level as percentage (0-100)
  Hooks: onMounted - Initializes GSAP animations for progress bar
  Uses GSAP for progress bar animations triggered on scroll
-->
<template>
  <div class="skill-bar">
    <!-- Skill Name and Percentage -->
    <div class="flex justify-between items-center mb-2">
      <label class="font-medium text-dark">{{ name }}</label>
      <span class="text-sm text-secondary font-medium">{{ level }}%</span>
    </div>

    <!-- Progress Bar Container -->
    <div class="h-3 bg-white rounded-full overflow-hidden">
      <!-- Actual Progress Bar that will be animated -->
      <div
        ref="progressBarRef"
        class="h-full bg-gradient-to-r from-accent2 to-secondary rounded-full"
        :style="{ width: '0%' }"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
      >
      </div>
    </div>

    <!-- Tooltip (optional) -->
    <div
      v-if="showTooltip"
      class="tooltip bg-dark text-white px-2 py-1 text-xs rounded absolute -mt-8 ml-4 transform -translate-x-1/2">
      {{ level }}%
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Props
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  }
});

// Refs
const progressBarRef = ref(null);
const showTooltip = ref(false);

// Animate the progress bar when component is mounted and visible
onMounted(() => {
  gsap.to(progressBarRef.value, {
    width: `${props.level}%`,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: progressBarRef.value,
      start: 'top 85%', // Start animation when the top of the element hits 85% from the top of viewport
      toggleActions: 'play none none none'
    }
  });
});
</script>

<style scoped>
.skill-bar {
  position: relative;
}

.tooltip {
  position: absolute;
  z-index: 10;
  white-space: nowrap;
}
</style>