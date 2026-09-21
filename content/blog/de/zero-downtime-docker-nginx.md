---
title: "Zero-Downtime Deployments with Docker Compose & Nginx: A Practical Guide for Single-Server Setups"
description: "You don't need Kubernetes to deploy without dropping user connections. Shows a simple blue/green container switch using Nginx reload on a $10/month VPS."
date: "2026-09-11"
tags: ["docker", "devops", "nginx", "deployment", "linux"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "zero-downtime-docker-nginx"
---

When deploying updates with standard `docker compose up -d`, there is almost always a **5 to 30 second window of downtime**:
1. Docker stops the old running container.
2. The new container boots, runs migrations, and connects to the database.
3. During those 15 seconds, every user visiting your site sees a `502 Bad Gateway`.

You don't need the monstrous complexity of Kubernetes or multi-node clusters to achieve **zero downtime**. You can deploy updates seamlessly on a simple \$10/month VPS using **Blue/Green Docker containers and Nginx reload**.

---

## 1. The Core Architecture

Instead of running a single application container, we configure two identical services in `docker-compose.yml`: **Blue** (port 3001) and **Green** (port 3002).

Nginx acts as a reverse proxy sitting in front of both containers:

```text
Incoming Traffic (Port 80/443)
              │
              ▼
       [Nginx Reverse Proxy]
              │
     (Points to ACTIVE port: 3001)
              │
       [App Blue: ACTIVE]        [App Green: IDLE]
```

When deploying:
1. Boot the **idle** container (e.g. Green).
2. Run health checks until Green returns `HTTP 200 OK`.
3. Point Nginx to Green's port.
4. Run `nginx -s reload` (which gracefully reloads configuration in **0 milliseconds** without dropping active TCP connections).
5. Shut down Blue.

---

## 2. The Blue/Green `docker-compose.yml`

```yaml
services:
  app-blue:
    image: my-registry/app:${VERSION:-latest}
    environment:
      - PORT=3000
    ports:
      - "127.0.0.1:3001:3000"
    restart: unless-stopped

  app-green:
    image: my-registry/app:${VERSION:-latest}
    environment:
      - PORT=3000
    ports:
      - "127.0.0.1:3002:3000"
    restart: unless-stopped
```

---

## 3. The 30-Line Zero-Downtime Deployment Script

Here is the production Bash deployment script (`deploy.sh`):

```bash
#!/bin/bash
set -e

# Determine which service is currently running
if grep -q "3001" /etc/nginx/conf.d/upstream.conf; then
  CURRENT_COLOR="blue"
  TARGET_COLOR="green"
  TARGET_PORT=3002
else
  CURRENT_COLOR="green"
  TARGET_COLOR="blue"
  TARGET_PORT=3001
fi

echo "🚀 Deploying $TARGET_COLOR on port $TARGET_PORT..."

# 1. Pull latest image and boot target container
docker compose pull app-$TARGET_COLOR
docker compose up -d app-$TARGET_COLOR

# 2. Health check target container
echo "⏳ Waiting for $TARGET_COLOR to become healthy..."
for i in {1..30}; do
  if curl -s http://127.0.0.1:$TARGET_PORT/api/health | grep -q "ok"; then
    echo "✅ Health check passed!"
    break
  fi
  sleep 1
  if [ $i -eq 30 ]; then
    echo "❌ Health check timed out! Aborting deployment."
    docker compose stop app-$TARGET_COLOR
    exit 1
  fi
done

# 3. Atomically switch Nginx upstream
echo "upstream backend { server 127.0.0.1:$TARGET_PORT; }" > /etc/nginx/conf.d/upstream.conf
nginx -t && nginx -s reload

echo "🎉 Traffic switched to $TARGET_COLOR. Stopping $CURRENT_COLOR..."
docker compose stop app-$CURRENT_COLOR
```

---

## Why This Works Flawlessly

1. **`nginx -s reload` does not terminate worker processes abruptly**: Existing in-flight requests finish on the old container, while new incoming TCP connections are immediately routed to the new container.
2. **Failed deployments never impact users**: If the new build has a runtime syntax error or fails database connection, the health check fails, the script aborts, and Nginx continues serving traffic from the old container with zero interruptions.
