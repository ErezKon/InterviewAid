# 3260. Find the Largest Palindrome Divisible by K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-largest-palindrome-divisible-by-k](https://leetcode.com/problems/find-the-largest-palindrome-divisible-by-k)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy Digit Construction — O(n) ✅](#3-approach-greedy-digit-construction--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given integers `n` and `k`, find the **largest** `n`-digit palindrome divisible by `k`. Return it as a string. A palindrome reads the same forwards and backwards.

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= k <= 9`

---

## 2. Key Insight

> Construct the palindrome greedily from the outermost digits inward, choosing the largest possible digit (9 down to 0) at each position. For each candidate, check divisibility using modular arithmetic on the contribution of symmetric positions. Different values of k have different structural patterns.

---

## 3. Approach: Greedy Digit Construction — O(n) ✅

```
FUNCTION largestPalindrome(n, k):
    // For most k values, all-9 palindromes work (k=1,3,9)
    // For k=2,4,8: constrain last digit(s) to be even/divisible
    // For k=5: last digit must be 0 or 5
    // For k=6: combine k=2 and k=3 constraints
    // For k=7: use DP on remainder for each symmetric digit pair

    digits ← array of n, all set to 9
    // Apply constraints based on k
    // Mirror: digits[i] = digits[n-1-i]
    // Adjust to maximize while maintaining divisibility

    RETURN JOIN(digits)
```

For k ∈ {1,3,9}: answer is all 9s. For k=2: last digit = 8. For k=5: last digit = 5. For k=7: requires DP on remainders.

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — construct digit by digit |
| **Space** | O(n) — result string |

---

## 5. Key Takeaway

> **Case-by-case greedy construction** works because k ≤ 9. For most k values, simple digit constraints suffice. Only k=7 requires modular DP due to its prime-and-no-simple-divisibility-rule nature.
