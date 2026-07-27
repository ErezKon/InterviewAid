# 2560. House Robber IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/house-robber-iv](https://leetcode.com/problems/house-robber-iv)
**Companies:** Amazon, Arcesium, Bloomberg, Cashfree, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Binary Search on Answer — O(n log max) ✅](#3-approach-binary-search-on-answer)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Find the minimum "capability" (max value among robbed houses) needed to rob at least `k` non-adjacent houses.

---

## 2. Key Insight

> Binary search on the capability. For a given cap, greedily check if we can pick ≥ k non-adjacent houses with value ≤ cap.

---

## 3. Approach: Binary Search on Answer — O(n log max) ✅

```
FUNCTION minCapability(nums, k):
    lo, hi = MIN(nums), MAX(nums)

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF canRob(nums, k, mid):
            hi = mid
        ELSE:
            lo = mid + 1

    RETURN lo

FUNCTION canRob(nums, k, cap):
    count = 0; i = 0
    WHILE i < n:
        IF nums[i] <= cap:
            count += 1
            i += 2    // skip adjacent
        ELSE:
            i += 1
    RETURN count >= k
```

---

## 4. Key Takeaway

> **Binary search on answer** + greedy feasibility check. Classic "minimize the maximum" pattern with non-adjacency constraint.
