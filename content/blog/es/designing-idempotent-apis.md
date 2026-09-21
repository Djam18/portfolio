---
title: "Designing Idempotent APIs: How to Prevent Duplicate Payments & Orders"
description: "How to implement Idempotency-Key headers with Redis to guarantee that network retries or double-clicks never create duplicate transactions or charges."
date: "2026-08-25"
tags: ["api", "architecture", "redis", "backend", "security"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "designing-idempotent-apis"
---

A user clicks "Pay $49.00". Their mobile connection blips. The UI hangs for two seconds, so they click "Pay" again.

Without an idempotency layer, their card is charged twice, two identical orders are created in your database, and your support team spends hours issuing refunds.

In distributed systems, **network timeouts are ambiguous**. Did the request fail before reaching the server, or did it succeed but the response was dropped on the wire? In this article, we'll design a production-grade idempotency layer using `Idempotency-Key` and Redis.

---

## 1. What is Idempotency?

An operation is **idempotent** if applying it once produces the exact same outcome as applying it ten times.

- `GET`, `PUT`, `DELETE` are inherently idempotent by HTTP specification.
- `POST` is **non-idempotent** by default — each invocation creates a new resource.

To make `POST /api/checkout` idempotent, the client must send a unique identifier with the request:

```http
POST /api/checkout HTTP/1.1
Host: api.yourapp.com
Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
Content-Type: application/json

{
  "cartId": "cart_1234",
  "amount": 4900
}
```

---

## 2. The Idempotency Workflow with Redis

Here is the life cycle of an idempotent request:

```text
Client (Sends Idempotency-Key)
   │
   ▼
[Redis Lock Check]
   ├─► Key exists & Status is COMPLETED: Return cached response immediately (No duplicate work!)
   ├─► Key exists & Status is PROCESSING: Return 409 Conflict (Concurrent in-flight duplicate)
   └─► Key does NOT exist: Acquire lock with TTL (e.g. 120s) -> Execute transaction -> Store response in Redis
```

---

## 3. Implementation: Express / Node.js Middleware

Here is the clean middleware implementation using Redis atomic primitives:

```typescript
import { Request, Response, NextFunction } from 'express'
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

export async function idempotencyMiddleware(req: Request, res: Response, next: NextFunction) {
  const idempotencyKey = req.header('Idempotency-Key')
  if (!idempotencyKey) return next()

  const redisKey = `idempotency:${req.user?.id || 'anon'}:${idempotencyKey}`

  // Atomic SET with NX (Only set if Not eXists) and 120-second TTL
  const acquired = await redis.set(redisKey, JSON.stringify({ status: 'PROCESSING' }), 'EX', 120, 'NX')

  if (!acquired) {
    const cachedData = await redis.get(redisKey)
    if (!cachedData) return res.status(500).json({ error: 'Idempotency state corrupted' })

    const { status, statusCode, body } = JSON.parse(cachedData)

    if (status === 'PROCESSING') {
      return res.status(409).json({ error: 'A request with this idempotency key is already in progress.' })
    }

    // Replay original response without re-executing charges
    return res.status(statusCode).json(body)
  }

  // Intercept the response to cache the result once completed
  const originalJson = res.json.bind(res)
  res.json = (body: any) => {
    redis.set(
      redisKey,
      JSON.stringify({ status: 'COMPLETED', statusCode: res.statusCode, body }),
      'EX',
      86400 // Keep cached response for 24 hours
    )
    return originalJson(body)
  }

  next()
}
```

---

## 4. Crucial Edge Cases to Handle

1. **Payload Mismatch**: If a client sends the same `Idempotency-Key` with a completely different payload or amount, hash the request body (`SHA-256`) and verify it against the cached hash. Reject with `422 Unprocessable Entity` if the payload mutated.
2. **Server Crashes During Execution**: If your server crashes mid-flight while the status is `PROCESSING`, the short 120s TTL ensures the key automatically expires rather than permanently locking the user out.
3. **Database Transactions**: Always wrap state-altering database changes in atomic ACID transactions (`BEGIN ... COMMIT`) before updating the idempotency cache.
