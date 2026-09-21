---
title: "Mastering Core Web Vitals in 2026: Diagnosing and Fixing Interaction to Next Paint (INP)"
description: "INP officially replaced FID as Google's responsiveness metric. Explaining how to profile Long Tasks in Chrome DevTools and keep UI clicks feeling instant."
date: "2026-09-05"
tags: ["performance", "seo", "javascript", "vue", "frontend"]
author: "Adam Abdel-Djamal"
readingTime: 6
featured: false
slug: "mastering-core-web-vitals-inp"
---

In March 2024, Google permanently retired First Input Delay (FID) and replaced it with **Interaction to Next Paint (INP)** as a Core Web Vital.

While FID only measured the delay of the very first click on a page, **INP measures the responsiveness of EVERY single interaction** throughout the user's entire visit (clicking a button, opening a drawer, expanding a dropdown, typing in a form).

If your INP exceeds **200 milliseconds**, Google marks your site as "Needs Improvement" or "Poor", penalizing your organic search rankings. In this guide, we'll look at how to diagnose and fix INP issues in modern JavaScript applications.

---

## 1. The Anatomy of an Interaction

When a user clicks an interactive element, the browser goes through three distinct phases:

$$\text{INP Total Time} = \text{Input Delay} + \text{Processing Duration} + \text{Presentation Delay}$$

1. **Input Delay**: The time between the user clicking and your event handler actually starting execution (caused by the main thread being busy with background tasks).
2. **Processing Duration**: The time spent executing your JavaScript event handler code.
3. **Presentation Delay**: The time the browser takes to recalculate styles, perform layout rendering, and paint the new frame onto the screen.

---

## 2. Finding Long Tasks in Chrome DevTools

To track down what's blocking the main thread:

1. Open Chrome DevTools -> **Performance** tab.
2. Click **Record** and interact with the sluggish UI element (e.g. clicking a filter button).
3. Look at the **Interactions** lane at the top:
   - Yellow or red bars represent interactions taking >200ms.
4. Scroll down to the **Main** thread flame chart:
   - Any task longer than 50ms is flagged with a red triangle as a **Long Task**.

---

## 3. The 3 Most Common INP Fixes

### Fix 1: Yielding to the Main Thread with `scheduler.yield()`

If your click handler performs heavy work (like client-side sorting of 5,000 items), split the task and yield control back to the browser so it can render a loading state:

```typescript
async function handleFilterClick(category: string) {
  // 1. Immediately update visual feedback (e.g. active tab style)
  activeCategory.value = category

  // 2. Yield control to let the browser paint the active tab immediately!
  if ('scheduler' in window && 'yield' in (window as any).scheduler) {
    await (window as any).scheduler.yield()
  } else {
    await new Promise(resolve => setTimeout(resolve, 0))
  }

  // 3. Perform the heavy list computation
  filteredItems.value = expensiveFilter(allItems.value, category)
}
```

---

### Fix 2: Avoiding Forced Synchronous Layouts (Layout Thrashing)

Reading layout geometry (e.g., `element.offsetHeight`) immediately after writing styles causes the browser to forcefully recalculate the entire page layout mid-script:

```javascript
// ❌ Layout Thrashing (INP Nightmare)
boxes.forEach(box => {
  box.style.width = '200px' // Write
  const height = box.offsetHeight // Read forces immediate synchronous layout!
})

// ✅ Batch reads first, then writes
const heights = boxes.map(box => box.offsetHeight) // Batch reads
boxes.forEach(box => { box.style.width = '200px' }) // Batch writes
```

---

### Fix 3: Offloading Heavy Computation to Web Workers

For intensive tasks like CSV parsing, image resizing, or crypto calculations, offload them completely off the main thread into a Web Worker using libraries like Comlink. The UI stays 100% responsive at 60 FPS regardless of CPU load.
