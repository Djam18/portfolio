---
title: "OpérIA — Operations & Financial AI Copilot"
description: "Tool-calling AI Agent (MCP) querying high-volume enterprise financial data in natural language with Human-in-the-Loop (HITL) staged guardrails."
status: "in-progress"
date: "2026-03-01"
stack: ["Python", "FastAPI", "Vue 3", "TypeScript", "MCP", "SQLite", "Tailwind CSS", "Playwright"]
image: "/images/portfolio/operia.png"
github: "https://github.com/Djam18/operia"
repoUrl: "https://github.com/Djam18/operia"
slug: "operia"
featured: true
vision: "Empowering enterprise operations and finance teams with an autonomous AI copilot governed by rigorous Human-in-the-Loop (HITL) validation."
motivation: "LLMs should never execute state-altering or financial actions unilaterally without human sign-off, audit trails, and strict schema validation."
approach: "Engineered a high-performance system pairing a FastAPI backend with a Vue 3/TypeScript frontend. Implemented Model Context Protocol (MCP) tools with direct SQL pushdown (<15ms across 12,500+ invoices). Sensitive operations (dunning notices, dispute credits) enter an immutable staging outbox requiring explicit operator approval before dispatch."
expectedOutcome: "Zero hallucination on financial calculations, sub-15ms query execution, 100% auditable staged action queue, and dual-mode reliability (local embedded SQLite or cloud LLM)."
---

## System Overview

OpérIA is an enterprise-grade AI Agent architected to automate operational debt collection, customer accounting analysis, and invoice triage across international currencies (EUR, USD, XOF, MAD, KES) while keeping humans firmly in control.

## Key Capabilities

- **Natural Language Copilot**: Multi-turn conversational interface powered by custom MCP tool execution traces (`crm.invoices.query`, `crm.accounts.enrich`).
- **Human-in-the-Loop (HITL) Staged Guardrails**: The agent stages actions with recipients, amounts, and dispute context; operators review and approve them before dispatch.
- **High-Performance Direct SQL Pushdown (< 15ms)**: Composite B-tree indexes aggregate and rank over 12,500 invoices in under 15ms, eliminating token bloat and latency spikes.
- **Operations Outbox & Immutable Audit Trail**: Complete transparency over staged, queued, and executed financial actions.
- **Dual-Mode Operation**: Runs 100% offline via embedded SQLite and reactive agent engine, with automatic fallback circuit breaker if cloud connectivity drops.
