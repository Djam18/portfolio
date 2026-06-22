---
title: "Adam Portfolio v2"
description: "Mon portfolio personnel construit avec Nuxt 3, Tailwind CSS et Nuxt Content. Objectif : un site rapide, multilingue et SEO-friendly"
status: "live"
date: "2025-03-15"
stack: ["Nuxt 4", "Vue 3", "Tailwind CSS", "TypeScript", "Nuxt Content"]
image: "/images/portfolio/portfolio-v2.jpg"
link: "https://portfolio-phi-virid-73.vercel.app/"
github: "https://github.com/ton-user/portfolio"
slug: "portfolio"
featured: true
---

## Le contexte

Je voulais un portfolio qui me représente vraiment : rapide, accessible, et facile à mettre à jour sans toucher au code à chaque nouveau projet.

## Les défis

- **Multilingue** : gérer 4 langues (EN, FR, ES, JA) sans duplication de code
- **SEO** : être référencé quand on cherche "Adam Abdel-Djamal web developer"
- **Performance** : Lighthouse 95+ sur mobile

## La solution

Nuxt 3 avec Nuxt Content v3 pour la gestion des projets en Markdown. Chaque nouveau projet = un fichier `.md` + `git push`.

## Résultat

- Lighthouse : 98 Performance, 100 Accessibilité, 100 SEO
- Temps de build : < 30s sur Vercel
- Ajout d'un projet : 2 minutes