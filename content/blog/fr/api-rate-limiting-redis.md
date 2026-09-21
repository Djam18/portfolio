---
title: "Limitation de Débit d'API (Rate Limiting) avec Redis : Token Bucket vs. Sliding Window"
description: "Comparatif des algorithmes de limitation de requêtes pour protéger votre backend contre les scrapers, attaques par force brute et abus sans ralentir les utilisateurs légitimes."
date: "2026-09-14"
tags: ["api", "security", "redis", "backend", "performance"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "api-rate-limiting-redis"
---

Sans limitation de débit sur vos APIs, un seul script malicieux peut bombarder votre page de connexion ou de commande avec 5 000 requêtes par seconde et saturer votre base de données.

Le rate limiting constitue votre premier rempart. Avec les Sorted Sets (`ZSET`) de Redis, il est possible de calculer une fenêtre glissante (Sliding Window) en temps réel avec une précision à la milliseconde et un impact mémoire minime.
