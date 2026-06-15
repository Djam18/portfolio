// plugins/lenis.client.js
// Lenis — smooth scroll + synchronisation avec GSAP ScrollTrigger
// .client.js → exécuté uniquement côté navigateur (jamais pendant le SSR/prerender)

import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({
    duration: 1.2,        // durée de l'interpolation en secondes
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
    smoothWheel: true,    // smooth sur la molette souris
    touchMultiplier: 1.5, // sensibilité tactile
  })

  // Synchronise Lenis avec ScrollTrigger à chaque frame
  // Sans ça, ScrollTrigger lit window.scrollY (scroll natif)
  // et non la position interpolée de Lenis → désynchronisation des animations
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000) // gsap.ticker donne le temps en secondes, lenis attend des ms
  })

  // Désactive le propre requestAnimationFrame de Lenis
  // car on le pilote manuellement via gsap.ticker ci-dessus
  gsap.ticker.lagSmoothing(0)

  // Expose lenis globalement pour pouvoir y accéder depuis les composants
  // ex: const { $lenis } = useNuxtApp() → $lenis.scrollTo('#contact')
  return {
    provide: {
      lenis,
    },
  }
})