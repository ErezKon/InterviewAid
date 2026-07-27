# 479. Largest Palindrome Product

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/largest-palindrome-product](https://leetcode.com/problems/largest-palindrome-product)
**Companies:** Yahoo

---

## 1. Problem Description

Find the largest palindrome made from the product of two `n`-digit numbers. Return it mod 1337.

---

## 2. Approach: Construct Palindromes Top-Down ✅

```
FUNCTION largestPalindrome(n):
    IF n == 1: RETURN 9
    upper = 10^n - 1
    lower = 10^(n-1)

    FOR firstHalf ← upper DOWN TO lower:
        palindrome = buildPalindrome(firstHalf)
        FOR i ← upper DOWN TO sqrt(palindrome):
            IF palindrome % i == 0 AND palindrome / i <= upper:
                RETURN palindrome % 1337
    RETURN 0

FUNCTION buildPalindrome(half):
    RETURN int(str(half) + reverse(str(half)))
```

| Time | Space |
|------|-------|
| O(10^n) worst case | O(1) |

---

## 3. Key Takeaway

> Enumerate palindromes from largest down by constructing from the upper half. For each palindrome, check if it factors into two n-digit numbers.
