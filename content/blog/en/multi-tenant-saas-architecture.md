---
title: "Multi-Tenant SaaS Architecture: Schema-per-Tenant vs. Row-Level Security in PostgreSQL"
description: "Choosing between separate schemas and Row-Level Security (RLS) for your multi-tenant SaaS. Performance benchmarks, migration complexity, and tenant isolation."
date: "2026-08-20"
tags: ["architecture", "saas", "postgresql", "laravel", "backend"]
author: "Adam Abdel-Djamal"
readingTime: 7
featured: false
slug: "multi-tenant-saas-architecture"
---

When architecting a B2B SaaS platform, the single most impactful early decision is **how you isolate tenant data**. Pick the wrong model, and you'll either hit database migration nightmares at 500 tenants, or risk catastrophic cross-tenant data leaks.

While architecting **Shop-Tenant**, I evaluated the two most common PostgreSQL architectures: **Schema-per-Tenant** vs. **Shared-Table with Row-Level Security (RLS)**. Here is the engineering breakdown.

---

## 1. The Core Dilemma

| Architecture | Isolation Level | Migration Complexity | Connection Overhead | Cost Scaling |
|--------------|-----------------|----------------------|---------------------|--------------|
| **Schema-per-Tenant** | High (PostgreSQL Schemas) | High (`N` migrations) | Moderate | Scales well up to ~1,000 tenants |
| **Row-Level Security (RLS)** | High (PostgreSQL Policies) | Low (Single migration) | Low | Scales to millions of rows |

---

## 2. Approach A: Schema-per-Tenant

In this model, each customer gets their own PostgreSQL schema within the same database (`tenant_101.orders`, `tenant_102.orders`).

### Advantages
- **Accidental Leak Protection**: It is physically impossible for a query on `tenant_101.orders` to return records from `tenant_102`.
- **Easy Backups & Restores**: Exporting a single tenant's data is as simple as `pg_dump -n tenant_101`.
- **Tenant-specific Extensions**: Easy to add custom tables for enterprise tiers.

### The Drawback
Running database migrations. When you release a schema change, your migration runner must loop over every tenant schema. At 2,000 tenants, a migration taking 100ms per schema means 3+ minutes of deployment downtime.

---

## 3. Approach B: Shared-Table with Row-Level Security (RLS)

In this model, all tenants share a single `orders` table with a `tenant_id` column. PostgreSQL automatically filters queries at the database engine level using Row-Level Security.

```sql
-- Enable Row-Level Security on orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy enforcing tenant isolation via session setting
CREATE POLICY tenant_isolation_policy ON orders
  FOR ALL
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);
```

In your application middleware, you set the active tenant before executing any queries:

```php
// In Laravel / Express Middleware
DB::statement("SET LOCAL app.current_tenant_id = ?", [$tenantId]);
```

### Advantages
- **Single Migration**: Migrations run instantly across the entire system.
- **Connection Pooling**: Excellent compatibility with connection poolers like PgBouncer.
- **Resource Efficiency**: Optimal memory utilization in Postgres buffer pools.

---

## 4. The Verdict

- **Choose Schema-per-Tenant** if: You sell high-ticket enterprise contracts, clients demand dedicated schema isolation, and you plan for fewer than 1,000 tenants per database instance.
- **Choose Row-Level Security (RLS)** if: You are building self-serve, high-volume SaaS where fast onboarding, instant migrations, and horizontal database scaling matter most.
