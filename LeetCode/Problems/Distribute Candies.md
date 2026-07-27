# 575. Distribute Candies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/distribute-candies](https://leetcode.com/problems/distribute-candies)
**Companies:** Bloomberg, Google, Liveramp

---

## Problem Description

Alice has `n` candies (n is even). She can eat `n/2` of them. Each candy has a type in `candyType[i]`. Return the **maximum number of different types** she can eat.

---

## Key Insight

> She can eat at most `n/2` candies. The max variety = `min(unique types, n/2)`.

---

## Approach: Set + Min ✅

```
FUNCTION distributeCandies(candyType):
    RETURN MIN(len(candyType) / 2, len(SET(candyType)))
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Build set |
| **Space** | O(n) | Set storage |

---

## Key Takeaway

> **Maximum variety with a budget constraint = min(distinct items, budget). One line with a set.**
