# 1436. Destination City

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/destination-city](https://leetcode.com/problems/destination-city)
**Companies:** Amazon, Meta, Yandex, Yelp

---

## Problem Description

Given a list of `[cityA, cityB]` paths, find the destination city (a city that is never a source).

---

## Approach

```
FUNCTION destCity(paths):
    sources = SET(p[0] for p in paths)
    FOR p IN paths:
        IF p[1] NOT IN sources: RETURN p[1]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Set of sources, then find any destination not in the set. The destination city has no outgoing edge — it only appears as `p[1]`, never as `p[0]`.**
