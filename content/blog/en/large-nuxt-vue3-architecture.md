---
title: "How to Structure a Large Nuxt / Vue 3 Application: Modular Architecture That Scales"
description: "Moving away from the default flat components/ and composables/ directories toward domain-driven, feature-sliced architecture that stays maintainable when a project hits 100+ pages."
date: "2026-09-02"
tags: ["nuxt", "vue", "architecture", "typescript", "frontend"]
author: "Adam Abdel-Djamal"
readingTime: 8
featured: false
slug: "large-nuxt-vue3-architecture"
---

Nuxt 3 & 4 provide an extraordinarily productive developer experience out of the box. You create a file in `components/`, define a function in `composables/`, and auto-import handles the rest.

However, once your application grows beyond 50 pages, 150 components, and multiple distinct business domains (Authentication, Billing, Onboarding, Analytics, Settings), the default flat directory structure falls apart:
- `components/` turns into a chaotic junk drawer of 200 files.
- `composables/` becomes a tangled web of cross-feature dependencies.
- Onboarding new developers requires knowing the exact naming convention of every component.

In this article, I present the **domain-driven, feature-sliced architecture** I use to keep large Nuxt applications maintainable and scalable.

---

## 1. The Anti-Pattern: Layer-First Organization

The default structure organizes code by **technical layer**:

```text
📁 components/
   ├── UserAvatar.vue
   ├── InvoiceTable.vue
   ├── CheckoutModal.vue
   ├── PricingCard.vue
📁 composables/
   ├── useAuth.ts
   ├── useBilling.ts
   ├── useUser.ts
```

When you need to modify the **Billing** flow, you have to jump between 6 different top-level folders. Deleting or refactoring a feature requires hunting down disconnected files.

---

## 2. The Solution: Domain-Driven Modules with Nuxt Layers

Instead of organizing by technical layer, organize by **Business Domain**:

```text
📁 app/
📁 layers/
   ├── core/                  # Design system, layout primitives, base utilities
   │   ├── components/ui/     # Button, Badge, Modal, Input
   │   └── composables/       # useApi, useStorage, useColorTheme
   │
   ├── auth/                  # Auth domain
   │   ├── components/        # LoginForm, RegisterForm, ResetPasswordModal
   │   ├── composables/       # useAuth, useSession
   │   └── pages/             # /login, /register, /forgot-password
   │
   ├── billing/               # Billing & Subscription domain
   │   ├── components/        # PricingTable, SubscriptionCard, InvoiceRow
   │   ├── composables/       # useStripe, useInvoices
   │   ├── server/api/        # /api/stripe/webhook, /api/billing/portal
   │   └── pages/             # /billing, /checkout
   │
   └── projects/              # Core product domain
```

### Enabling Layers in `nuxt.config.ts`

Nuxt has native support for this through **Nuxt Layers (Extends)**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    './layers/core',
    './layers/auth',
    './layers/billing',
    './layers/projects',
  ],
})
```

---

## 3. Strict Dependency Rules Between Domains

To avoid spaghetti dependencies:

1. **Feature layers can import from `core`**, but `core` can NEVER import from a feature layer.
2. **Feature layers cannot directly cross-import each other's components**. If the `projects` domain needs to know if the user has an active subscription, it asks a centralized shared store or event bus (`useAuth().isSubscribed`), rather than directly mounting a Billing component.

---

## 4. Colocating Server APIs with Their Domain

In Nuxt 4, you can colocate your server endpoints directly inside the corresponding domain layer:

```text
📁 layers/billing/server/api/
   ├── checkout.post.ts
   ├── webhook.post.ts
   └── invoices.get.ts
```

This keeps the full vertical slice of a feature (UI, state, database query, API route) together in a single self-contained directory. If you ever retire the billing system or extract it into a standalone microservice, you can isolate it cleanly.
