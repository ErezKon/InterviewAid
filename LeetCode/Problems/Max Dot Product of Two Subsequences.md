# 1458. Max Dot Product of Two Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/max-dot-product-of-two-subsequences](https://leetcode.com/problems/max-dot-product-of-two-subsequences)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP — O(mn)](#approach-dp--omn-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two arrays `nums1` and `nums2`, return the **maximum dot product** between non-empty subsequences of `nums1` and `nums2` with the same length.

A subsequence of an array is a new array formed by deleting some (possibly none) elements without changing the relative order. The dot product of two subsequences `[a₁,a₂,...,aₖ]` and `[b₁,b₂,...,bₖ]` is `a₁·b₁ + a₂·b₂ + ... + aₖ·bₖ`.

**Constraints:**
- `1 ≤ nums1.length, nums2.length ≤ 500`
- `-1000 ≤ nums1[i], nums2[j] ≤ 1000`

---

## Examples

**Example 1:**
```
Input:  nums1 = [2,1,-2,5], nums2 = [3,0,-6]
Output: 18
Explanation: Subsequence [2,-2] from nums1, [3,-6] from nums2 → 2·3 + (-2)·(-6) = 6 + 12 = 18
```

**Example 2:**
```
Input:  nums1 = [3,-2], nums2 = [2,-6,7]
Output: 21
Explanation: Subsequence [3] from nums1, [7] from nums2 → 3·7 = 21
```

**Example 3:**
```
Input:  nums1 = [-1,-1], nums2 = [1,1]
Output: -1
Explanation: Must pick at least one pair; best is (-1)·(1) = -1
```

---

## Key Insight

> This is a variant of **Longest Common Subsequence (LCS)** but instead of counting matches, we **sum products** and maximize. `dp[i][j]` represents the max dot product using elements from `nums1[0..i]` and `nums2[0..j]`. At each `(i, j)` we decide: pair `nums1[i]` with `nums2[j]` (possibly extending a previous pairing), or skip one of them.

---

## Approach: DP — O(mn) ✅

Define `dp[i][j]` = max dot product considering `nums1[0..i]` and `nums2[0..j]`. Initialize to `-∞` to handle all-negative cases.

At each cell, consider four choices:
1. **Start fresh** with just `nums1[i] * nums2[j]`
2. **Extend** a previous pairing: `dp[i-1][j-1] + nums1[i] * nums2[j]`
3. **Skip nums1[i]**: `dp[i-1][j]`
4. **Skip nums2[j]**: `dp[i][j-1]`

```
FUNCTION maxDotProduct(nums1, nums2):
    m, n = len(nums1), len(nums2)
    dp = m × n of -infinity

    FOR i ← 0 TO m - 1:
        FOR j ← 0 TO n - 1:
            dp[i][j] = nums1[i] * nums2[j]
            IF i > 0 AND j > 0: dp[i][j] = MAX(dp[i][j], dp[i][j] + dp[i-1][j-1])
            IF i > 0: dp[i][j] = MAX(dp[i][j], dp[i-1][j])
            IF j > 0: dp[i][j] = MAX(dp[i][j], dp[i][j-1])
            IF i > 0 AND j > 0: dp[i][j] = MAX(dp[i][j], dp[i-1][j-1])

    RETURN dp[m-1][n-1]
```

---

## Walkthrough

```
nums1 = [2, 1, -2, 5],  nums2 = [3, 0, -6]
```

Key cells in the DP table:

| dp      | j=0 (3)  | j=1 (0)  | j=2 (-6) |
|---------|----------|----------|----------|
| i=0 (2) | 6        | 6        | 6        |
| i=1 (1) | 6        | 6        | 6        |
| i=2 (-2)| 6        | 6        | **18**   |
| i=3 (5) | 15       | 15       | 18       |

At `dp[2][2]`: `(-2)*(-6) = 12`, extend with `dp[1][1]=6` → `12+6 = 18`. This is the best.

**Result:** 18 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP (2D table) | **O(m·n)** | O(m·n) |
| DP (space-optimized) | O(m·n) | O(n) |

Space can be reduced to O(n) by keeping only the previous row.

---

## Follow-Up Questions

**Q1: How does this differ from LCS?**
LCS counts matching pairs; here we sum products and the "score" of pairing can be negative, so the DP must allow skipping poor pairings.

**Q2: Why initialize with `-∞` instead of 0?**
Because the subsequences must be non-empty. Initializing with 0 would allow "picking nothing" as a valid answer, which is incorrect for all-negative inputs.

**Q3: Can this be solved greedily?**
No — choosing locally optimal pairings doesn't guarantee the global optimum because pairing elements affects which future pairings are available.

---

## Key Takeaway

> **Max dot product of subsequences is an LCS-style DP where the "match score" is the product of paired elements.** The key subtlety is initializing with `-∞` to enforce non-empty subsequences.
