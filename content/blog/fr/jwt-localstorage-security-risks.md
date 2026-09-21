---
title: "Pourquoi Stocker un JWT dans LocalStorage est une Faille de Sécurité (et Quoi Utiliser à la Place)"
description: "Comparatif de sécurité web : faiblesses face aux attaques XSS, fuite de tokens par des dépendances npm compromises et supériorité des cookies HttpOnly SameSite."
date: "2026-09-19"
tags: ["security", "auth", "javascript", "web-security", "frontend"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "jwt-localstorage-security-risks"
---

Dans presque tous les tutoriels débutants, on lit : `localStorage.setItem('token', token)`. C'est simple, mais c'est une **faille de sécurité critique**.

Tout script JavaScript s'exécutant sur votre page a un accès total en lecture à `localStorage`. Si une seule dépendance npm de votre projet est compromise ou qu'une faille XSS survient, **un attaquant peut dérober les sessions de tous vos utilisateurs**.

---

## 1. La Solution : Les Cookies `HttpOnly`

En déléguant la gestion du token à un cookie avec l'attribut `HttpOnly`, le navigateur interdit tout accès via JavaScript (`document.cookie`). Même en présence d'une injection XSS, l'attaquant ne peut pas lire le jeton d'authentification.
