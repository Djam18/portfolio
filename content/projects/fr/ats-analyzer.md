---
title: "Talenta (ATS Analyzer)"
description: "Outil de scoring de CV propulsé par l'IA pour candidats : score 0–100, détection de mots-clés manquants, analyse par section et suggestions de réécriture."
status: "in-progress"
date: "2026-02-10"
stack: ["Nuxt 4", "Vue 3", "TypeScript", "Nuxt UI v4", "Supabase", "HuggingFace", "Stripe", "Resend"]
image: "/images/portfolio/ats-analyzer.png"
github: "https://github.com/Djam18/ats-analyzer"
repoUrl: "https://github.com/Djam18/ats-analyzer"
slug: "ats-analyzer"
featured: true
vision: "Permettre aux candidats de franchir avec succès les filtres automatisés des ATS grâce à un scoring IA transparent et des optimisations de mots-clés concrètes."
motivation: "Plus de 75 % des CV sont éliminés par des filtres automatiques avant même d'être lus par un recruteur humain, principalement pour des formats inadaptés ou des mots-clés absents."
approach: "Développement d'une application full-stack Nuxt 4 avec Nuxt UI v4 (Radix Vue + Tailwind), Supabase pour l'authentification, PostgreSQL avec politiques RLS et Storage. Inférence IA via l'API HuggingFace (Mistral-7B) avec validation Zod. Intégration de Stripe pour la gestion des quotas (Gratuit, Pro, Expert) et Resend pour les emails transactionnels."
expectedOutcome: "Rapport instantané 0–100, hiérarchisation des compétences manquantes, score détaillé par section (expériences, formation, compétences) et suggestions de reformulation avant/après."
---

## La Vision

Talenta répond à une frustration majeure des chercheurs d'emploi : **l'opacité des Applicant Tracking Systems (ATS)**. Les candidats postulent en masse sans comprendre pourquoi leurs candidatures restent sans réponse. Talenta déchiffre les algorithmes de recrutement.

## Fonctionnalités Clés

- **Score de compatibilité ATS** : Note instantanée de 0 à 100 entre votre CV et l'offre d'emploi visée.
- **Analyse des mots-clés** : Détection des compétences et mots-clés manquants classés par ordre d'importance.
- **Décomposition par section** : Évaluation granulaire des expériences, compétences, formations et lisibilité du format.
- **Suggestions de réécriture** : Propositions concrètes de reformulation de phrases pour maximiser l'impact.
- **Gestion des quotas et abonnements** : Formule gratuite (3 analyses), Pro (50/mois) et Expert (illimité) pilotée par Stripe.

## Architecture Technique

- **Frontend** : Nuxt 4, Vue 3, TypeScript, Nuxt UI v4 (Tailwind CSS + primitives Radix Vue).
- **Backend & Routes API** : Moteur Nitro avec rate limiting en mémoire et validation de schémas Zod.
- **Base de données & Auth** : Supabase PostgreSQL avec règles RLS rigoureuses et migrations SQL versionnées.
- **Inférence IA** : API HuggingFace avec le modèle Mistral-7B et prompt engineering sur mesure.
- **Facturation & Emails** : Webhooks Stripe Checkout et Resend API.
