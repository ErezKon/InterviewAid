# 1922. Count Good Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-good-numbers](https://leetcode.com/problems/count-good-numbers)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Visa

---

## Problem Description
A digit string is **good** if the digits **(0-indexed)** at **even** indices are **even** and the digits at **odd** indices are **prime** (`2`, `3`, `5`, or `7`).

- For example, `"2582"` is good because the digits (`2` and `8`) at even positions are even and the digits (`5` and `2`) at odd positions are prime. However, `"3245"` is **not** good because `3` is at an even index but is not even.

Given an integer `n`, return *the **total** number of good digit strings of length* `n`. Since the answer may be large, **return it modulo** `10^9 + 7`.

A **digit string** is a string consisting of digits `0` through `9` that may contain leading zeros.

(In other words, we count good `n`-digit strings, leading zeros allowed.)

**Constraints:**
- `1 <= n <= 10^15`

## Examples
```
Example 1:
  Input: n = 1
  Output: 5
  Explanation: The good numbers of length 1 are "0", "2", "4", "6", "8".
  (All other single-digit strings from the range 0-9 are odd and therefore not good.)
```

```
Example 2:
  Input: n = 4
  Output: 400
```

```
Example 3:
  Input: n = 50
  Output: 564908303
```

## Approach
The problem reduces to counting strings of length `n` over digits 0-9 where each adjacent pair differs by at most 1. This can be solved with dynamic programming: `dp[i][d]` = number of good strings of length `i` ending with digit `d`. Transition: `dp[i][d] = dp[i-1][d] + dp[i-1][d-1] + dp[i-1][d+1]` (where applicable). The answer is sum of `dp[n][d]` for all `d`. Use modular arithmetic.

### Pseudocode
```text
FUNCTION countGoodNumbers(n):
    MOD ← 1_000_000_007
    dpPrev ← ARRAY[10] FILLED WITH 1   // length 1 strings
    FOR i FROM 2 TO n:
        dpCurr ← ARRAY[10] FILLED WITH 0
        FOR d FROM 0 TO 9:
            dpCurr[d] ← dpPrev[d]
            IF d > 0: dpCurr[d] ← (dpCurr[d] + dpPrev[d-1]) MOD MOD
            IF d < 9: dpCurr[d] ← (dpCurr[d] + dpPrev[d+1]) MOD MOD
        dpPrev ← dpCurr
    RETURN SUM(dpPrev[d] FOR d IN 0..9) MOD MOD
```

## Walkthrough
For `n = 2`:
- Start `dpPrev = [1,1,1,1,1,1,1,1,1,1]`.
- Compute `dpCurr[0] = dpPrev[0] + dpPrev[1] = 2`, `dpCurr[1] = dpPrev[0]+dpPrev[1]+dpPrev[2] = 3`, … resulting in `[2,3,4,4,4,4,4,4,3,2]`.
- Sum = 55 good numbers.

## Complexity Analysis
- **Time:** O(n × 10) → O(n).
- **Space:** O(10) → O(1) extra space.

## Follow-Up Questions
1. How would the solution change if the allowed difference between adjacent digits were at most 2?
2. Can you compute the answer for very large `n` (e.g., 10^9) using matrix exponentiation?
3. What if leading zeros are not allowed—how does the DP initialization change?

## Key Takeaway
A simple DP over digit positions with transitions to neighboring digits counts good numbers efficiently in linear time.
