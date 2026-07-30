# 1416. Restore The Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/restore-the-array](https://leetcode.com/problems/restore-the-array)
**Companies:** Google, Postman

---

## Problem Description

Given a string `s` of digits and an integer `k`, return the number of ways to split `s` into a sequence of numbers where each number is in range `[1, k]` with **no leading zeros**. Return the count modulo `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `1 <= k <= 10^9`

---

## Examples

**Example 1:**
- **Input:** `s = "1000", k = 10000`
- **Output:** `1` (only "1000")

**Example 2:**
- **Input:** `s = "1000", k = 10`
- **Output:** `1` (only "1,0,0,0")

**Example 3:**
- **Input:** `s = "1317", k = 2000`
- **Output:** `8`

---

## Key Insight

> This is a **DP partitioning** problem. `dp[i]` = number of ways to split `s[i:]`. From each position `i`, try substrings of length 1 up to `len(str(k))` — valid if no leading zero and numeric value ≤ k.

---

## Approach

```
FUNCTION numberOfArrays(s, k)
    n ← LENGTH(s)
    MOD ← 10^9 + 7
    dp ← ARRAY[n + 1] initialized to 0
    dp[n] ← 1                                // empty suffix = 1 way

    FOR i ← n-1 DOWNTO 0 DO
        IF s[i] == '0' THEN CONTINUE          // no leading zeros

        num ← 0
        FOR j ← i TO n-1 DO
            num ← num * 10 + DIGIT(s[j])
            IF num > k THEN BREAK
            dp[i] ← (dp[i] + dp[j+1]) MOD MOD
        END FOR
    END FOR

    RETURN dp[0]
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n · log k) — for each position, inner loop runs at most O(digits of k) ≈ O(10) |
| Space  | O(n) — dp array |

---

## Key Takeaway

> Splitting a digit string into valid numbers is a **1D DP partitioning** problem — iterate from right to left, expanding substrings until they exceed the bound, accumulating ways from `dp[j+1]`.
