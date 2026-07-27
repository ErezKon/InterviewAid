# 3149. Find the Minimum Cost Array Permutation

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-cost-array-permutation](https://leetcode.com/problems/find-the-minimum-cost-array-permutation)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask DP — O(n² · 2ⁿ) ✅](#3-approach-bitmask-dp--on²--2ⁿ-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array `nums` of size `n` (permutation of 0..n-1), find the permutation `perm` of 0..n-1 that minimizes `Σ|perm[i] - nums[perm[(i+1) % n]]|`. Return the lexicographically smallest such permutation.

**Constraints:**
- `2 <= n <= 14`

---

## 2. Key Insight

> With n ≤ 14, use bitmask DP. Fix `perm[0] = 0` (circular shift invariance). `dp[mask][last]` = min cost of placing the elements in `mask`, ending with `last`. Reconstruct the lexicographically smallest path.

---

## 3. Approach: Bitmask DP — O(n² · 2ⁿ) ✅

```
FUNCTION findPermutation(nums):
    n ← LENGTH(nums)
    dp ← 2ⁿ × n array of ∞
    dp[1][0] ← 0    // start with element 0

    FOR mask ← 1 TO 2ⁿ - 1 DO
        FOR last ← 0 TO n - 1 DO
            IF dp[mask][last] == ∞ THEN CONTINUE
            FOR next ← 0 TO n - 1 DO
                IF next NOT IN mask THEN
                    cost ← |last - nums[next]|
                    newMask ← mask | (1 << next)
                    dp[newMask][next] ← MIN(dp[newMask][next], dp[mask][last] + cost)

    // Find min cost completing the cycle back to perm[0]=0
    // Reconstruct lexicographically smallest path
    RETURN reconstructed permutation
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n² · 2ⁿ) |
| **Space** | O(n · 2ⁿ) |

---

## 5. Key Takeaway

> **Bitmask DP for small n** (≤ 14) with circular cost function. Fix element 0 at position 0 to break symmetry. Reconstruct greedily for lexicographic order.
