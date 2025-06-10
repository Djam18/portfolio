<!--
  ContactSection.vue: Contact form and information component
  Purpose: Allows visitors to send messages and provides contact details
  Props: None
  Features: Responsive layout, form validation, and animated elements
-->
<template>
  <section class="py-16 md:py-24 bg-white dark:bg-dark" id="contact">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Me contacter</h2>
        <p class="mb-8 text-lg text-dark/70 dark:text-light/70">
          Pour toute prise de contact, retrouvez-moi directement sur mes réseaux professionnels&nbsp;:
        </p>
        <div class="flex justify-center gap-6">
          <a href="https://github.com/adam-abdel" target="_blank" rel="noopener" class="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium text-lg">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
            {{ $t('hero.title') }}
          </a>
          <a href="https://www.linkedin.com/in/adam-abdel/" target="_blank" rel="noopener" class="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors font-medium text-lg">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
            {{ $t('hero.title') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Pas de script nécessaire
</script>

<style scoped>
/* Ajoute un peu d'espace autour des boutons */
.flex > a {
  margin: 0 0.5rem;
}
</style>