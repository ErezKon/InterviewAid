# 639. Decode Ways II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/decode-ways-ii](https://leetcode.com/problems/decode-ways-ii)
**Companies:** Meta, Phonepe

---

## Problem Description

Like Decode Ways, but `*` can represent any digit 1-9. Count decodings modulo `10^9 + 7`.

---

## Key Insight

Same DP as Decode Ways but with multiplied possibilities. `*` as a single digit = 9 options. For two-digit decoding, enumerate valid combinations involving `*` (e.g., `1*` = 9 options for 11-19, `2*` = 6 options for 21-26).

---

## Approach

```
FUNCTION numDecodings(s):
    MOD = 10^9 + 7
    prev2 = 1; prev1 = (9 if s[0]=='*' else (0 if s[0]=='0' else 1))

    FOR i ← 1 TO len(s)-1:
        curr = 0
        // Single digit: s[i]
        IF s[i] == '*': curr += 9 * prev1
        ELSE IF s[i] != '0': curr += prev1

        // Two digits: s[i-1..i]
        // Handle all combinations of digits and '*'
        curr += twoDigitWays(s[i-1], s[i]) * prev2
        curr %= MOD
        prev2 = prev1; prev1 = curr

    RETURN prev1 % MOD
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Decode Ways II extends the base DP with wildcard case analysis. For each `*`, enumerate valid digit substitutions (1-9 for single, case-by-case for two-digit pairs).**
