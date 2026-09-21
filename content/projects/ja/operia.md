---
title: "OpérIA — 業務・財務特化型AIコパイロット"
description: "大規模な企業財務データを自然言語で分析し、実行前に人間の承認（HITL）を必須とするツール呼び出し型AIエージェント（MCP）。"
status: "in-progress"
date: "2026-03-01"
stack: ["Python", "FastAPI", "Vue 3", "TypeScript", "MCP", "SQLite", "Tailwind CSS", "Playwright"]
image: "/images/portfolio/operia.png"
github: "https://github.com/Djam18/operia"
repoUrl: "https://github.com/Djam18/operia"
slug: "operia"
featured: true
vision: "厳格な人間の確認（HITL）プロセスを組み込むことで、企業の財務・運用業務を安全かつ自律的に支援するAIエージェント。"
motivation: "請求督促や返金などの財務アクションは、人間の承認と監査ログなしにLLMが一方的に実行してはなりません。"
approach: "FastAPIバックエンドによるダイレクトSQLプッシュダウン（12,500件以上の請求書を15ms未満で集計）、MCPツール連携、Vue 3/TypeScriptによる承認管理画面。"
expectedOutcome: "財務数値のハルシネーションをゼロにし、超高速レスポンスと完全な監査証跡を実現。"
---

## システム概要

OpérIAは、多通貨（EUR、XOF、USD等）に対応した売掛金回収や請求管理の自動化を、人間の意思決定を尊重しながら推進するエンタープライズ向けAIエージェントです。
