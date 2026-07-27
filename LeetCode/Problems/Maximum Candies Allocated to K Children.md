# 2226. Maximum Candies Allocated to K Children

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-candies-allocated-to-k-children](https://leetcode.com/problems/maximum-candies-allocated-to-k-children)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Binary Search on Answer — O(n log max)](#approach-binary-search-on-answer--on-log-max-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given piles of `candies` and `k` children, split piles into sub-piles of equal size and distribute to children. Maximize the number of candies each child gets.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ k ≤ 10¹²`

---

## Key Insight

> Binary search on the candy amount per child. For a candidate `mid`, each pile contributes `pile // mid` children. If total ≥ k, `mid` is feasible.

---

## Approach: Binary Search on Answer — O(n log max) ✅

```
FUNCTION maximumCandies(candies, k):
    lo, hi = 1, MAX(candies)

    WHILE lo <= hi:
        mid = (lo + hi) / 2
        children = SUM(c // mid for c in candies)
        IF children >= k:
            lo = mid + 1
        ELSE:
            hi = mid - 1

    RETURN hi
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search | **O(n log max)** | O(1) |

---

## Key Takeaway

> **"Maximize the minimum allocation" = binary search on the answer.** For each candidate, greedily check feasibility by summing `pile // candidate`.
