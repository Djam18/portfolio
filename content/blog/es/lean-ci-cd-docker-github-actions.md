---
title: "A Lean CI/CD Pipeline for Solo Developers: Automated Testing and Deployments with Docker & GitHub Actions"
description: "Solo developers and startup founders looking for simple, robust deployment workflows without heavy cloud infrastructure."
date: "2026-09-15"
tags: ["devops", "docker", "ci-cd", "github-actions", "linux"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "lean-ci-cd-docker-github-actions"
---

When you are a solo developer or working in a small startup team, you do not need a 400-line Terraform configuration or a \$500/month Kubernetes cluster. What you need is:

1. **Confidence**: Automatic unit & integration tests run on every push so you don't ship broken code.
2. **Speed**: Fast Docker image builds with layer caching.
3. **Simplicity**: Automatic zero-downtime deployment to your VPS the moment a PR merges into `main`.

Here is the exact, battle-tested GitHub Actions CI/CD workflow I use across my production projects.

---

## 1. The 3-Step Pipeline Strategy

```text
git push origin main
       │
       ▼
[Stage 1: Lint & Test] (Runs in parallel with cache)
       │ (Passes)
       ▼
[Stage 2: Build & Push Docker Image] (BuildKit + GitHub Cache)
       │ (Passes)
       ▼
[Stage 3: SSH Deploy to VPS] (Pulls new image, runs migrations, reloads Nginx)
```

---

## 2. The Complete `.github/workflows/deploy.yml`

```yaml
name: CI/CD Production Pipeline

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js / Bun
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Linter & Typecheck
        run: npm run typecheck

      - name: Run Test Suite
        run: npm test

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry (GHCR)
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build & Push Multi-Arch Docker Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Deploy via SSH to VPS
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /opt/apps/my-app
            echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
            docker compose pull
            docker compose up -d --remove-orphans
            docker image prune -f
```

---

## 3. Why This Workflow Excels for Solo Engineers

- **GitHub Cache (`type=gha`)**: Docker layers are cached directly inside GitHub Actions. Unchanged dependency layers are skipped, reducing build times from 6 minutes to under 45 seconds.
- **Zero Secrets Leakage**: Deployments authenticate via ephemeral `GITHUB_TOKEN` and SSH private keys stored in encrypted repository secrets.
- **Auto Image Pruning**: `docker image prune -f` prevents your VPS disk from filling up with orphaned container images over time.
