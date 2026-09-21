---
title: "Déploiements Zero-Downtime avec Docker Compose et Nginx : Guide Pratique pour VPS"
description: "Pas besoin de Kubernetes pour déployer sans interrompre le trafic utilisateur. Méthode Blue/Green avec rechargement Nginx à chaud sur un serveur à 10 €/mois."
date: "2026-09-11"
tags: ["docker", "devops", "nginx", "deployment", "linux"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "zero-downtime-docker-nginx"
---

Lors d'un simple `docker compose up -d`, il existe quasi systématiquement une interruption de service de 10 à 30 secondes le temps que le nouveau conteneur compile ou se connecte à la base de données. Pendant ce laps de temps, vos utilisateurs se heurtent à une erreur `502 Bad Gateway`.

Il est pourtant très simple d'obtenir un **déploiement sans interruption de service (Zero-Downtime)** sur un serveur VPS classique grâce au rechargement gracieux de Nginx et une architecture Blue/Green.

---

## 1. Principe de l'Architecture Blue/Green

1. Faire tourner deux conteneurs identiques : `app-blue` (port 3001) et `app-green` (port 3002).
2. Nginx redirige le trafic vers le conteneur actif.
3. Lors du déploiement, démarrer le conteneur inactif et vérifier son endpoint `/api/health`.
4. Mettre à jour l'upstream Nginx et exécuter `nginx -s reload` : la bascule s'opère en 0 milliseconde sans fermer les connexions en cours.
5. Éteindre l'ancien conteneur une fois la bascule validée.
