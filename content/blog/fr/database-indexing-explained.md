---
title: "Comprendre l'Indexation en Base de Données : Pourquoi votre API rame avec seulement 50 000 lignes"
description: "Guide visuel des goulots d'étranglement en SQL. Table scan vs. Index scan, fonctionnement des index composites et lecture concrète d'un EXPLAIN ANALYZE."
date: "2026-08-10"
tags: ["postgresql", "database", "performance", "backend", "sql"]
author: "Adam Abdel-Djamal"
readingTime: 7
featured: false
slug: "database-indexing-explained"
---

En local avec 20 lignes dans SQLite ou PostgreSQL, toutes vos requêtes répondent en moins d'une milliseconde. Mais déployez ce même code en production avec 50 000 commandes clients, et vos endpoints d'analyse grimpent subitement à 1 200 ms de temps de réponse.

La cause ? Un index manquant ou mal ordonné. Dans ce guide, nous analysons le fonctionnement des index B-Tree, la lecture d'un `EXPLAIN ANALYZE` et les règles d'or des index composites.

---

## 1. Scan Séquentiel vs. Index Scan

- **Seq Scan (Scan séquentiel)** : Le moteur parcourt chaque bloc disque un par un du début à la fin. Complexité en \(O(N)\).
- **Index Scan** : Le moteur consulte l'arbre binaire trié (B-Tree) et accède directement à la page mémoire cible. Complexité en \(O(\log N)\).

---

## 2. Déchiffrer un `EXPLAIN (ANALYZE, BUFFERS)`

Avant de créer des index au hasard, profilez l'exécution avec :

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, customer_name, total_amount, created_at
FROM orders
WHERE status = 'completed'
  AND created_at >= '2026-01-01';
```

Signaux d'alerte :
1. `Seq Scan on orders` : Tout le disque a été chargé.
2. `Rows Removed by Filter` : 95% des données lues ont été jetées après lecture.
3. `Buffers: read=1000` : Accès disque lent au lieu de la mémoire RAM.

---

## 3. L'Index Idéal et la Règle du Préfixe Gauche

```sql
CREATE INDEX idx_orders_status_created_at ON orders (status, created_at);
```

> **Règle d'or** : Dans un index composite `(A, B)`, placez toujours les colonnes filtrées par égalité stricte (`=`) en premier, et les filtres de plage (`>`, `<`, `BETWEEN`) en dernier.
