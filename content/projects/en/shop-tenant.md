---
title: "Shop-Tenant — Multi-Tenant E-commerce SaaS"
description: "Multi-tenant e-commerce SaaS platform tailored for independent merchants in West Africa: schema isolation, Stripe payments, and automated tenant provisioning."
status: "analysis"
date: "2026-03-10"
stack: ["Laravel", "Vue.js", "Stripe", "PostgreSQL", "Docker", "Tailwind CSS"]
github: "https://github.com/Djam18/shop-tenant"
repoUrl: "https://github.com/Djam18/shop-tenant"
slug: "shop-tenant"
featured: true
vision: "Empowering independent retail merchants in West Africa with an accessible, high-performance multi-tenant e-commerce platform tailored to local and international commerce."
motivation: "Mainstream global SaaS platforms are cost-prohibitive for local merchants and rarely support regional commerce workflows or flexible multi-currency settlement."
approach: "Architecting a multi-tenant application with Laravel and PostgreSQL (schema-per-tenant or scoped tenant isolation). Building a reactive merchant admin with Vue.js, integrating Stripe Billing & webhooks, and orchestrating deployment with Docker."
expectedOutcome: "Robust data separation between merchants, automated tenant subdomain provisioning, custom storefront themes, and streamlined order fulfillment."
---

## Project Vision

Shop-Tenant is currently in architectural design and feasibility analysis. It targets independent retail entrepreneurs and brand creators across Francophone West Africa who need a dedicated storefront without complex DevOps overhead.

## Architecture Highlights

- **Multi-Tenant Isolation**: Ensuring zero data leakage between independent shop instances through database-level tenancy.
- **Unified Merchant Backoffice**: Vue.js admin console managing inventory, order statuses, discount vouchers, and shipping zones.
- **Payment & Settlement**: Stripe Connect & webhook architecture supporting card payments and mobile wallet settlements.
- **Containerized Infrastructure**: Docker and PostgreSQL configured for horizontal scalability and rapid database backups.
