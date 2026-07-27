# 3333. Find the Original Typed String II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-original-typed-string-ii](https://leetcode.com/problems/find-the-original-typed-string-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP + Combinatorics ✅](#3-approach-dp--combinatorics-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given typed `word` and minimum length `k`, count how many original strings of length ≥ `k` could have produced the typed word (each group of consecutive same chars can shrink to 1..L chars).

**Constraints:**
- `1 <= word.length <= 5 × 10⁴`
- `1 <= k <= 2 × 10⁵`

---

## 2. Key Insight

> Group consecutive identical characters. Each group of length `L` contributes 1 to L characters. Use DP over groups to count total strings, then subtract those of length < k. Total possible minus "too short" = answer.

---

## 3. Approach: DP + Combinatorics ✅

```
FUNCTION possibleStringCount(word, k):
    // Group consecutive same characters → groups of lengths [L1, L2, ...]
    // Total possible strings (any length) = product of all Li
    // Subtract strings of length < k using DP

    // dp[len] = number of ways to produce a string of exactly len characters
    // using the first i groups
    // Transition: for group of length L, add 1..L chars
    // Use prefix sums to optimize DP transitions

    total ← PRODUCT(Li for each group)
    tooShort ← SUM(dp[len] for len < k)
    RETURN (total - tooShort) MOD (10^9 + 7)
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k) or O(n + k) with prefix sum optimization |
| **Space** | O(k) |

---

## 5. Key Takeaway

> **Complementary counting**: compute total possible strings (product of group lengths), subtract those shorter than k using DP with prefix-sum optimization.
