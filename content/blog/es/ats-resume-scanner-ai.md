---
title: "Cómo creé un escáner de CV ATS con Nuxt 4, HuggingFace y Mistral-7B"
description: "Análisis técnico de la arquitectura de Talenta: extracción de texto PDF, streaming de evaluaciones de IA y validación con Zod en producción."
date: "2026-07-15"
tags: ["ai", "nuxt", "vue", "huggingface", "fullstack"]
author: "Adam Abdel-Djamal"
readingTime: 8
featured: true
slug: "ats-resume-scanner-ai"
---

Más del 75% de las candidaturas laborales son descartadas por sistemas **ATS** antes de llegar a un reclutador humano.

Desarrollé **Talenta** para transparentar este proceso. En este artículo analizo los desafíos arquitectónicos de integrar **Nuxt 4**, **HuggingFace** y **Supabase** en producción.

---

## 1. Visión general de la arquitectura

1. **Extracción de documentos**: Procesamiento ágil de archivos PDF preservando la estructura del currículum.
2. **Coincidencia semántica con IA**: Comparación contextual mediante modelos Mistral-7B.
3. **Motor de puntuación determinista**: Combinación de puntuación semántica y reglas de cobertura clave.
