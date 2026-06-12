---
title: "6 erreurs courantes sur une API (et comment les corriger)"
description: "Des mauvaises méthodes HTTP aux fuites de données sensibles — les erreurs que la plupart des développeurs font en construisant leur première API, avec les corrections concrètes."
date: "2026-06-04"
tags: ["api", "backend", "rest", "bonnes-pratiques"]
author: "Adam Abdel-Djamal"
readingTime: 6
---

Construire une API semble simple jusqu'au premier incident en production. La plupart des bugs ne sont pas complexes — ce sont les mêmes six erreurs répétées dans des milliers de codebases. Voici ce que c'est et comment les arrêter.

---

## 1. Utiliser la mauvaise méthode HTTP

L'erreur la plus visible. Utiliser `GET` pour supprimer une ressource, ou `POST` pour tout parce que "ça marche".

```http
# ❌ Suppression avec GET — catastrophique si un navigateur précharge cette URL
GET /api/utilisateurs/42/supprimer

# ✅ Correct
DELETE /api/utilisateurs/42
```

Les méthodes HTTP transportent une signification sémantique dont les clients, les proxies et les caches dépendent. `GET` doit être idempotent et sûr (sans effet de bord). `POST` crée. `PUT`/`PATCH` modifient. `DELETE` supprime. Violer ces conventions casse le cache, l'historique du navigateur et tout client HTTP qui respecte la spec.

---

## 2. Mauvais codes de statut

Retourner `200 OK` pour une réponse d'erreur est l'erreur la plus fréquente dans les APIs junior.

```json
// ❌ Statut 200, mais c'est une erreur
{
  "success": false,
  "error": "Utilisateur introuvable"
}

// ✅ Statut 404 — le client le sait immédiatement sans parser le corps
{
  "error": "Utilisateur introuvable",
  "code": "USER_NOT_FOUND"
}
```

**Les codes qui comptent le plus :**

| Code | Quand l'utiliser |
|------|-----------------|
| `200` | Succès avec un corps |
| `201` | Ressource créée (POST) |
| `204` | Succès, sans corps (DELETE) |
| `400` | Entrée invalide du client |
| `401` | Non authentifié |
| `403` | Authentifié mais non autorisé |
| `404` | La ressource n'existe pas |
| `422` | Entrée syntaxiquement valide mais sémantiquement incorrecte |
| `429` | Limite de taux dépassée |
| `500` | Erreur serveur (jamais la faute du client) |

---

## 3. Faire confiance aux données client

Chaque valeur envoyée par un client est un vecteur d'attaque potentiel.

```php
// ❌ Ne jamais faire ça
$id = $_GET['id'];
$query = "SELECT * FROM users WHERE id = $id";
// Injection SQL : ?id=1 OR 1=1

// ✅ Toujours valider et assainir
$id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
if (!$id) {
    return response()->json(['error' => 'ID invalide'], 400);
}
$user = User::findOrFail($id); // requête paramétrée
```

Valider : type, format, longueur, plage. Assainir avant toute opération sur la base de données ou le système de fichiers. Ne jamais faire confiance à ce qui arrive dans le corps de la requête, les en-têtes ou la chaîne de requête.

---

## 4. Fuiter des données sensibles

Retourner l'objet complet de la base de données sans filtrage est une invitation à une violation de données.

```json
// ❌ Retourner le modèle User brut
{
  "id": 42,
  "email": "user@example.com",
  "password": "$2b$12$...",
  "stripe_customer_id": "cus_xxx",
  "notes_internes": "signalé pour révision",
  "created_at": "2024-01-01"
}

// ✅ Retourner seulement ce dont le client a besoin
{
  "id": 42,
  "email": "user@example.com",
  "created_at": "2024-01-01"
}
```

Utilisez des serializers, des DTOs ou des API Resources (Laravel) pour définir explicitement ce qui est exposé. La règle : **opt-in, pas opt-out.** Commencer par rien, ajouter ce qui est nécessaire.

---

## 5. Format d'erreur incohérent

Quand chaque endpoint retourne les erreurs différemment, chaque client doit gérer chaque format.

```json
// ❌ Endpoint A
{ "message": "Introuvable" }

// ❌ Endpoint B
{ "error": true, "msg": "Validation échouée", "champs": ["email"] }

// ❌ Endpoint C
"Erreur interne du serveur"

// ✅ Un seul format, partout
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "La requête contient des champs invalides.",
    "details": [
      { "field": "email", "issue": "Format d'email invalide" }
    ]
  }
}
```

Définir l'enveloppe d'erreur une fois. L'appliquer partout via un gestionnaire d'exceptions global. Les clients — y compris votre propre frontend — vous en remercieront.

---

## 6. Pas de versioning

Modifier la réponse d'un endpoint casse tous les clients qui l'utilisent. Sans versioning, l'API ne peut jamais évoluer.

```http
# ❌ Sans version — tout changement cassant affecte immédiatement tous les clients
GET /api/utilisateurs

# ✅ Versionné — v1 reste stable, v2 introduit les changements cassants en toute sécurité
GET /api/v1/utilisateurs
GET /api/v2/utilisateurs
```

Versionner dès le premier jour, même si vous n'avez que la v1. Le coût d'ajouter `/v1/` plus tard — après que les clients sont en production — est bien plus élevé que de l'inclure dès le départ.

---

## Ce qu'il faut retenir

Aucune de ces erreurs ne nécessite des connaissances avancées pour être corrigée. Elles nécessitent de la discipline : une checklist avant que chaque endpoint soit livré.

- [ ] La méthode HTTP correspond à la sémantique de l'opération
- [ ] Le code de statut est précis
- [ ] Toutes les entrées sont validées avant utilisation
- [ ] La réponse n'expose que les champs nécessaires
- [ ] Les erreurs suivent le format global
- [ ] L'URL inclut une version d'API
