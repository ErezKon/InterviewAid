# 3321. Find X-Sum of All K-Long Subarrays II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-ii](https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-ii)
**Companies:** Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window + Two Sorted Sets — O(n log n) ✅](#3-approach-sliding-window--two-sorted-sets)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Same as Part I but with larger constraints (`n, k ≤ 10⁵`). Efficiently compute the x-sum for each sliding window.

---

## 2. Key Insight

> Maintain two sorted sets: `top` (the x most frequent elements) and `rest` (the remaining). Track the running sum of the `top` set. When the window slides, update frequencies and rebalance between `top` and `rest`.

---

## 3. Approach: Sliding Window + Two Sorted Sets — O(n log n) ✅

```
FUNCTION findXSum(nums, k, x):
    // Use two sorted containers: top (size x) and rest
    // Key: (frequency, value) for ordering
    // Maintain running sum of top set

    // For each window slide:
    //   1. Remove outgoing element: update freq, move between sets
    //   2. Add incoming element: update freq, move between sets
    //   3. Rebalance: ensure top has exactly min(x, distinct) elements
    //   4. Record topSum
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — sorted set operations per slide |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Two sorted sets** (top-x and rest) with rebalancing on each slide gives O(log n) per window move, enabling efficient processing for large inputs.
