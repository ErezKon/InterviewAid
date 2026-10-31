# 1837. Sum of Digits in Base K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-digits-in-base-k](https://leetcode.com/problems/sum-of-digits-in-base-k)
**Companies:** Google

---

## Problem Description

Given an integer `n` (in base `10`) and a base `k`, return *the **sum** of the digits of* `n` ***after** converting* `n` *from base* `10` *to base* `k`.

After converting, each digit should be interpreted as a base `10` number, and the sum should be returned in base `10`.

**Constraints:**
- `1 <= n <= 100`
- `2 <= k <= 10`

## Examples

**Example 1:**
```
Input: n = 34, k = 6
Output: 9
Explanation: 34 (base 10) expressed in base 6 is 54. 5 + 4 = 9.
```

**Example 2:**
```
Input: n = 10, k = 10
Output: 1
Explanation: n is already in base 10. 1 + 0 = 1.
```

## Approach
Repeatedly divide `n` by `k`, extracting the remainder each step (the current digit). Accumulate the remainders until `n` becomes zero.

## Walkthrough
| Step | n before | remainder (digit) | sum so far |
|------|----------|-------------------|-----------|
| 1 | 34 | 34 % 6 = 4 | 4 |
| 2 | 5  | 5 % 6 = 5 | 9 |
| 3 | 0  | stop | 9 |

## Complexity Analysis
Time: O(logₖ n) divisions.
Space: O(1).

## Follow-Up Questions
* How would you modify the algorithm to return the digit list instead of the sum?
* Can you compute the sum for very large `n` given as a string without converting to an integer?
* What if `k` could be up to 10⁹?

## Key Takeaway
Repeated division extracts base-k digits, and summing the remainders yields the desired digit sum in logarithmic time.
