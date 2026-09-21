---
title: "API Rate Limiting in Practice: Token Bucket vs. Sliding Window with Redis"
description: "Comparing rate-limiting algorithms to protect your backend against scrapers, credential stuffing, and bot spam with minimal latency overhead."
date: "2026-09-14"
tags: ["api", "security", "redis", "backend", "performance"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "api-rate-limiting-redis"
---

Without API rate limiting, a single rogue script or misconfigured webhook client can fire 10,000 requests per second at your login or checkout endpoint, exhausting your database connection pool and taking your entire application down.

Rate limiting is the first line of defense against bot attacks, credential stuffing, and API resource abuse. But which algorithm should you implement?

In this article, we compare the two industry-standard algorithms — **Token Bucket** and **Sliding Window Log** — and show how to implement a high-speed sliding window rate limiter in Redis.

---

## 1. Comparing the Algorithms

### A. Fixed Window Counter (The Flawed Default)
Divides time into fixed buckets (e.g. 10:00 to 10:01). If a user can make 100 requests per minute, they can send 100 requests at 10:00:59, and another 100 requests at 10:01:01. That means **200 requests in 2 seconds** — double the intended burst limit!

### B. Token Bucket
A bucket holds a fixed number of tokens (burst capacity). Tokens are continuously replenished at a constant rate. Each incoming request consumes one token.
- **Great for**: APIs that want to allow legitimate temporary traffic spikes while capping sustained throughput.

### C. Sliding Window Counter (The Production Standard)
Combines the low memory usage of fixed windows with the smoothness of a rolling window. It calculates the request rate by weighting the request count of the previous window and the current window.

---

## 2. Sliding Window Rate Limiter with Redis Sorted Sets

Redis Sorted Sets (`ZSET`) allow us to track requests by timestamp with microsecond accuracy:

```typescript
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

export async function checkRateLimit(identifier: string, limit = 60, windowInSeconds = 60) {
  const now = Date.now()
  const windowStart = now - (windowInSeconds * 1000)
  const key = `ratelimit:${identifier}`

  // Atomic Redis Pipeline (Runs in a single round-trip)
  const multi = redis.multi()
  // 1. Remove all request timestamps older than the active window
  multi.zremrangebyscore(key, 0, windowStart)
  // 2. Count requests currently in the active window
  multi.zcard(key)
  // 3. Add the current timestamp as a new request
  multi.zadd(key, now, `${now}-${Math.random()}`)
  // 4. Set key expiration to auto-clean idle users
  multi.expire(key, windowInSeconds)

  const results = await multi.exec()
  const currentCount = (results?.[1]?.[1] as number) || 0

  if (currentCount >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil(windowInSeconds - ((now - windowStart) / 1000))
    }
  }

  return {
    allowed: true,
    remaining: limit - currentCount - 1,
    retryAfter: 0
  }
}
```

---

## 3. Returning Standard HTTP Rate Limit Headers

Whenever your server answers a request, communicate rate limit states in the response headers (following IETF draft standards):

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 32
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1773489240
Content-Type: application/json

{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please retry in 32 seconds."
}
```

This ensures honest third-party API clients and mobile SDKs can automatically back off and retry without overwhelming your infrastructure.
