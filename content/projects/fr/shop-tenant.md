---
title: "Shop-Tenant — SaaS E-commerce Multi-Tenant"
description: "Plateforme SaaS e-commerce multi-tenant pour commerçants indépendants en Afrique de l'Ouest : isolation par schéma, Stripe et provisioning automatisé."
status: "analysis"
date: "2026-03-10"
stack: ["Laravel", "Vue.js", "Stripe", "PostgreSQL", "Docker", "Tailwind CSS"]
github: "https://github.com/Djam18/shop-tenant"
repoUrl: "https://github.com/Djam18/shop-tenant"
slug: "shop-tenant"
featured: true
vision: "Offrir aux commerçants et marques indépendantes d'Afrique de l'Ouest une plateforme e-commerce multi-tenant robuste, rapide et adaptée aux réalités économiques locales."
motivation: "Les solutions internationales existantes sont onéreuses, mal adaptées aux moyens de paiement régionaux et complexes à configurer pour des créateurs indépendants."
approach: "Architecture multi-tenant avec Laravel et PostgreSQL (isolation par schéma ou colonnes scopées). Interface marchande réactive sous Vue.js, intégration des flux de paiement Stripe et conteneurisation Docker pour un déploiement prédictible."
expectedOutcome: "Étanchéité totale des données entre boutiques, création automatisée de sous-domaines marchands et gestion centralisée des stocks et commandes."
---

## Vision du Projet

Shop-Tenant est actuellement en phase d'analyse architecturale. Le projet s'adresse aux entrepreneurs et marques d'Afrique de l'Ouest désireux de disposer d'une vitrine e-commerce professionnelle sans dépendre de marketplaces tierces.

## Piliers Techniques

- **Isolation Multi-Tenant** : Cloisonnement strict des données entre chaque boutique cliente au niveau de la base de données.
- **Back-office commerçant unifié** : Console de gestion sous Vue.js pour piloter catalogue produits, commandes et expéditions.
- **Passerelles de paiement** : Architecture Stripe avec gestion des devises multiples (XOF, EUR, USD).
- **Environnement conteneurisé** : Déploiement standardisé via Docker et PostgreSQL pour faciliter la montée en charge.
