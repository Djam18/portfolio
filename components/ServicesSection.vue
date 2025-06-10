<!--
  ServicesSection.vue: Services showcase component
  Purpose: Displays professional services in a clean card grid
  Props: None
  Simple grid layout with hover animations
-->
<template>
  <section id="services" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="font-heading text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
        {{ t('services.title') }}
      </h2>
      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div v-for="service in services" :key="service.key"
          class="p-6 bg-neutral rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">

          <!-- Service Icon -->
          <div class="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <div class="text-primary" v-html="getServiceIcon(service.key)"></div>
          </div>

          <!-- Service Title -->
          <h3 class="text-xl font-bold text-primary mb-3">
            {{ t(`services.items.${service.key}.title`) }}
          </h3>

          <!-- Service Description -->
          <p class="text-dark/80 mb-6 flex-grow">
            {{ t(`services.items.${service.key}.description`) }}
          </p>

          <!-- Action Button -->
          <button class="mt-auto text-secondary hover:text-primary transition-colors text-sm font-medium flex items-center group">
            {{ t('navigation.cta') }}
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Extract services data from i18n
const services = computed(() => {
  const servicesData = t('services.items', {}, { returnObjects: true });

  if (servicesData && typeof servicesData === 'object') {
    return Object.entries(servicesData).map(([key, data]) => ({
      key,
      ...data
    }));
  }

  // Fallback if i18n data is not available
  const fallbackServices = {
    webDev: {
      title: "Web App Development",
      description: "Building modern and scalable web applications with cutting-edge technologies"
    },
    backend: {
      title: "Backend Architecture",
      description: "Designing robust and efficient server-side solutions for optimal performance"
    },
    uiux: {
      title: "UI/UX Integration",
      description: "Creating seamless and intuitive user interfaces that enhance user experience"
    },
    api: {
      title: "API Development",
      description: "Building secure and scalable APIs for seamless data integration"
    },
    contentWriting: {
      title: "Content Writing",
      description: "Creating clear and comprehensive documentation"
    }
  };

  return Object.entries(fallbackServices).map(([key, data]) => ({
    key,
    ...data
  }));
});

// Function to get appropriate icon for each service
const getServiceIcon = (serviceKey) => {
  const icons = {
    webDev: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>`,
    backend: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>`,
    uiux: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>`,
    cms: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>`,
    api: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>`,
    consultation: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>`,
    writing: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>`
  };

  return icons[serviceKey] || `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>`;
};
</script>

<style scoped>
/* Ensure smooth transitions */
.group svg {
  transition: transform 0.2s ease;
}

/* Card hover effects */
.transform:hover {
  transform: translateY(-8px);
}

/* Button hover animation */
.group:hover svg {
  transform: translateX(4px);
}
</style>