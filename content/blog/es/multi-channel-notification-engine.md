---
title: "Building a Resilient Multi-Channel Notification Engine (Email, SMS, Web Push)"
description: "Designing an asynchronous event pipeline that handles user notification preferences, rate limits, and fallback channels (e.g. if SMS fails, send email)."
date: "2026-09-13"
tags: ["architecture", "backend", "queues", "redis", "node"]
author: "Adam Abdel-Djamal"
readingTime: 7
featured: false
slug: "multi-channel-notification-engine"
---

Sending an email or SMS directly inside an HTTP request handler (`await sendEmail(...)`) is an accident waiting to happen. If the third-party email API hangs for 10 seconds, your user's checkout button hangs for 10 seconds.

Worse, users have different communication preferences: some want order updates via WhatsApp or SMS, while others prefer email. If an SMS fails to deliver due to carrier issues, how does your system automatically fall back to email?

In this article, we'll architect a **resilient, decoupled multi-channel notification engine** powered by Redis job queues and prioritized channel dispatchers.

---

## 1. High-Level Event-Driven Architecture

Instead of coupling application features to specific notification providers, the application emits an abstract domain event:

```text
[Order Service] ──► Emits Event: "order.placed"
                          │
                          ▼
             [Notification Queue (Redis / BullMQ)]
                          │
                          ▼
            [Notification Worker Processor]
             1. Load User Channel Preferences (Email? SMS? Push?)
             2. Check Rate Limits & Do-Not-Disturb Quiet Hours
             3. Render Channel-Specific Templates
             4. Dispatch with Fallback Escalation
```

---

## 2. Defining Channel Priority and Fallback Logic

Not all channels carry the same urgency or cost:
- **Web Push / In-App Notification**: Free, instantaneous, but only works if the user is online.
- **Email**: Very low cost ($0.0001), high reliability, ideal for receipts and long-form details.
- **SMS / WhatsApp**: High cost ($0.03 - $0.08), high open rate, reserved for critical alerts (2FA codes, payment failures).

### Fallback Matrix Example:
```typescript
interface NotificationPayload {
  userId: string
  event: 'payment.failed' | 'order.delivered' | 'security.login_alert'
  channels: Array<'push' | 'sms' | 'email'>
  data: Record<string, any>
}
```

If the primary channel (`push`) does not receive a delivery confirmation within 60 seconds, the worker automatically queues an escalation job to the fallback channel (`email` or `sms`).

---

## 3. Worker Implementation with BullMQ & Redis

```typescript
import { Worker, Queue } from 'bullmq'
import { sendPushNotification } from './providers/webpush'
import { sendEmailNotification } from './providers/resend'
import { sendSmsNotification } from './providers/twilio'

export const notificationQueue = new Queue('notifications', {
  connection: { host: 'localhost', port: 6379 }
})

export const notificationWorker = new Worker('notifications', async (job) => {
  const { userId, event, channel, payload, attempt = 1 } = job.data
  const user = await db.users.findById(userId)

  // Check user channel preferences and quiet hours
  if (!user.notificationsEnabled || !user.preferredChannels.includes(channel)) {
    return { skipped: true, reason: 'user_opt_out' }
  }

  try {
    switch (channel) {
      case 'push':
        return await sendPushNotification(user.pushSubscription, payload)
      case 'email':
        return await sendEmailNotification(user.email, payload)
      case 'sms':
        return await sendSmsNotification(user.phone, payload)
    }
  } catch (error) {
    console.error(`Failed sending via ${channel}. Initiating fallback...`, error)

    // Fallback escalation logic
    if (channel === 'sms') {
      await notificationQueue.add('fallback-email', {
        userId,
        event,
        channel: 'email',
        payload: { ...payload, note: 'Sent via email because SMS failed.' }
      })
    }
    throw error
  }
}, {
  connection: { host: 'localhost', port: 6379 },
  limiter: {
    max: 100, // Maximum 100 notifications dispatched per second to respect provider rate limits
    duration: 1000
  }
})
```

---

## 4. Architectural Rules for Production

1. **Idempotency on Notifications**: Add an `idempotencyKey` like `order_paid_12345_email`. If your worker restarts, BullMQ will never send duplicate emails to the customer.
2. **Global Unsubscribe & Suppression Lists**: Always check against hard bounces and unsubscribed tags before invoking outbound network calls.
3. **Template Versioning**: Keep email and SMS templates in version control rather than editing HTML in third-party dashboards.
