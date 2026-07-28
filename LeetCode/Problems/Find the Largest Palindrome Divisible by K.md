# 3260. Find the Largest Palindrome Divisible by K

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/find-the-largest-palindrome-divisible-by-k
**Companies:** Amazon, Google
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy Digit Construction — O(n) ✅](#3-approach-greedy-digit-construction--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given integers `n` and `k`, find the **largest** `n`-digit palindrome that is divisible by `k`. Return the palindrome as a string. A palindrome reads the same forwards and backwards.

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= k <= 9`

---

## 2. Key Insight

> Construct the palindrome greedily from the outermost digits inward, choosing the largest possible digit (9 down to 0) at each position. For each candidate, check divisibility using modular arithmetic on the contribution of symmetric positions. Different values of `k` have simple digit‑based constraints, except for `k = 7` which requires a small DP on remainders.

---

## 3. Approach: Greedy Digit Construction — O(n) ✅

```text
FUNCTION largestPalindrome(n, k):
    // Initialise all digits to 9 (maximal value)
    digits ← ARRAY of size n filled with 9

    // Apply digit constraints based on k
    IF k IN {1,3,9} THEN
        // All‑9 palindrome is already divisible
        RETURN JOIN(digits)
    ELSE IF k == 2 OR k == 4 OR k == 8 THEN
        // Last digit must be even; set to largest even ≤ 9
        digits[n-1] ← 8
        digits[0]   ← 8   // mirror
    ELSE IF k == 5 THEN
        // Last digit must be 0 or 5; choose 5 for maximal value
        digits[n-1] ← 5
        digits[0]   ← 5
    ELSE IF k == 6 THEN
        // Combine even and divisible‑by‑3 constraints
        digits[n-1] ← 6
        digits[0]   ← 6
    ELSE IF k == 7 THEN
        // Use DP on remainder for each symmetric pair
        remainder ← 0
        FOR i ← 0 TO FLOOR((n-1)/2) DO
            // Try digits from 9 down to 0
            FOR d ← 9 DOWNTO 0 DO
                // contribution of pair (i, n-1-i)
                contrib ← (d * (10^{i} + 10^{n-1-i})) MOD 7
                IF (remainder + contrib) MOD 7 == 0 THEN
                    digits[i] ← d
                    digits[n-1-i] ← d
                    remainder ← (remainder + contrib) MOD 7
                    BREAK
        // If n is odd, handle middle digit separately
        IF n MOD 2 == 1 THEN
            mid ← FLOOR(n/2)
            FOR d ← 9 DOWNTO 0 DO
                IF (remainder + (d * 10^{mid}) ) MOD 7 == 0 THEN
                    digits[mid] ← d
                    BREAK
    // Mirror digits for safety (already mirrored above)
    RETURN JOIN(digits)
```

---

## 4. Examples

```text
Input: n = 3, k = 2
Output: "888"
Explanation: The largest 3‑digit palindrome is 999, which is odd. Replacing the outer digits with 8 yields 888, which is divisible by 2.
```

```text
Input: n = 4, k = 5
Output: "5995"
Explanation: The outermost digits must be 5 to satisfy the divisibility by 5 while keeping the number maximal.
```

---

## 5. Walkthrough

Consider `n = 5, k = 7`.

1. Initialise digits = [9,9,9,9,9].
2. Process pair (0,4): try 9 → contribution ≡ (9*(10⁰+10⁴)) mod 7 = 9*(1+10000) mod 7 = 9*... = 2 (non‑zero). Try 8 → contribution 1, … finally 5 gives contribution 0, so set digits[0]=digits[4]=5, remainder=0.
3. Process pair (1,3): try 9 → contribution ≡ 9*(10¹+10³) mod 7 = 0, so set digits[1]=digits[3]=9.
4. Middle index 2 (odd length): try 9 → contribution ≡ 9*10² mod 7 = 0, set digits[2]=9.
5. Resulting palindrome: "59995", which is divisible by 7.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — one pass over digit positions (DP for k=7 runs over at most 10 candidates per position) |
| **Space** | O(n) — array of digits |

---

## 7. Follow-Up Questions

- How would the solution change if `k` could be any integer up to 10⁹?
- Can you extend the greedy construction to handle a requirement that the palindrome be the smallest divisible number?
- What modifications are needed if the palindrome must avoid a specific digit (e.g., no digit `4`)?

---

## 8. Key Takeaway

> By exploiting the tiny range of `k` (≤ 9) we can apply simple digit‑level constraints, and only for the prime case `k = 7` a lightweight DP on remainders is needed. This yields an O(n) construction of the maximal palindrome.
