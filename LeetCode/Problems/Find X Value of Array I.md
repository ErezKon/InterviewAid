# 3524. Find X Value of Array I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-x-value-of-array-i](https://leetcode.com/problems/find-x-value-of-array-i)
**Companies:** Rubrik

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP on Prefix Product Remainders — O(n · k) ✅](#3-approach-dp-on-prefix-product-remainders)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given array `nums` and integer `k`, for each `x` from 0 to k-1, count subsequences whose product mod k equals x.

**Constraints:**
- `1 <= n <= 1000`
- `1 <= k <= 50`

---

## 2. Key Insight

> Track DP over product remainders mod k. For each element, update the remainder counts by multiplying existing subsequence products by the new element.

---

## 3. Approach: DP on Prefix Product Remainders — O(n · k) ✅

```
FUNCTION findXValue(nums, k):
    dp ← array of k zeros; dp[1 % k] ← 1 (empty product)
    result ← array of k zeros

    FOR num IN nums DO
        newDp ← array of k zeros
        FOR r ← 0 TO k - 1 DO
            IF dp[r] > 0 THEN
                newDp[(r * num) % k] += dp[r]
        // Record counts for this prefix
        dp ← newDp

    RETURN result based on dp
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k) |
| **Space** | O(k) |

---

## 5. Key Takeaway

> **DP on product remainders** — track how many subsequences have each remainder mod k. Transition multiplies the remainder by the new element mod k.
