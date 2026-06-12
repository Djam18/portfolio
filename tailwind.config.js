/** @type {import('tailwindcss').Config} */
export default {
  // Chemins scrutés pour purger les classes inutilisées en production
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./content/**/*.md",         // contenu markdown de Nuxt Content
    "./composables/**/*.{js,ts}"
  ],

  // Active le mode sombre via la classe "dark" sur <html>
  darkMode: ['selector', '[data-theme="dark"]'],

  theme: {
    extend: {
      // 🎨 Palette de couleurs issue de la charte
        colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        accent: 'var(--color-accent)',
        // etc.
        },

      // ✍️ Nouvelles familles de police
      fontFamily: {
        display: ['Syne', 'sans-serif'],       // gros titres (nom, hero)
        body: ['Outfit', 'sans-serif'],        // texte courant
        mono: ['JetBrains Mono', 'monospace'], // code, labels techniques
      },

      // 📐 Rayons de bordure (issus de la section "Tokens d'espacement")
      borderRadius: {
        // On garde les valeurs par défaut de Tailwind, on ajoute juste des alias si besoin.
        // La charte montre 8px / 12px pour les cartes.
        'card': '8px',
        'button': '12px',
      },

      // ↔️ Largeur de bordure fine
      borderWidth: {
        '0.5': '0.5px',   // pour les bordures très subtiles
      },

      // 🧩 Espacements spécifiques (optionnel – les valeurs Tailwind suffisent souvent)
      spacing: {
        'section': '24px',  // padding intérieur des sections
        'sidebar': '200px', // largeur sidebar
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}