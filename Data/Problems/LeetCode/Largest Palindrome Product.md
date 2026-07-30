# 479. Largest Palindrome Product

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/largest-palindrome-product](https://leetcode.com/problems/largest-palindrome-product)
**Companies:** Yahoo

---

## Problem Description

Given an integer `n`, find the largest palindrome made from the product of two `n`-digit numbers. Return the palindrome modulo 1337.

Constraints:
- `1 <= n <= 8`

---

## Examples

**Example 1:**
```
Input: n = 2
Output: 987
Explanation: The largest palindrome from the product of two 2‑digit numbers is 9009. 9009 % 1337 = 987.
```

**Example 2:**
```
Input: n = 1
Output: 9
Explanation: Single‑digit numbers, the largest palindrome is 9.
```

---

## Approach

**Construct Palindromes Top‑Down — O(10^n) worst case**

```text
FUNCTION largestPalindrome(n):
    IF n = 1:
        RETURN 9
    SET upper ← 10^n - 1            // Largest n‑digit number
    SET lower ← 10^(n-1)            // Smallest n‑digit number
    // Iterate possible first half of palindrome from high to low
    FOR firstHalf ← upper DOWN TO lower:
        SET palindrome ← buildPalindrome(firstHalf)
        // Check if palindrome can be factored into two n‑digit numbers
        FOR i ← upper DOWN TO SQRT(palindrome):
            IF palindrome MOD i = 0 AND palindrome / i <= upper:
                RETURN palindrome MOD 1337
    RETURN 0

FUNCTION buildPalindrome(half):
    // Mirror the digits of half to create an even‑length palindrome
    SET s ← TO_STRING(half)
    SET rev ← REVERSE(s)
    RETURN TO_INTEGER(s + rev)
```

---

## Walkthrough

For `n = 2`:
1. `upper = 99`, `lower = 10`.
2. Start with `firstHalf = 99` → palindrome = 9999.
3. Test divisors from 99 down to √9999 ≈ 99:
   - 9999 % 99 = 0 and 9999 / 99 = 101 (3‑digit) → not valid.
4. Decrement `firstHalf` to 98 → palindrome = 9889.
5. Check divisors: 9889 % 99 ≠ 0, … eventually `firstHalf = 91` gives palindrome 9119 which is divisible by 99 (9119/99 = 92). Both 99 and 92 are 2‑digit numbers, so return 9119 % 1337 = 987.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(10^n) worst case (iterating over possible halves) | O(1) |

---

## Follow‑Up Questions

1. How would the algorithm change if we needed the palindrome itself instead of modulo 1337?
2. Can you derive a mathematical shortcut to avoid checking every `firstHalf` for large `n`?

---

## Key Takeaway

Generate palindromes from the highest possible first half and test factorability; this top‑down construction quickly finds the largest palindrome product.
