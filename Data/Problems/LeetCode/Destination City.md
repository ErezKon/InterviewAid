# 1436. Destination City

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/destination-city](https://leetcode.com/problems/destination-city)
**Companies:** Amazon, Meta, Yandex, Yelp

---

## Problem Description

Given a list of `[cityA, cityB]` paths, find the destination city (a city that is never a source).

---

## Examples

| Input | Output |
|-------|--------|
| `[["London","New York"],["New York","Lima"]]` | `"Lima"` |
| `[["A","B"],["B","C"],["C","D"]]` | `"D"` |

*Explanation*: The city that never appears as a source is the destination.

---

## Approach

```
FUNCTION destCity(paths):
    SET sources ← SET()
    FOR each p IN paths:
        ADD p[0] TO sources
    FOR each p IN paths:
        IF p[1] NOT IN sources:
            RETURN p[1]
```

---

## Walkthrough

**Step‑by‑step for the first example:**

1. Build `sources = {"London", "New York"}`.
2. Iterate paths again:
   - `("London","New York")`: destination "New York" is in `sources` → continue.
   - `("New York","Lima")`: destination "Lima" not in `sources` → return "Lima".

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – one pass to collect sources, another to find the destination |
| **Space** | O(n) – storing the set of source cities |

---

## Follow-Up Questions

1. How would you solve this if the input were a huge stream of paths that cannot fit in memory?
2. Can you modify the algorithm to return the entire itinerary order from start to destination?

---

## Key Takeaway

> **Set of sources, then find any destination not in the set. The destination city has no outgoing edge — it only appears as `p[1]`, never as `p[0]`.**
