---
title: "Recherche Plein Texte sous PostgreSQL : Pourquoi vous n'avez sans doute pas besoin d'Elasticsearch"
description: "Découvrez comment PostgreSQL (tsvector, tsquery, index GIN) gère une recherche textuelle performante avec pertinence sans la facture ni la complexité d'Elasticsearch."
date: "2026-08-30"
tags: ["postgresql", "search", "database", "backend", "performance"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "postgres-full-text-search"
---

Lorsque les équipes souhaitent ajouter une recherche dans leur catalogue produit, le réflexe immédiat consiste souvent à déployer un cluster Elasticsearch ou à payer un abonnement Algolia.

Deux mois plus tard, la facture cloud explose, les désynchronisations entre PostgreSQL et l'index de recherche s'accumulent, et la maintenance devient lourde.

Pourtant, **PostgreSQL intègre nativement un moteur de recherche plein texte ultra-performant** capable de traiter des centaines de milliers de lignes en moins de 3 millisecondes.

---

## 1. Pourquoi proscrire `ILIKE '%terme%'` ?

Un filtre `ILIKE` ne peut utiliser aucun index B-Tree en raison du wildcard initial. De plus, il ignore la lemmatisation (rechercher « courir » ne trouvera pas « cours »).

---

## 2. La Solution Native : `tsvector` et Index GIN

PostgreSQL transforme le texte en lexèmes linguistiques et calcule un score de pertinence :

```sql
ALTER TABLE articles
ADD COLUMN search_vector tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('french', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('french', coalesce(description, '')), 'B')
) STORED;

CREATE INDEX idx_articles_search_vector ON articles USING GIN (search_vector);
```

Une requête exécutée avec `websearch_to_tsquery` prend alors **moins de 2 millisecondes** directement au sein de votre base de données relationnelle.
