---
title: "Concevoir des APIs Idempotentes : Comment Éviter les Doubles Paiements et Commandes"
description: "Mise en œuvre des en-têtes Idempotency-Key avec Redis pour garantir que les retentatives réseau ou doubles clics ne génèrent jamais de transactions en double."
date: "2026-08-25"
tags: ["api", "architecture", "redis", "backend", "security"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "designing-idempotent-apis"
---

Un utilisateur clique sur « Payer 49 € ». La connexion mobile vacille. L'interface freeze deux secondes, alors l'utilisateur clique une seconde fois.

Sans idempotence, sa carte est débitée deux fois, deux commandes identiques sont enregistrées, et le support client doit traiter un remboursement d'urgence.

Dans les systèmes distribués, **un timeout réseau est ambigu**. La requête a-t-elle échoué avant d'atteindre le serveur, ou le serveur a-t-il validé le paiement mais perdu la connexion au retour ?

---

## 1. Le Principe d'Idempotence

Une opération est dite **idempotente** si l'exécuter dix fois d'affilée produit exactement le même résultat que de l'exécuter une seule fois.

Pour sécuriser un `POST /api/checkout`, le client génère un identifiant unique (UUID v4) transmis dans l'en-tête :

```http
POST /api/checkout HTTP/1.1
Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
```

---

## 2. Le Cycle avec Redis

1. Vérifier si la clé existe dans Redis avec un verrou atomique (`SET ... NX EX 120`).
2. Si la requête est déjà terminée (`COMPLETED`), renvoyer immédiatement la réponse en cache sans relancer le débit bancaire.
3. Si la requête est en cours (`PROCESSING`), renvoyer `409 Conflict`.
4. Si la clé n'existe pas, exécuter la transaction en base de données, stocker la réponse finale dans Redis pour 24 heures, puis répondre au client.
