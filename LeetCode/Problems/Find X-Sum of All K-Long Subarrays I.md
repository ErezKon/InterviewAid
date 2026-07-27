# 3318. Find X-Sum of All K-Long Subarrays I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-i](https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Brute Force per Window — O(n · k log k) ✅](#3-approach-brute-force-per-window)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

For each window of size `k`, compute the **x-sum**: sum of `val × freq` for the top-x most frequent elements (ties broken by value).

**Constraints:**
- `1 <= k <= n <= 50`

---

## 2. Key Insight

> With small constraints, count frequencies per window, sort by (frequency, value) descending, take top x entries, and sum their contributions.

---

## 3. Approach: Brute Force per Window — O(n · k log k) ✅

```
FUNCTION findXSum(nums, k, x):
    result = []
    FOR i ← 0 TO n - k:
        window = nums[i:i+k]
        count = Counter(window)
        top = sorted(count.items(), key=lambda p: (p[1], p[0]), reverse=True)[:x]
        result.ADD(SUM(val * freq for val, freq in top))
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k log k) |
| **Space** | O(k) |

---

## 5. Key Takeaway

> For small constraints, brute force with sorting works. The Hard version (Part II) requires a sliding window with ordered sets for efficiency.
