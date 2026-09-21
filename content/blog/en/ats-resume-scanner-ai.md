---
title: "How I Built an ATS Resume Scanner with Nuxt 4, HuggingFace & Mistral-7B"
description: "A deep dive into engineering Talenta: extracting text from complex PDFs, streaming structured AI evaluations with HuggingFace, and preventing rate limit bottlenecks."
date: "2026-07-15"
tags: ["ai", "nuxt", "vue", "huggingface", "fullstack"]
author: "Adam Abdel-Djamal"
readingTime: 8
featured: true
slug: "ats-resume-scanner-ai"
---

Over 75% of job applications are filtered out by automated **Applicant Tracking Systems (ATS)** before an actual recruiter reads them. Candidates often spend hours applying, only to be rejected by an algorithm due to missing keywords or unparsed formatting.

I built **Talenta** to demystify this hiring black box. In this article, I break down the architectural challenges of building a production AI resume scoring application using **Nuxt 4**, **HuggingFace Inference**, and **Supabase**.

---

## 1. The Architecture at a Glance

The core pipeline consists of three decoupled stages:

1. **Document Parsing**: Extracting raw structured text from arbitrary PDF and DOCX files without losing section hierarchies (Experience, Education, Skills).
2. **AI Semantic Matching**: Comparing the extracted resume tokens against the target job description using Mistral-7B-Instruct.
3. **Deterministic Scoring Engine**: Combining semantic AI matching with strict rule-based scoring (keyword coverage, section completeness, contact info presence).

---

## 2. Fast & Secure Document Parsing

Parsing PDFs in Node.js server environments often leads to memory leaks if not handled carefully. Rather than relying on heavy headless browsers, I leveraged a lightweight stream-based PDF text extractor inside a Nuxt server route (`server/api/parse-cv.post.ts`).

```typescript
// server/api/parse-cv.post.ts
import { readMultipartFormData } from 'h3'
import { extractTextFromPdf } from '~/server/utils/pdf'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  const file = form?.find(item => item.name === 'resume')

  if (!file || file.type !== 'application/pdf') {
    throw createError({ statusCode: 400, message: 'Valid PDF required' })
  }

  // Enforce 5MB limit to protect memory
  if (file.data.length > 5 * 1024 * 1024) {
    throw createError({ statusCode: 413, message: 'File exceeds 5MB limit' })
  }

  const extractedText = await extractTextFromPdf(file.data)
  return { text: extractedText, wordCount: extractedText.split(/\s+/).length }
})
```

---

## 3. Forcing Strict JSON from LLMs with Zod

One of the biggest issues with LLMs in production is hallucinated format changes: missing brackets, conversational filler ("Sure, here is your evaluation..."), or malformed JSON.

To guarantee that the frontend receives type-safe data every time, the backend validates the raw model response against a strict **Zod schema**:

```typescript
import { z } from 'zod'

export const AtsAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  matchedKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  sectionFeedback: z.object({
    experience: z.string(),
    skills: z.string(),
    education: z.string(),
  }),
  actionableRewrites: z.array(z.object({
    originalSentence: z.string(),
    improvedSentence: z.string(),
    reason: z.string(),
  })),
})

export type AtsAnalysis = z.infer<typeof AtsAnalysisSchema>
```

If the LLM output fails schema validation, an automated one-shot repair prompt fixes the JSON formatting before returning the payload to the client.

---

## 4. Reactive UI and Quota Management

On the frontend, **Vue 3** and **Nuxt UI** provide instantaneous feedback. When an analysis starts, the user sees real-time progress indicators:
- Keyword extraction radar chart
- Ranked missing skills list
- Live score gauge animated with SVG circle dashes

Users on the Free tier receive 3 complimentary analyses, authenticated via **Supabase Auth** with Row-Level Security (RLS) policies preventing quota tampering on the PostgreSQL level.

---

## Key Takeaways

1. **Never rely on raw LLM output for critical UI rendering**: Always place a schema validator like Zod between the model and your client.
2. **Combine AI with deterministic heuristics**: An LLM is great at semantic understanding, but deterministic regex checks are faster and cheaper for checking email presence or phone formatting.
3. **Optimistic UI with clear error boundaries**: Resume parsing can fail on scanned image PDFs. Provide clear feedback prompting the user to upload a text-based document.
