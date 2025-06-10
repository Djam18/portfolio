<!--
  HeroSection.vue: Main landing section component
  Purpose: Displays an eye-catching introduction with animated elements
  Uses GSAP for fadeIn, slideIn animations and CTA pulse effect
-->
<template>
  <section class="py-20 bg-gradient-to-br from-neutral to-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Content Column -->
        <div ref="contentRef" class="opacity-0">
          <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            {{ $t('hero.title') }}
          </h1>
          <p class="text-lg md:text-xl text-dark/80 mb-8 max-w-2xl">
            {{ $t('hero.content') }}
          </p>
          <a
            ref="ctaRef"
            href="#about"
            class="inline-block bg-secondary text-white font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all">
            {{ $t('hero.cta') }}
          </a>
        </div>

        <!-- Image Column -->
        <div ref="imageRef" class="opacity-0 flex justify-center lg:justify-end">
          <div class="relative w-full max-w-md">
            <div class="absolute -z-10 w-72 h-72 rounded-full bg-accent1/20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div class="absolute -z-10 w-56 h-56 rounded-full bg-accent2/10 bottom-0 right-0"></div>
            <img
              src="~/assets/images/profile.svg"
              alt="Developer illustration"
              class="w-full h-auto relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

// References for animations
const contentRef = ref(null);
const imageRef = ref(null);
const ctaRef = ref(null);

// Initialize animations when component is mounted
onMounted(() => {
  // Create a timeline for coordinated animations
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Content animation: fade in and slide in from bottom
  tl.fromTo(contentRef.value,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 }
  );

  // Image animation: fade in and slide in from right
  tl.fromTo(imageRef.value,
    { x: 50, opacity: 0 },
    { x: 0, opacity: 1, duration: 1 },
    "-=0.5" // Start slightly before the previous animation completes
  );

  // CTA button pulse animation
  gsap.to(ctaRef.value, {
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    delay: 1.5
  });
});
</script>