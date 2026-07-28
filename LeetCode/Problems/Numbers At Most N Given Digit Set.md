# 902. Numbers At Most N Given Digit Set

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/numbers-at-most-n-given-digit-set](https://leetcode.com/problems/numbers-at-most-n-given-digit-set)
**Companies:** Amazon, Google, Microsoft, Tiktok

---

## Problem Description
Given an array `digits` of distinct characters representing a set of digits (each from `'1'` to `'9'`) and an integer `n`, return the count of positive integers that can be formed using only digits from the set and are **≤ n**. Numbers may have any length, but cannot contain leading zeros.

## Examples
| digits | n | Count |
|--------|---|-------|
| ["1","3","5","7"] | 100 | 20 |
| ["1","4","9"] | 1000000000 | 29523 |
| ["7"] | 9 | 1 |

## Approach
**Algorithm:** Digit DP – count numbers with fewer digits, then process the same‑length prefix of `n` digit by digit.

```text
FUNCTION atMostNGivenDigitSet(digits, n):
    SET s ← STRING(n)
    SET k ← LENGTH(s)               // number of digits in n
    SET d ← LENGTH(digits)          // size of digit set
    SET result ← 0

    // 1. Numbers with fewer digits than n
    FOR i ← 1 TO k-1:
        SET result ← result + d^i

    // 2. Numbers with exactly k digits
    FOR i ← 0 TO k-1:
        SET hasSame ← FALSE
        FOR each digit IN digits:
            IF digit < s[i]:
                SET result ← result + d^(k-1-i)
            ELSE IF digit == s[i]:
                SET hasSame ← TRUE
        IF NOT hasSame:
            RETURN result
    // n itself is valid
    RETURN result + 1
```

## Walkthrough
Take `digits = ["1","3","5","7"]`, `n = 100`:
1. `k = 3`, `d = 4`. Numbers with 1‑digit: `4` (1,3,5,7). 2‑digit: `4^2 = 16`. `result = 20`.
2. Process 3‑digit numbers: first digit of `n` is `'1'`. Digits smaller than `'1'` → none, `hasSame` true, continue.
3. Second digit `'0'`: no digit in set is `< '0'` and none equal, so `hasSame` false → return `20`.
Thus only the 20 numbers with ≤2 digits are counted.

## Complexity Analysis
- **Time:** O(k·d) where `k` is the number of digits in `n` (≤ 10) and `d` ≤ 9.
- **Space:** O(1) – only a few scalar variables.

## Follow‑Up Questions
- How would you modify the solution for a digit set that includes `'0'`?
- Can you extend the DP to handle a range `[low, high]` instead of `[1, n]`?
- What is the effect of allowing repeated use of digits versus using each at most once?

## Key Takeaway
Digit DP efficiently counts numbers ≤ n by separating shorter‑length counts and a digit‑by‑digit prefix comparison.
