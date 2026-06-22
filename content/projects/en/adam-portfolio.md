---
title: "Adam Portfolio v2"
description: "My personal portfolio built with Nuxt 3, Tailwind CSS and Nuxt Content. Goal: a fast, multilingual and SEO-friendly website."
status: "live"
date: "2025-03-15"
stack: ["Nuxt 4", "Vue 3", "Tailwind CSS", "TypeScript", "Nuxt Content"]
image: "/images/portfolio/portfolio-v2.jpg"
link: "https://portfolio-phi-virid-73.vercel.app/"
github: "https://github.com/ton-user/portfolio"
slug: "portfolio"
featured: true
---

## Context

I wanted a portfolio that truly represents me: fast, accessible, and easy to update without touching the code for every new project.

## Challenges

- **Multilingual** : manage 4 languages (EN, FR, ES, JA) without code duplication
- **SEO** : rank when searching for "Adam Abdel-Djamal web developer"
- **Performance** : Lighthouse 95+ on mobile

## Solution

Nuxt 3 with Nuxt Content v3 for Markdown project management. Each new project = one `.md` file + `git push`.

## Result

- Lighthouse : 98 Performance, 100 Accessibility, 100 SEO
- Build time : < 30s on Vercel
- Adding a project : 2 minutes