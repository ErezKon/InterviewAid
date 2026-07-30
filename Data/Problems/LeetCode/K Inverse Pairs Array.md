# 629. K Inverse Pairs Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/k-inverse-pairs-array](https://leetcode.com/problems/k-inverse-pairs-array)
**Companies:** Google, Meta, Microsoft, Works Applications

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP + Prefix Sum — O(nk) ✅](#4-approach-dp--prefix-sum--onk-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given `n` and `k`, find the number of arrays of `[1..n]` that contain exactly `k` **inverse pairs** (pairs `(i,j)` where `i < j` and `a[i] > a[j]`). Return modulo 10⁹+7.

**Constraints:**
- `1 <= n <= 1000`
- `0 <= k <= 1000`

---

## 2. Examples

```
Input: n = 3, k = 0 → Output: 1 ([1,2,3])
Input: n = 3, k = 1 → Output: 2 ([1,3,2], [2,1,3])
```

---

## 3. Key Insight

Placing number `i` at position `p` in the array creates `i-1-p` new inverse pairs. `dp[i][j]` = # permutations of `[1..i]` with exactly `j` inverse pairs. The recurrence sums over `dp[i-1][j-x]` for `x in [0, i-1]`, optimized with **prefix sums**.

---

## 4. Approach: DP + Prefix Sum — O(nk) ✅

```
FUNCTION kInversePairs(n, k):
    MOD = 10^9 + 7
    dp = [0] * (k + 1)
    dp[0] = 1

    FOR i ← 2 TO n:
        newDp = [0] * (k + 1)
        prefix = [0] * (k + 2)
        FOR j: prefix[j+1] = prefix[j] + dp[j]

        FOR j ← 0 TO k:
            newDp[j] = (prefix[j+1] - prefix[MAX(0, j - i + 1)]) % MOD

        dp = newDp

    RETURN dp[k] % MOD
```

---

## 5. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n·k) | Two nested loops with O(1) prefix sum lookup |
| Space | O(k) | 1D DP array + prefix array |

---

## 6. Key Takeaway

> The recurrence `dp[i][j] = sum(dp[i-1][j-x])` for x in [0,i-1] is a classic sliding window sum, efficiently computed with **prefix sums** to avoid an inner loop. This reduces O(n·k²) to O(n·k).
