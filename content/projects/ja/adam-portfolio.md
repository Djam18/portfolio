---
title: "Adam Portfolio v2"
description: "Nuxt 3、Tailwind CSS、Nuxt Content で構築した個人ポートフォリオ。目標：高速・多言語・SEO フレンドリーなサイト。"
status: "live"
date: "2025-03-15"
stack: ["Nuxt 4", "Vue 3", "Tailwind CSS", "TypeScript", "Nuxt Content"]
image: "/images/portfolio/portfolio-v2.jpg"
link: "https://adam-portfolio.vercel.app"
liveUrl: "https://adam-portfolio.vercel.app"
github: "https://github.com/Djam18/portfolio"
repoUrl: "https://github.com/Djam18/portfolio"
slug: "adam-portfolio"
featured: true
---

## コンテキスト

自分を本当に表現するポートフォリオが欲しかった：高速でアクセスしやすく、新しいプロジェクトごとにコードを触らずに更新できるもの。

## 課題

- **多言語対応**：4言語（EN・FR・ES・JA）をコードの重複なしで管理
- **SEO**：「Adam Abdel-Djamal web developer」で検索されること
- **パフォーマンス**：モバイルで Lighthouse 95+

## 解決策

Nuxt 3 と Nuxt Content v3 を採用し、Markdown でプロジェクトを管理。新しいプロジェクトは `.md` ファイルを追加して `git push` するだけ。

## 結果

- Lighthouse：パフォーマンス 98、アクセシビリティ 100、SEO 100
- ビルド時間：Vercel で 30 秒未満
- プロジェクト追加：2 分