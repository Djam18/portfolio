---
title: "Database Indexing Explained: Why Your API is Slow Even with Just 50,000 Rows"
description: "A visual guide to database bottlenecks. Explains table scans vs. index scans, when composite indexes work (and when they fail), and how to read EXPLAIN ANALYZE."
date: "2026-08-10"
tags: ["postgresql", "database", "performance", "backend", "sql"]
author: "Adam Abdel-Djamal"
readingTime: 7
featured: false
slug: "database-indexing-explained"
---

When developing locally with 20 seed records in SQLite or PostgreSQL, every query returns in under 1ms. But deploy that same code to production with just 50,000 customer records, and suddenly your dashboard endpoints take 1,200ms to respond.

The culprit is almost always a missing or misconfigured index. In this guide, we'll demystify how B-Tree indexes work under the hood, how to read `EXPLAIN ANALYZE`, and the exact rules for multi-column composite indexes.

---

## 1. Table Scan vs. Index Scan: The Phone Book Analogy

Imagine searching for "Sophie Martin" in a phone book:

- **Sequential Scan (Seq Scan)**: Reading every single entry from page 1 to page 500 until you find the name. This is an \(O(N)\) disk operation.
- **Index Scan**: Jumping directly to the "M" section using an alphabetical index, finding "Martin", and jumping straight to the exact page. This is an \(O(\log N)\) operation.

When your table lacks an index on a queried column, PostgreSQL has no choice: it must load every single page from disk into RAM and scan every row.

---

## 2. Reading `EXPLAIN ANALYZE` Like a Senior Engineer

Before adding indexes blindly, you must profile the query plan. Prepend `EXPLAIN (ANALYZE, BUFFERS)` to your query in `psql`:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, customer_name, total_amount, created_at
FROM orders
WHERE status = 'completed'
  AND created_at >= '2026-01-01';
```

Look for two critical lines in the output:

```text
->  Seq Scan on orders  (cost=0.00..1842.00 rows=1240 width=48) (actual time=0.045..42.812 rows=1450 loops=1)
      Filter: ((status = 'completed'::text) AND (created_at >= '2026-01-01'::date))
      Rows Removed by Filter: 48550
      Buffers: shared hit=842 read=1000
Planning Time: 0.120 ms
Execution Time: 43.180 ms
```

### Key Red Flags:
1. **`Seq Scan on orders`**: The database examined all 50,000 rows.
2. **`Rows Removed by Filter: 48550`**: The engine threw away 97% of the data it read from disk.
3. **`Buffers: read=1000`**: The database had to read 1,000 blocks directly from cold storage instead of memory cache.

---

## 3. Creating the Optimal Index

To fix this query, we create a B-Tree index on the filtered columns:

```sql
CREATE INDEX idx_orders_status_created_at ON orders (status, created_at);
```

Run `EXPLAIN ANALYZE` again:

```text
->  Bitmap Index Scan on idx_orders_status_created_at  (cost=0.00..12.40 rows=1450 width=0) (actual time=0.120..0.120 rows=1450 loops=1)
      Index Cond: ((status = 'completed'::text) AND (created_at >= '2026-01-01'::date))
      Buffers: shared hit=18
Execution Time: 0.820 ms
```

**Result**: Execution time dropped from **43.1ms down to 0.8ms** — a **52x speedup** with 98% fewer disk reads!

---

## 4. The Golden Rule of Composite Indexes: Leftmost Prefix

When creating multi-column indexes like `CREATE INDEX idx_user_filter ON users (country, status, created_at)`, PostgreSQL reads columns **from left to right**.

- ✅ `WHERE country = 'BJ'` (Uses index)
- ✅ `WHERE country = 'BJ' AND status = 'active'` (Uses index)
- ✅ `WHERE country = 'BJ' AND status = 'active' AND created_at > '2026-01-01'` (Uses index)
- ❌ `WHERE status = 'active'` (Index CANNOT be used efficiently!)
- ❌ `WHERE created_at > '2026-01-01'` (Index CANNOT be used!)

> **Rule of Thumb**: Put exact equality columns (`=`) first, and range/comparison columns (`>`, `<`, `BETWEEN`) last.

---

## 5. Partial Indexes: The Secret Superpower

If 90% of your orders are `completed`, indexing the entire table wastes disk and RAM. Use a **partial index**:

```sql
-- Only indexes rows that match the condition
CREATE INDEX idx_pending_orders ON orders (created_at)
WHERE status = 'pending';
```

This index is 90% smaller, stays hot in RAM, and speeds up invoice processing queues dramatically.
