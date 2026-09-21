---
title: "Maîtriser les Core Web Vitals en 2026 : Diagnostiquer et Corriger l'Interaction to Next Paint (INP)"
description: "L'INP a officiellement remplacé le FID dans l'algorithme Google. Comment analyser les Long Tasks dans Chrome DevTools et garantir une réactivité immédiate."
date: "2026-09-05"
tags: ["performance", "seo", "javascript", "vue", "frontend"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "mastering-core-web-vitals-inp"
---

Depuis mars 2024, Google a remplacé le First Input Delay (FID) par l'**Interaction to Next Paint (INP)** dans ses signaux web essentiels (Core Web Vitals).

Contrairement au FID qui n'évaluait que le tout premier clic, l'INP mesure la réactivité de **toutes les interactions** pendant la visite de l'utilisateur (clics sur des boutons, onglets, accordéons, saisie dans un formulaire).

Si votre INP dépasse **200 millisecondes**, Google dégrade le classement de vos pages dans les résultats de recherche.

---

## 1. Comment se décompose une interaction ?

$$\text{Temps INP} = \text{Délai d'entrée} + \text{Temps de traitement JS} + \text{Délai de rendu visuel}$$

Pour optimiser l'INP :
1. **Évitez le blocage du thread principal** : Découpez les calculs lourds avec `scheduler.yield()`.
2. **Éliminez le Layout Thrashing** : Ne modifiez pas le DOM immédiatement avant de lire des dimensions géométriques (`offsetHeight`).
3. **Déléguez aux Web Workers** : Pour les tris complexes ou le traitement de gros volumes de données.
