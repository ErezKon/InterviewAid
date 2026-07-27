# 2367. Number of Arithmetic Triplets

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-arithmetic-triplets](https://leetcode.com/problems/number-of-arithmetic-triplets)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Set — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a strictly increasing array `nums` and integer `diff`, count triplets `(i, j, k)` where `nums[j] - nums[i] == diff` and `nums[k] - nums[j] == diff`.

---

## 2. Key Insight

> For each element `x`, check if `x - diff` and `x - 2*diff` exist in the set.

---

## 3. Approach: Hash Set — O(n) ✅

```
FUNCTION arithmeticTriplets(nums, diff):
    s = set(nums)
    count = 0
    FOR x IN nums:
        IF (x - diff) IN s AND (x - 2 * diff) IN s:
            count += 1
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Two lookback checks per element.** For arithmetic triplets with fixed difference, check `x - diff` and `x - 2*diff` in a hash set.
