---
title: "Adam Portfolio v2"
description: "Mi portafolio personal construido con Nuxt 3, Tailwind CSS y Nuxt Content. Objetivo: un sitio rápido, multilingüe y optimizado para SEO."
status: "live"
date: "2025-03-15"
stack: ["Nuxt 4", "Vue 3", "Tailwind CSS", "TypeScript", "Nuxt Content"]
image: "/images/portfolio/portfolio-v2.jpg"
link: "https://portfolio-phi-virid-73.vercel.app/"
github: "https://github.com/ton-user/portfolio"
slug: "portfolio"
featured: true
---

## Contexto

Quería un portafolio que realmente me representara: rápido, accesible y fácil de actualizar sin tener que tocar el código para cada nuevo proyecto.

## Desafíos

- **Multilingüe** : gestionar 4 idiomas (EN, FR, ES, JA) sin duplicar código
- **SEO** : aparecer en búsquedas de "Adam Abdel-Djamal web developer"
- **Rendimiento** : Lighthouse 95+ en móvil

## Solución

Nuxt 3 con Nuxt Content v3 para la gestión de proyectos en Markdown. Cada nuevo proyecto = un archivo `.md` + `git push`.

## Resultado

- Lighthouse : 98 Rendimiento, 100 Accesibilidad, 100 SEO
- Tiempo de build : < 30s en Vercel
- Añadir un proyecto : 2 minutos