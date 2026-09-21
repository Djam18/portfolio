---
title: "PostgreSQL Full-Text Search on a Budget: Why You Probably Don't Need Elasticsearch"
description: "Demonstrating how native PostgreSQL (tsvector, tsquery, GIN indexes) can handle rich typo-tolerant search for products or articles without the massive RAM and hosting costs of Elasticsearch."
date: "2026-08-30"
tags: ["postgresql", "search", "database", "backend", "performance"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "postgres-full-text-search"
---

When founders and tech leads say *"We need search for our SaaS catalog"*, the default answer is often: *"Let's spin up an Elasticsearch cluster or pay for Algolia."*

Two months later, they are paying an extra $150/month for cloud RAM, debugging data desynchronization between PostgreSQL and Elasticsearch, and writing complex background re-indexing workers.

Unless you are searching across 50 million documents, **PostgreSQL already has an enterprise-grade full-text search engine built directly into your database**. Here is how to configure it in 10 minutes.

---

## 1. Why Not Just `WHERE title ILIKE '%keyword%'`?

The naive approach is `ILIKE`:

```sql
-- ❌ Forces a full table scan and does not understand language morphology
SELECT * FROM articles WHERE title ILIKE '%running%';
```

Why `ILIKE` fails at scale:
1. **Zero Indexing Support**: A leading wildcard (`%word`) cannot use standard B-Tree indexes.
2. **No Stemming**: Searching for `"run"` will never match `"running"` or `"ran"`.
3. **No Relevance Ranking**: A title with 5 keyword matches appears in the exact same priority as an offhand mention.

---

## 2. The Native Solution: `tsvector` + `tsquery`

PostgreSQL converts human text into linguistic tokens called **`tsvector`** (lexemes) and matches them against search expressions with **`tsquery`**.

```sql
-- Notice how Postgres automatically stems words:
SELECT to_tsvector('english', 'The engineers are deploying Docker containers rapidly');
-- Result: 'rapid':6 'contain':5 'deploy':4 'engin':2 'docker':4
```

### Adding Full-Text Search to Your Table

Create a generated column that automatically updates whenever the title or body changes:

```sql
ALTER TABLE articles
ADD COLUMN search_vector tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(content, '')), 'C')
) STORED;
```

> **Pro Tip**: `setweight(..., 'A')` gives the title the highest relevance score, followed by the description (`'B'`) and the content (`'C'`).

---

## 3. High-Speed GIN Indexing

Without an index, full-text search still has to parse every row. A **Generalized Inverted Index (GIN)** maps every single lexeme directly to the rows that contain it:

```sql
CREATE INDEX idx_articles_search_vector ON articles USING GIN (search_vector);
```

---

## 4. Querying with Relevance Ranking

Now you can search and sort by relevance score in under **2 milliseconds**:

```sql
SELECT
  id,
  title,
  ts_rank(search_vector, websearch_to_tsquery('english', 'docker deployment')) AS score
FROM articles
WHERE search_vector @@ websearch_to_tsquery('english', 'docker deployment')
ORDER BY score DESC
LIMIT 10;
```

`websearch_to_tsquery` supports Google-style query syntax out of the box:
- `docker deployment` (AND logic)
- `"zero downtime"` (exact phrase matching)
- `docker OR kubernetes` (OR logic)
- `-legacy` (exclusion)

---

## When SHOULD You Migrate to Elasticsearch?

Postgres full-text search handles 500,000+ products and articles effortlessly with sub-5ms latency on a single \$20 server.

Only consider external search clusters if:
1. You exceed 10 million documents.
2. You need complex multi-language phonetic fuzzy matching across languages with distinct scripts.
3. You need real-time analytics aggregation over billions of log entries.
