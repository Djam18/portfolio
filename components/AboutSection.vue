<!--
  AboutSection.vue: About me section component
  Purpose: Displays information about the developer with an image and description
  Uses GSAP scroll-trigger for fade-in animations
-->
<template>
  <section id="about" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="font-heading text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
        {{ $t('about.title') }}
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Image Column -->
        <div ref="imageRef" class="opacity-0 flex justify-center">
          <div class="relative w-full max-w-md">
            <div class="absolute -z-10 w-64 h-64 rounded-full bg-accent2/15 bottom-4 right-4"></div>
            <img
              src="~/assets/images/about.svg"
              alt="Developer portrait"
              class="w-full h-auto relative z-10 rounded-lg shadow-lg"
            />
          </div>
        </div>

        <!-- Content Column -->
        <div ref="contentRef" class="opacity-0">
          <p class="text-lg text-dark/80 mb-8 leading-relaxed">
            {{ $t('about.content') }}
          </p>
          <a
            href="#experience"
            class="inline-block bg-primary text-white font-medium px-8 py-3 rounded-md shadow-md hover:bg-primary/90 hover:shadow-lg transition-all">
            {{ $t('about.cta') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// References for animations
const imageRef = ref(null);
const contentRef = ref(null);

// Initialize animations when component is mounted
onMounted(() => {
  // Image animation with scroll trigger
  gsap.fromTo(imageRef.value,
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: imageRef.value,
        start: 'top 80%', // Trigger when top of element hits 80% down the viewport
        toggleActions: 'play none none none'
      }
    }
  );

  // Content animation with scroll trigger
  gsap.fromTo(contentRef.value,
    { x: 50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: contentRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
});
</script>