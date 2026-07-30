# 3492. Maximum Containers on a Ship

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-containers-on-a-ship](https://leetcode.com/problems/maximum-containers-on-a-ship)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Math — O(1)](#approach-math--o1-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A ship has `n × n` cells. Each container weighs `w` units. The ship has a max weight limit `maxWeight`. Find the maximum number of containers that fit.

---

## Key Insight

> Total capacity = n² cells. Weight limit = `maxWeight // w` containers. Answer = `min(n², maxWeight // w)`.

---

## Approach: Math — O(1) ✅

```text
FUNCTION maxContainers(n, w, maxWeight):
    // compute space limit and weight limit
    spaceLimit ← n * n
    weightLimit ← maxWeight // w
    RETURN MIN(spaceLimit, weightLimit)
```

---

## Examples

**Example 1:**
```
Input: n = 3, w = 2, maxWeight = 20
Output: 9
Explanation: Ship has 9 cells. Weight limit allows 10 containers, but only 9 cells are available.
```

**Example 2:**
```
Input: n = 4, w = 5, maxWeight = 30
Output: 6
Explanation: Space limit = 16, weight limit = 6, so answer is 6.
```

---

## Walkthrough

| Step | n | w | maxWeight | spaceLimit | weightLimit | answer |
|------|---|---|-----------|------------|-------------|--------|
| 1 | 3 | 2 | 20 | 9 | 10 | MIN(9,10)=9 |
| 2 | 4 | 5 | 30 | 16 | 6 | MIN(16,6)=6 |

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Math | **O(1)** | O(1) |

---

## Follow-Up Questions

1. How would you handle varying container sizes instead of uniform weight?
2. What if the ship layout has blocked cells that cannot hold containers?

---

## Key Takeaway

> **Simple capacity problem: min of space limit and weight limit.**
