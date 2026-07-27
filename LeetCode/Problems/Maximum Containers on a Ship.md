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

```
FUNCTION maxContainers(n, w, maxWeight):
    RETURN MIN(n * n, maxWeight // w)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Math | **O(1)** | O(1) |

---

## Key Takeaway

> **Simple capacity problem: min of space limit and weight limit.**
