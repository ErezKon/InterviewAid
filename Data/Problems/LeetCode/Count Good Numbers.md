# 1922. Count Good Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-good-numbers](https://leetcode.com/problems/count-good-numbers)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Visa

---

## Problem Description
Given an integer `n`, count how many `n`‑digit numbers are **good**. A good number has the following property: for every pair of adjacent digits, the absolute difference between them is either 0 or 1. Return the count modulo `10^9 + 7`.

## Examples
**Example 1:**
```
Input: n = 1
Output: 10
Explanation: All single‑digit numbers (0‑9) are good.
```
**Example 2:**
```
Input: n = 2
Output: 55
Explanation: Good numbers include 00,01,10,11,12,…,98,99.
```

## Approach
The problem reduces to counting strings of length `n` over digits 0‑9 where each adjacent pair differs by at most 1. This can be solved with dynamic programming: `dp[i][d]` = number of good strings of length `i` ending with digit `d`. Transition: `dp[i][d] = dp[i-1][d] + dp[i-1][d-1] + dp[i-1][d+1]` (where applicable). The answer is sum of `dp[n][d]` for all `d`. Use modular arithmetic.

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
- **Time:** O(n × 10) → O(n).
- **Space:** O(10) → O(1) extra space.

## Follow-Up Questions
1. How would the solution change if the allowed difference between adjacent digits were at most 2?
2. Can you compute the answer for very large `n` (e.g., 10^9) using matrix exponentiation?
3. What if leading zeros are not allowed—how does the DP initialization change?

## Key Takeaway
A simple DP over digit positions with transitions to neighboring digits counts good numbers efficiently in linear time.
