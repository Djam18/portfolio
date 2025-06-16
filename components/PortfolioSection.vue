<!--
  PortfolioSection.vue: Portfolio showcase component
  Purpose: Displays portfolio projects in a responsive carousel
  Props: None
  Uses Flowbite carousel/slider for project showcase
  Effects: Hover lift and overlay animation on projects
-->
<template>
  <section id="portfolio" class="py-20 bg-neutral">
    <div class="container mx-auto px-4">
      <h2 class="font-heading text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
        {{ t('portfolio.title') }}
      </h2>

      <p class="text-center text-dark/70 max-w-3xl mx-auto mb-12">
        {{ t('portfolio.subtitle') }}
      </p>

      <!-- Flowbite Carousel Component -->
      <div class="max-w-6xl mx-auto relative">
        <div id="portfolio-carousel" class="relative" data-carousel="slide" data-carousel-interval="60000">
          <!-- Carousel wrapper -->
          <div class="overflow-hidden relative rounded-lg h-96">
            <!-- Carousel items -->
            <div v-for="(project, index) in projects" :key="project.key"
              :data-carousel-item="index === 0 ? 'active' : ''"
              :class="index === 0 ? 'block' : 'hidden'"
              class="duration-700 ease-in-out">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="relative w-full h-full portfolio-item overflow-hidden group">
                  <!-- Project background image -->
                  <div
                    class="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                    :style="{ backgroundImage: `url(${getProjectImage(project.key)})` }"></div>

                  <!-- Overlay gradient background -->
                  <div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-90"></div>

                  <!-- Hover overlay -->
                  <div
                    class="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                    <div
                      class="text-white text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p class="text-lg font-medium">{{ t(`portfolio.projects.${project.key}.description`) }}</p>
                      <a :href="project.link" target="_blank"
                        class="mt-4 inline-block px-6 py-2 border border-white rounded-md hover:bg-white hover:text-primary transition-colors">
                        {{ t('portfolio.viewProject') }}
                      </a>
                    </div>
                  </div>

                  <!-- Project info -->
                  <div class="absolute bottom-0 left-0 p-6 text-white z-10">
                    <h3 class="text-xl md:text-2xl font-bold mb-2">{{ t(`portfolio.projects.${project.key}.title`) }}</h3>
                    <p class="text-sm text-white/80">{{ t(`portfolio.projects.${project.key}.period`) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Carousel controls -->
          <button type="button"
            class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev>
            <span
              class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
              <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 1 1 5l4 4" />
              </svg>
              <span class="sr-only">Previous</span>
            </span>
          </button>
          <button type="button"
            class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next>
            <span
              class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
              <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 9 4-4-4-4" />
              </svg>
              <span class="sr-only">Next</span>
            </span>
          </button>
        </div>

        <!-- Carousel indicators -->
        <div class="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          <button v-for="(_, index) in projects" :key="index" type="button"
            class="w-3 h-3 rounded-full hover:bg-white"
            :class="index === 0 ? 'bg-white' : 'bg-white/50'"
            :aria-current="index === 0 ? 'true' : 'false'"
            :aria-label="`Slide ${index + 1}`"
            :data-carousel-slide-to="index">
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Extract portfolio projects from i18n
const projects = computed(() => {
  // Essayer de récupérer depuis i18n d'abord
  const portfolioData = t('portfolio.projects', {}, { returnObjects: true });

  if (portfolioData && typeof portfolioData === 'object') {
    return Object.entries(portfolioData).map(([key, data]) => ({
      key,
      ...data
    }));
  }

  // Fallback avec données locales
  const fallbackProjects = {
    "newsPortal": {
      "title": "News Portal",
      "period": "2022–2023",
      "description": "A fully responsive news site with a modern CMS.",
      "link": "https://github.com/Djam18/news_portal"
    }
  };

  return Object.entries(fallbackProjects).map(([key, data]) => ({
    key,
    ...data
  }));
});

// Map project keys to image paths - Utilisation des imports Nuxt
const getProjectImage = (key) => {
  try {
    // Pour Nuxt 3, utiliser les images depuis le dossier public
    // Vous pouvez utiliser .png, .jpg, .svg, .webp, etc.
    const imageMap = {
      newsPortal: '/assets/images/portfolio/news-portal.png',
    };

    return imageMap[key] || getDefaultImage(key);
  } catch (error) {
    console.warn(`Image not found for ${key}, using default`);
    return getDefaultImage(key);
  }
};

// Generate a default image if none is mapped
const getDefaultImage = (key) => {
  const colors = ['#4A6670', '#D67D5B', '#E4B363', '#2F7D95'];
  const index = key === 'newsPortal' ? 0 : 1;
  const color = colors[index % colors.length];
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' fill='none'%3E%3Crect width='800' height='500' fill='${color.replace('#', '%23')}'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.3em'%3E${key.charAt(0).toUpperCase() + key.slice(1)}%3C/text%3E%3C/svg%3E`;
};

// Initialize carousel after component is mounted
onMounted(async () => {
  await nextTick();

  // Attendre que le DOM soit complètement rendu
  setTimeout(() => {
    // Vérifier si Flowbite est disponible
    if (typeof window !== 'undefined') {
      // Pour Flowbite, on peut utiliser la méthode globale ou l'import
      try {
        // Méthode 1: Si Flowbite est global
        if (window.Flowbite) {
          window.Flowbite.initCarousels();
        }
        // Méthode 2: Si vous avez importé Flowbite
        else if (window.FlowbiteInstances) {
          const carousel = window.FlowbiteInstances.getInstance('Carousel', 'portfolio-carousel');
          if (!carousel) {
            window.FlowbiteInstances.createCarousel();
          }
        }
        // Méthode 3: Initialisation manuelle
        else {
          initManualCarousel();
        }
      } catch (error) {
        console.warn('Flowbite carousel initialization failed, using manual fallback');
        initManualCarousel();
      }
    }
  }, 200);
});

// Fonction de fallback pour initialiser le carousel manuellement
const initManualCarousel = () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll('[data-carousel-item]');
  const indicators = document.querySelectorAll('[data-carousel-slide-to]');
  const prevButton = document.querySelector('[data-carousel-prev]');
  const nextButton = document.querySelector('[data-carousel-next]');

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('hidden');
        slide.classList.add('block');
      } else {
        slide.classList.remove('block');
        slide.classList.add('hidden');
      }
    });

    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.remove('bg-white/50');
        indicator.classList.add('bg-white');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.classList.remove('bg-white');
        indicator.classList.add('bg-white/50');
        indicator.setAttribute('aria-current', 'false');
      }
    });
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  };

  // Event listeners
  if (nextButton) nextButton.addEventListener('click', nextSlide);
  if (prevButton) prevButton.addEventListener('click', prevSlide);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-play
  setInterval(nextSlide, 6000);

  // Initialiser le premier slide
  showSlide(0);
};
</script>

<style scoped>
.portfolio-item {
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;
}

.portfolio-item:hover {
  transform: translateY(-10px);
}

/* Améliorer la visibilité des éléments du carousel */
[data-carousel-item] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

[data-carousel-item].block {
  display: block !important;
}

[data-carousel-item].hidden {
  display: none !important;
}
</style>