---
title: "6 Common API Mistakes (And How to Fix Them)"
description: "From wrong HTTP methods to leaking sensitive data — the errors most developers make when building their first API, and the concrete fixes."
date: "2026-06-04"
tags: ["api", "backend", "rest", "best-practices"]
author: "Adam Abdel-Djamal"
readingTime: 6
---

Building an API feels straightforward until your first production incident. Most bugs aren't complex — they're the same six mistakes repeated across thousands of codebases. Here's what they are and how to stop making them.

---

## 1. Using the Wrong HTTP Method

The most visible mistake. Using `GET` to delete a resource, or `POST` for everything because "it works."

```http
# ❌ Deleting with GET — catastrophic if a browser prefetches this URL
GET /api/users/42/delete

# ✅ Correct
DELETE /api/users/42
```

HTTP methods carry semantic meaning that clients, proxies, and caches rely on. `GET` must be idempotent and safe (no side effects). `POST` creates. `PUT`/`PATCH` update. `DELETE` removes. Violating these conventions breaks caching, browser history, and every HTTP client that follows the spec.

---

## 2. Wrong Status Codes

Returning `200 OK` for an error response is the most common mistake in junior APIs.

```json
// ❌ Status 200, but it's an error
{
  "success": false,
  "error": "User not found"
}

// ✅ Status 404 — the client knows immediately without parsing the body
{
  "error": "User not found",
  "code": "USER_NOT_FOUND"
}
```

**The codes that matter most:**

| Code | When to use it |
|------|----------------|
| `200` | Success with a body |
| `201` | Resource created (POST) |
| `204` | Success, no body (DELETE) |
| `400` | Invalid input from the client |
| `401` | Not authenticated |
| `403` | Authenticated but not authorized |
| `404` | Resource doesn't exist |
| `422` | Input syntactically valid but semantically wrong |
| `429` | Rate limit exceeded |
| `500` | Server error (never the client's fault) |

---

## 3. Trusting Client Input

Every value sent by a client is a potential attack vector.

```php
// ❌ Never do this
$id = $_GET['id'];
$query = "SELECT * FROM users WHERE id = $id";
// SQL injection: ?id=1 OR 1=1

// ✅ Always validate and sanitize
$id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
if (!$id) {
    return response()->json(['error' => 'Invalid ID'], 400);
}
$user = User::findOrFail($id); // parameterized query
```

Validate: type, format, length, range. Sanitize before any database or filesystem operation. Never trust what arrives in the request body, headers, or query string.

---

## 4. Leaking Sensitive Data

Returning the full database object without filtering is an invitation to a data breach.

```json
// ❌ Returning the raw User model
{
  "id": 42,
  "email": "user@example.com",
  "password": "$2b$12$...",
  "stripe_customer_id": "cus_xxx",
  "internal_notes": "flagged for review",
  "created_at": "2024-01-01"
}

// ✅ Return only what the client actually needs
{
  "id": 42,
  "email": "user@example.com",
  "created_at": "2024-01-01"
}
```

Use serializers, DTOs, or API Resources (Laravel) to explicitly define what gets exposed. The rule: **opt-in, not opt-out.** Start with nothing, add what's needed.

---

## 5. Inconsistent Error Format

When every endpoint returns errors differently, every client has to handle every format.

```json
// ❌ Endpoint A
{ "message": "Not found" }

// ❌ Endpoint B
{ "error": true, "msg": "Validation failed", "fields": ["email"] }

// ❌ Endpoint C
"Internal server error"

// ✅ One format, everywhere
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request contains invalid fields.",
    "details": [
      { "field": "email", "issue": "Invalid email format" }
    ]
  }
}
```

Define your error envelope once. Apply it everywhere via a global exception handler. Clients — including your own frontend — will thank you.

---

## 6. No API Versioning

Changing an endpoint response breaks every client using it. Without versioning, you can never evolve the API.

```http
# ❌ No version — any breaking change affects all clients immediately
GET /api/users

# ✅ Versioned — v1 stays stable, v2 introduces breaking changes safely
GET /api/v1/users
GET /api/v2/users
```

Version from day one, even if you only have v1. The cost of adding `/v1/` later — after clients are in production — is much higher than the cost of including it from the start.

---

## The Takeaway

None of these mistakes require advanced knowledge to fix. They require discipline: a checklist before every endpoint ships.

- [ ] HTTP method matches the operation's semantics
- [ ] Status code is accurate
- [ ] All input is validated before use
- [ ] Response only exposes necessary fields
- [ ] Errors follow the global format
- [ ] URL includes an API version
