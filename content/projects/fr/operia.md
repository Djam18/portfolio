---
title: "OpérIA — Copilote IA Opérationnel & Financier"
description: "Agent IA avec appel d'outils (MCP) interrogeant des données d'entreprise à fort volume en langage naturel, avec validation humaine systématique (HITL)."
status: "in-progress"
date: "2026-03-01"
stack: ["Python", "FastAPI", "Vue 3", "TypeScript", "MCP", "SQLite", "Tailwind CSS", "Playwright"]
image: "/images/portfolio/operia.png"
github: "https://github.com/Djam18/operia"
repoUrl: "https://github.com/Djam18/operia"
slug: "operia"
featured: true
vision: "Doter les directions financières et opérationnelles d'un copilote IA autonome encadré par une gouvernance stricte et une validation humaine (Human-in-the-Loop)."
motivation: "Les LLM ne doivent jamais déclencher d'actions financières critiques (relances de factures, avoirs, exports sensibles) de manière unilatérale sans traçabilité ni validation humaine."
approach: "Conception d'une architecture bi-couche avec backend FastAPI et interface Vue 3 / TypeScript. Implémentation d'outils Model Context Protocol (MCP) avec pushdown SQL direct (< 15 ms sur plus de 12 500 factures). Les opérations préparées par l'agent sont placées dans une boîte d'envoi en attente de validation explicite avant tout envoi réel."
expectedOutcome: "Zéro hallucination sur les chiffres comptables, temps de réponse < 15 ms, piste d'audit immuable et fonctionnement dual-mode (SQLite local autonome ou cloud avec disjoncteur)."
---

## Présentation du Système

OpérIA est un agent d'intelligence opérationnelle conçu pour automatiser le suivi des créances, l'analyse des comptes clients et la gestion des relances multi-devises (EUR, XOF, MAD, USD) tout en préservant le contrôle décisionnel humain.

## Fonctionnalités Majeures

- **Copilote conversationnel en langage naturel** : Interface multi-tours avec traçabilité complète des appels d'outils MCP (`crm.invoices.query`, `crm.comptes.enrich`).
- **Garde-fous Human-in-the-Loop (HITL)** : L'agent génère des actions préparées (destinataires, montants, modèles d'emails) soumises à validation par un opérateur.
- **Pushdown SQL haute performance (< 15 ms)** : Index B-tree composites permettant d'agréger plus de 12 500 factures en moins de 15 millisecondes sans saturer le contexte du LLM.
- **Boîte d'envoi opérationnelle & journal d'audit** : Visibilité complète sur les opérations en attente, exécutées ou rejetées.
- **Mode Dual (Local & Cloud)** : 100 % opérationnel hors-ligne sur base SQLite embarquée, avec disjoncteur automatique en cas d'indisponibilité réseau.
