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

You are given a positive integer `n` representing an `n x n` cargo deck on a ship. Each cell on the deck can hold one container with a weight of **exactly** `w`.

However, the total weight of all containers, if loaded onto the deck, must not exceed the ship's maximum weight capacity, `maxWeight`.

Return the **maximum** number of containers that can be loaded onto the ship.

**Constraints:**
- `1 <= n <= 1000`
- `1 <= w <= 1000`
- `1 <= maxWeight <= 10^9`

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
Input: n = 2, w = 3, maxWeight = 15
Output: 4
Explanation: The deck has 4 cells, and each container weighs 3. The total weight of loading all containers is 12, which does not exceed maxWeight.
```

**Example 2:**
```
Input: n = 3, w = 5, maxWeight = 20
Output: 4
Explanation: The deck has 9 cells, and each container weighs 5. The maximum number of containers that can be loaded without exceeding maxWeight is 4.
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
