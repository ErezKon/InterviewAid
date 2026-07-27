# 2940. Find Building Where Alice and Bob Can Meet

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet](https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta

---

## Problem Description

Alice is at building `a`, Bob at building `b`. They can only move right to a taller building. Find the leftmost building where both can meet.

---

## Key Insight

> Simple cases: `a == b` → answer is `a`. If the rightmost person's building is taller → answer is `max(a,b)`. Otherwise, use offline processing: group unresolved queries by right endpoint, sweep right with a monotonic stack to find the first building taller than `max(heights[a], heights[b])`.

---

## Approach: Monotonic Stack + Offline Queries — O(n log n) ✅

```
FUNCTION leftmostBuildingQueries(heights, queries):
    // Simple cases handled inline
    // Unresolved queries grouped by right endpoint
    // Sweep from right, maintain decreasing monotonic stack
    // Binary search stack for each query's height threshold

    FOR each query [a, b] (ensure a < b):
        IF a == b: answer = a
        ELSE IF heights[b] > heights[a]: answer = b
        ELSE: add to pending[b]  // need to find taller building right of b

    // Process pending with monotonic stack from right to left
    // Binary search for first height > threshold
```

---

## Key Takeaway

> **Offline query processing + monotonic stack. Handle easy cases first, batch hard cases by position, resolve with decreasing stack and binary search.**
