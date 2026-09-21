---
title: "Common Vue 3 Reactivity Traps: Avoiding Mistakes with ref, reactive, and Destructuring"
description: "Practical troubleshooting guide that receives constant daily search traffic from Vue & Nuxt developers struggling with lost reactivity and watchers."
date: "2026-09-16"
tags: ["vue", "nuxt", "javascript", "typescript", "frontend"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "vue3-reactivity-traps"
---

The Vue 3 Composition API is elegant, expressive, and predictable — until you accidentally lose reactivity by destructuring a prop or assigning a plain object to a reactive state.

Even experienced developers encounter subtle reactivity bugs that cause the UI not to update as expected. In this guide, we break down the **4 most common reactivity traps in Vue 3** and how to avoid them.

---

## 1. Trap #1: Destructuring Props or Reactive Objects

The most frequent mistake in Vue 3:

```typescript
// ❌ Destructuring breaks the reactive proxy connection!
const state = reactive({ count: 0, user: 'Adam' })
const { count, user } = state

// Incrementing count here will NOT trigger UI re-renders!
count++
```

### The Fix: `toRefs()` or `toRef()`
`toRefs` converts each property of a reactive object into an individual `ref` that preserves the connection to the source:

```typescript
// ✅ Reactivity preserved!
import { reactive, toRefs } from 'vue'

const state = reactive({ count: 0, user: 'Adam' })
const { count, user } = toRefs(state)

count.value++ // UI updates immediately!
```

---

## 2. Trap #2: Reassigning an Entire `reactive()` Object

If you define state with `reactive()`, reassigning the object replaces the proxy reference entirely:

```typescript
// ❌ Loses the original proxy tracked by the template
let userProfile = reactive({ name: 'Adam', role: 'Dev' })

async function loadUser() {
  const data = await fetchUser()
  userProfile = reactive(data) // 💥 The template is still watching the OLD proxy!
}
```

### The Fix: Use `ref()` or `Object.assign()`
```typescript
// ✅ Option A: Use ref (Recommended for objects that get replaced)
const userProfile = ref({ name: 'Adam', role: 'Dev' })
userProfile.value = await fetchUser()

// ✅ Option B: Mutate in-place
Object.assign(userProfile, await fetchUser())
```

---

## 3. Trap #3: Watching Deep Reactive State Without `{ deep: true }`

When watching a `ref` holding a nested object or array, Vue 3 defaults to a shallow watch:

```typescript
const filters = ref({ category: 'all', price: { min: 0, max: 100 } })

// ❌ Will NOT trigger when filters.value.price.max changes!
watch(filters, (newVal) => {
  console.log('Filters changed', newVal)
})

// ✅ Pass deep: true, or watch a getter function
watch(
  () => filters.value.price.max,
  (newMax) => console.log('Max price changed to', newMax)
)
```

---

## 4. Trap #4: Asynchronous Loss of Current Instance in Lifecycle Hooks

Accessing `useNuxtApp()`, `useRoute()`, or `inject()` after an `await` statement will fail with:
`[Vue warn]: injection "Symbol(...)" not found` or `Nuxt instance unavailable`.

```typescript
// ❌ WRONG: Calling composables AFTER an async boundary
const res = await fetchData()
const route = useRoute() // 💥 Throws error! Nuxt context lost after await.

// ✅ CORRECT: Always call composables synchronously at the top of <script setup>
const route = useRoute()
const res = await fetchData()
```
