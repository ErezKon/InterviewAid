# 368. Largest Divisible Subset

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-divisible-subset](https://leetcode.com/problems/largest-divisible-subset)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP (like LIS) — O(n²) ✅](#3-approach-dp-like-lis--on²-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Find the largest subset where every pair `(si, sj)` satisfies `si % sj == 0` or `sj % si == 0`.

---

## 2. Key Insight

Sort the array. If `a | b` and `b | c`, then `a | c` (transitivity). So we only need to check divisibility with the last element in the chain — exactly like **Longest Increasing Subsequence** but with divisibility.

---

## 3. Approach: DP (like LIS) — O(n²) ✅

```
FUNCTION largestDivisibleSubset(nums):
    SORT nums
    n = len(nums)
    dp = [1] * n
    parent = [-1] * n

    FOR i ← 1 TO n - 1:
        FOR j ← 0 TO i - 1:
            IF nums[i] % nums[j] == 0 AND dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j

    // Reconstruct from max
    idx = argmax(dp)
    result = []
    WHILE idx != -1:
        result.ADD(nums[idx])
        idx = parent[idx]

    RETURN REVERSE(result)
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n²) | LIS-like double loop |
| Space | O(n) | DP + parent arrays |

---

## 5. Key Takeaway

> Sort + LIS-style DP with divisibility instead of `<`. Transitivity of divisibility in sorted order means checking only against the chain's last element is sufficient. Reconstruct via parent pointers.
