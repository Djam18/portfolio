---
title: "Nuxt 4、HuggingFace、Mistral-7Bで構築したATS履歴書スキャナーの開発記録"
description: "Talentaの設計詳細：PDFテキスト抽出、構造化AIレスポンスのストリーミング、Zodによる厳格な型安全性の担保。"
date: "2026-07-15"
tags: ["ai", "nuxt", "vue", "huggingface", "fullstack"]
author: "Adam Abdel-Djamal"
readingTime: 8
featured: true
slug: "ats-resume-scanner-ai"
---

求人応募の75％以上が、採用担当者の目に触れる前に**ATS（採用管理システム）**によって自動選別されています。

この課題を解決するため、私は**Talenta**を開発しました。本記事では、**Nuxt 4**、**HuggingFace**、**Supabase**を組み合わせたAIプロダクトのアーキテクチャを紹介します。

---

## 1. システム構成の概要

1. **ドキュメント解析**: セクション階層を保ちながらPDFテキストを高速抽出。
2. **AIによる意味論的一致**: Mistral-7Bによる求人要件との適合度分析。
3. **決定論的スコアリングエンジン**: キーワードカバレッジとフォーマットのルールベース評価。
