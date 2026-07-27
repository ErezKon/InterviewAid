# 3448. Count Substrings Divisible By Last Digit

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-substrings-divisible-by-last-digit](https://leetcode.com/problems/count-substrings-divisible-by-last-digit)
**Companies:** Google

---

## Problem Description

Given a digit string `s`, count substrings where the numeric value of the substring is divisible by its last digit.

---

## Key Insight

For each ending position `j`, the last digit `d = s[j]`. We need substrings `s[i..j]` where the number formed is divisible by `d`. Track running remainders mod `d` as you extend substrings leftward, or use prefix-based modular arithmetic.

Since `d` ranges from 1-9, handle each divisor separately with modular prefix sums.

---

## Approach

```
FUNCTION countSubstrings(s):
    n = LENGTH(s)
    result = 0

    FOR d ← 1 TO 9 DO
        // Count substrings ending with digit d, divisible by d
        // Track prefix values mod d
        freqMod = [0] * d
        prefixMod = 0
        FOR j ← 0 TO n - 1 DO
            prefixMod = (prefixMod * 10 + INT(s[j])) % d
            IF INT(s[j]) == d:
                // Substring s[i..j] has value = (prefix[j] - prefix[i-1]*10^(j-i+1))
                // Needs careful modular arithmetic
                result += freqMod[prefixMod]
                IF prefixMod == 0: result += 1
            // Update freq based on current position's digit
            // ... (detailed implementation requires power tracking)

    RETURN result
```

*Note: Full implementation requires careful handling of 10^k mod d for each divisor.*

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(9 × n) = O(n) |
| **Space** | O(9) = O(1) |

---

## Key Takeaway

> **Substring divisibility by the last digit: enumerate divisors 1-9 separately, use modular prefix sums. The small divisor range (1-9) keeps the approach efficient.**
