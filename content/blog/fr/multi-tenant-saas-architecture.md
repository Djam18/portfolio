---
title: "Architecture SaaS Multi-Tenant : Schéma par Tenant vs. Row-Level Security sous PostgreSQL"
description: "Comment choisir entre isolation par schémas et Row-Level Security (RLS) pour votre SaaS. Performances, complexité de migration et sécurité des données."
date: "2026-08-20"
tags: ["architecture", "saas", "postgresql", "laravel", "backend"]
author: "Adam Abdel-Djamal"
readingTime: 7
featured: false
slug: "multi-tenant-saas-architecture"
---

Lors de la conception d'une plateforme SaaS B2B, la décision la plus structurante concerne **l'isolation des données entre clients**. Un mauvais choix peut transformer vos migrations en cauchemar ou entraîner des fuites de données inter-clients.

Durant l'analyse architecturale de **Shop-Tenant**, j'ai comparé les deux approches majeures sous PostgreSQL : le **Schéma par Tenant** face à la **Table partagée avec Row-Level Security (RLS)**. Voici le comparatif technique.

---

## 1. Le Dilemme Principal

| Architecture | Niveau d'isolation | Complexité des migrations | Scalabilité des connexions |
|--------------|--------------------|---------------------------|----------------------------|
| **Schéma par Tenant** | Élevé (Schémas distincts) | Élevée (`N` migrations) | Modérée (~1 000 tenants max) |
| **Row-Level Security (RLS)** | Élevé (Moteur PostgreSQL) | Faible (1 seule migration) | Excellente (millions de lignes) |

---

## 2. Approche 1 : Un Schéma par Tenant

Chaque client dispose de son propre schéma PostgreSQL (`tenant_101.orders`, `tenant_102.orders`).

### Avantages
- **Étanchéité totale** : Une requête sur `tenant_101.orders` ne peut structurellement pas renvoyer les données de `tenant_102`.
- **Sauvegarde unitaire** : Exporter les données d'un client se fait en une ligne de commande `pg_dump -n tenant_101`.

### Inconvénient majeur
Le déploiement des migrations. Avec 2 000 clients, exécuter une migration sur 2 000 schémas successifs allonge considérablement la durée de déploiement.

---

## 3. Approche 2 : Table partagée avec Row-Level Security (RLS)

Tous les locataires partagent la même table avec une colonne `tenant_id`. PostgreSQL applique le filtre directement au niveau du moteur :

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON orders
  FOR ALL
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);
```

Dans votre middleware applicatif :

```php
DB::statement("SET LOCAL app.current_tenant_id = ?", [$tenantId]);
```

---

## 4. Le Verdict

- Privilégiez le **Schéma par Tenant** pour les solutions grands comptes (Enterprise) nécessitant une conformité réglementaire stricte et moins de 1 000 clients par instance.
- Privilégiez le **Row-Level Security (RLS)** pour un SaaS en libre-service où l'onboarding rapide et les migrations instantanées sont primordiaux.
