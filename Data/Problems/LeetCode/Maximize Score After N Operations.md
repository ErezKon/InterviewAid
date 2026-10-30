# 1799. Maximize Score After N Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-score-after-n-operations](https://leetcode.com/problems/maximize-score-after-n-operations)
**Companies:** Sprinklr

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Bitmask DP — O(2ⁿ · n²)](#approach-bitmask-dp--o2ⁿ--n²-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given `nums`, an array of positive integers of size `2 * n`. You must perform `n` operations on this array.

In the `i^th` operation **(1-indexed)**, you will:

- Choose two elements, `x` and `y`.
- Receive a score of `i * gcd(x, y)`.
- Remove `x` and `y` from `nums`.

Return *the maximum score you can receive after performing *`n`* operations.*

The function `gcd(x, y)` is the greatest common divisor of `x` and `y`.

**Constraints:**
- `1 <= n <= 7`
- `nums.length == 2 * n`
- `1 <= nums[i] <= 10^6`

---

## Examples

**Example 1:**
```
Input: nums = [1,2]
Output: 1
Explanation: The optimal choice of operations is:
(1 * gcd(1, 2)) = 1
```

**Example 2:**
```
Input: nums = [3,4,6,8]
Output: 11
Explanation: The optimal choice of operations is:
(1 * gcd(3, 6)) + (2 * gcd(4, 8)) = 3 + 8 = 11
```

**Example 3:**
```
Input: nums = [1,2,3,4,5,6]
Output: 14
Explanation: The optimal choice of operations is:
(1 * gcd(1, 5)) + (2 * gcd(2, 4)) + (3 * gcd(3, 6)) = 1 + 4 + 9 = 14
```

---

## Key Insight

> With at most 14 elements, use **bitmask DP**. State = bitmask of used elements. For each state, determine the operation number from `popcount(mask) / 2`, try all pairs of unused elements, and take the maximum.

---

## Approach: Bitmask DP — O(2ⁿ · n²) ✅

```
FUNCTION maxScore(nums):
    n = len(nums)
    // Precompute GCDs
    gcdTable[i][j] = GCD(nums[i], nums[j]) for all pairs

    dp = [0] * (1 << n)
    FOR mask ← 0 TO (1 << n) - 1:
        opNum = popcount(mask) / 2 + 1
        IF popcount(mask) is odd: CONTINUE    // must pick pairs
        FOR i ← 0 TO n - 1:
            IF i used in mask: CONTINUE
            FOR j ← i + 1 TO n - 1:
                IF j used in mask: CONTINUE
                newMask = mask | (1 << i) | (1 << j)
                dp[newMask] = MAX(dp[newMask], dp[mask] + opNum * gcdTable[i][j])

    RETURN dp[(1 << n) - 1]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Bitmask DP | **O(2ⁿ · n²)** | O(2ⁿ) |

With n ≤ 14: 2¹⁴ = 16384 states × 14² = 196 pairs ≈ 3.2M operations.

---

## Key Takeaway

> **Small n (≤ 14-20) signals bitmask DP.** The bitmask tracks which elements have been used; the operation number is derived from the popcount. Precompute pairwise GCDs to avoid redundant computation.
