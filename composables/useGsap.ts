// composables/useGsap.ts
import type { gsap } from 'gsap'
import type { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useGsap = () => {
  const nuxtApp = useNuxtApp()
  return {
    gsap: (nuxtApp.$gsap as typeof gsap) ?? null,
    ScrollTrigger: (nuxtApp.$ScrollTrigger as typeof ScrollTrigger) ?? null,
  }
}
