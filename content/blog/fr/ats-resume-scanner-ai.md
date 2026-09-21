---
title: "Comment j'ai conçu un Scanner de CV ATS avec Nuxt 4, HuggingFace et Mistral-7B"
description: "Plongée technique dans l'architecture de Talenta : extraction de texte PDF, streaming d'évaluations IA structurées et validation Zod en production."
date: "2026-07-15"
tags: ["ai", "nuxt", "vue", "huggingface", "fullstack"]
author: "Adam Abdel-Djamal"
readingTime: 8
featured: true
slug: "ats-resume-scanner-ai"
---

Plus de 75% des candidatures sont écartées par des **Applicant Tracking Systems (ATS)** automatisés avant même qu'un recruteur humain ne les lise. Les candidats passent des heures à postuler pour être rejetés à cause d'un mot-clé manquant ou d'un formatage illisible.

J'ai conçu **Talenta** pour percer la boîte noire du recrutement algorithmique. Dans cet article, je partage les défis d'architecture relevés pour déployer une application IA robuste avec **Nuxt 4**, **HuggingFace** et **Supabase**.

---

## 1. Vue d'ensemble de l'Architecture

Le pipeline se découpe en trois étapes modulaires :

1. **Parsing de documents** : Extraction propre du texte brut depuis des fichiers PDF et DOCX sans perdre la hiérarchie des sections (Expérience, Formation, Compétences).
2. **Matching sémantique IA** : Analyse croisée des compétences du candidat face à la fiche de poste avec Mistral-7B-Instruct.
3. **Moteur de scoring déterministe** : Pondération entre pertinence sémantique et règles strictes (densité de mots-clés, présence des coordonnées, respect des rubriques).

---

## 2. Parsing PDF Rapide et Sécurisé

Parser des fichiers PDF dans un environnement Node.js peut vite saturer la mémoire si l'on instancie des navigateurs headless lourds. J'ai préféré un extracteur de texte léger basé sur les flux dans une route serveur Nuxt (`server/api/parse-cv.post.ts`).

```typescript
// server/api/parse-cv.post.ts
import { readMultipartFormData } from 'h3'
import { extractTextFromPdf } from '~/server/utils/pdf'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  const file = form?.find(item => item.name === 'resume')

  if (!file || file.type !== 'application/pdf') {
    throw createError({ statusCode: 400, message: 'Fichier PDF valide requis' })
  }

  // Limite stricte de 5 Mo pour préserver la RAM
  if (file.data.length > 5 * 1024 * 1024) {
    throw createError({ statusCode: 413, message: 'Le fichier dépasse 5 Mo' })
  }

  const extractedText = await extractTextFromPdf(file.data)
  return { text: extractedText, wordCount: extractedText.split(/\s+/).length }
})
```

---

## 3. Garantir un JSON Strict avec Zod

L'un des pièges récurrents des LLMs en production réside dans l'instabilité du format : accolades manquantes, texte bavard ou clés renommées.

Pour garantir un contrat d'interface sans faille avec le frontend Vue 3, chaque réponse du modèle est validée par un schéma **Zod** :

```typescript
import { z } from 'zod'

export const AtsAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  matchedKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  sectionFeedback: z.object({
    experience: z.string(),
    skills: z.string(),
    education: z.string(),
  }),
  actionableRewrites: z.array(z.object({
    originalSentence: z.string(),
    improvedSentence: z.string(),
    reason: z.string(),
  })),
})

export type AtsAnalysis = z.infer<typeof AtsAnalysisSchema>
```

---

## 4. Interface Réactive et Gestion des Quotas

Côté frontend, **Vue 3** offre un retour instantané grâce à des jauges animées et des badges dynamiques. Les utilisateurs gratuits bénéficient de 3 analyses offertes, sécurisées via **Supabase Auth** et des politiques de sécurité Row-Level Security (RLS) au niveau de PostgreSQL.

---

## Ce qu'il faut retenir

1. **Ne laissez jamais une IA renvoyer du JSON brut au client sans validation** : Placez toujours Zod en rempart.
2. **Combinez IA et règles déterministes** : L'IA excelle pour la sémantique, mais les regex restent imbattables pour vérifier une adresse email ou un numéro de téléphone.
3. **Pensez aux cas d'erreur** : Prévoyez toujours un message clair invitant le candidat à fournir un PDF textuel si le scan image est illisible.
