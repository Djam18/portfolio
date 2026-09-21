---
title: "Talenta (ATS Analyzer)"
description: "AI-powered CV scoring tool for job seekers: 0–100 compatibility score, missing keywords, section analysis, and rewrite suggestions."
status: "in-progress"
date: "2026-02-10"
stack: ["Nuxt 4", "Vue 3", "TypeScript", "Nuxt UI v4", "Supabase", "HuggingFace", "Stripe", "Resend"]
image: "/images/portfolio/ats-analyzer.png"
github: "https://github.com/Djam18/ats-analyzer"
repoUrl: "https://github.com/Djam18/ats-analyzer"
slug: "ats-analyzer"
featured: true
vision: "Empowering job seekers to beat automated ATS filters through transparent AI-driven resume scoring and actionable keyword optimization."
motivation: "Over 75% of resumes are discarded by automated Applicant Tracking Systems before a human recruiter ever sees them due to formatting glitches or missing keywords."
approach: "Built a full-stack Nuxt 4 web app utilizing Nuxt UI v4 (Radix Vue + Tailwind), Supabase for auth, PostgreSQL with Row-Level Security, and Storage. AI inference queries HuggingFace (Mistral-7B) with structured Zod schema parsing. Integrated Stripe webhooks for subscription quotas (Free, Pro, Expert) and Resend for transactional email dispatch."
expectedOutcome: "Immediate 0–100 score feedback, ranked matched/missing keywords, section-by-section breakdown (skills, experience, education), and actionable before/after sentence rewrites."
---

## The Vision

Talenta solves a massive pain point for job seekers: **the black box of Applicant Tracking Systems (ATS)**. Candidates often apply to dozens of roles without knowing why they never receive interview callbacks. Talenta decodes the hiring algorithm.

## Key Features

- **ATS Compatibility Score**: Instant 0–100 match rating between your uploaded CV and any targeted job offer.
- **Keyword Gap Analysis**: Prioritizes crucial missing skills and domain keywords extracted from the job description.
- **Section Breakdown**: Granular evaluation across experience, skills, education, and formatting compliance.
- **Rewrite Suggestions**: Concrete before/after sentence rewrites to boost impact and keyword density.
- **Quota & Tier System**: Tiered subscription management (3 free analyses, Pro, Expert) wired via Stripe Checkout & Webhooks.

## Technical Architecture

- **Frontend**: Nuxt 4, Vue 3, TypeScript, Nuxt UI v4 (Tailwind CSS + Radix Vue primitives).
- **Backend & Server Routes**: Nitro server engine with in-memory rate limiting and Zod validation.
- **Database & Auth**: Supabase PostgreSQL with strict RLS policies and SQL migrations.
- **AI Inference**: HuggingFace Inference API powered by Mistral-7B with custom prompt engineering.
- **Billing & Email**: Stripe Checkout webhooks and Resend API.
