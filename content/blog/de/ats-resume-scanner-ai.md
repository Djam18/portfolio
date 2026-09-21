---
title: "Wie ich einen ATS-Resume-Scanner mit Nuxt 4, HuggingFace und Mistral-7B gebaut habe"
description: "Ein tiefer Einblick in Talenta: PDF-Textextraktion, Streaming strukturierter KI-Auswertungen und Zod-Validierung in der Praxis."
date: "2026-07-15"
tags: ["ai", "nuxt", "vue", "huggingface", "fullstack"]
author: "Adam Abdel-Djamal"
readingTime: 8
featured: true
slug: "ats-resume-scanner-ai"
---

Über 75 % aller Bewerbungen werden von automatisierten **Applicant Tracking Systems (ATS)** aussortiert, noch bevor ein Personaler sie zu Gesicht bekommt.

Ich habe **Talenta** entwickelt, um diesen Algorithmus transparent zu machen. In diesem Artikel teile ich die Architekturprinzipien hinter dieser KI-Lösung mit **Nuxt 4**, **HuggingFace** und **Supabase**.

---

## 1. Die Architektur im Überblick

1. **Dokumenten-Parsing**: Schnelle Textextraktion aus PDFs ohne Verlust der Abschnittshierarchie.
2. **Semantischer KI-Abgleich**: Abgleich von Lebenslaufdaten mit Stellenanzeigen mittels Mistral-7B.
3. **Deterministische Scoring-Engine**: Gewichtung zwischen Keyword-Dichte und struktureller Vollständigkeit.
