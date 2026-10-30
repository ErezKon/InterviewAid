# 1416. Restore The Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/restore-the-array](https://leetcode.com/problems/restore-the-array)
**Companies:** Google, Postman

---

## Problem Description

A program was supposed to print an array of integers. The program forgot to print whitespaces and the array is printed as a string of digits `s` and all we know is that all integers in the array were in the range `[1, k]` and there are no leading zeros in the array.

Given the string `s` and the integer `k`, return *the number of the possible arrays that can be printed as *`s`* using the mentioned program*. Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of only digits and does not contain leading zeros.
- `1 <= k <= 10^9`

---

## Examples

**Example 1:**
```
Input: s = "1000", k = 10000
Output: 1
Explanation: The only possible array is [1000]
```

**Example 2:**
```
Input: s = "1000", k = 10
Output: 0
Explanation: There cannot be an array that was printed this way and has all integer >= 1 and <= 10.
```

**Example 3:**
```
Input: s = "1317", k = 2000
Output: 8
Explanation: Possible arrays are [1317],[131,7],[13,17],[1,317],[13,1,7],[1,31,7],[1,3,17],[1,3,1,7]
```

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
