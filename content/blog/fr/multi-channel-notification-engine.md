---
title: "Bâtir un Moteur de Notifications Multi-Canal Résilient (Email, SMS, Push Web)"
description: "Conception d'un pipeline d'événements asynchrone avec files d'attente Redis, préférences utilisateurs, limitation de débit et bascule automatique en cas d'échec."
date: "2026-09-13"
tags: ["architecture", "backend", "queues", "redis", "node"]
author: "Adam Abdel-Djamal"
readingTime: 7
featured: false
slug: "multi-channel-notification-engine"
---

Envoyer un email ou un SMS directement dans une route HTTP (`await sendEmail(...)`) expose votre application à des timeouts bloquants si l'API externe ralentit.

Pour une application robuste, il est indispensable de dissocier la création de l'événement et l'envoi effectif via une file d'attente Redis (BullMQ).

---

## 1. Architecture Événementielle

L'application émet un événement métier (`order.placed`) sans se soucier du canal final. Le worker en arrière-plan charge les préférences du client, applique les règles d'horaires calmes (Quiet Hours), puis dispatche la notification.

Si l'envoi SMS échoue à cause du réseau opérateur, le système bascule automatiquement vers un email de secours sans perte de message.
