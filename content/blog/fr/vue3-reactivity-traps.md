---
title: "Pièges Courants de Réactivité sous Vue 3 : Éviter les Erreurs avec ref, reactive et le Destructuring"
description: "Guide pratique de dépannage : comment ne plus perdre la réactivité lors de la déstructuration d'un objet, du remplacement d'un état ou de l'usage des watchers profonds."
date: "2026-09-16"
tags: ["vue", "nuxt", "javascript", "typescript", "frontend"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "vue3-reactivity-traps"
---

L'API Composition de Vue 3 est limpide et prévisible, sauf lorsque l'on perd accidentellement la liaison réactive en déstructurant des props ou en réassignant un objet `reactive()`.

Les 3 règles fondamentales pour ne plus jamais bloquer :
1. **Ne déstructurez jamais directement un objet réactif** : Utilisez `toRefs(state)` pour conserver les proxies.
2. **Ne réassignez pas un objet `reactive()` en entier** : Préférez `ref()` ou `Object.assign()`.
3. **Pensez à `{ deep: true }` sur vos watchers** d'objets imbriqués ou écoutez un getter explicite.
