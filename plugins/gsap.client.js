// plugins/gsap.client.js - Client-side GSAP initialization
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  if (process.client) {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Return GSAP and its plugins for use throughout the app
    return {
      provide: {
        gsap,
        ScrollTrigger
      }
    }
  }
})