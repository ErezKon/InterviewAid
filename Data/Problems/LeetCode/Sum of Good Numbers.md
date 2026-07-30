# 3452. Sum of Good Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-good-numbers](https://leetcode.com/problems/sum-of-good-numbers)
**Companies:** Bcg, Google

---

## Problem Description
Given an integer `n`, a *good number* is defined as a positive integer whose decimal representation consists only of the digits `0, 1, 2, 5, 6, 8, 9`. Compute the sum of all good numbers in the inclusive range `[1, n]`. Return the sum modulo 10⁹ + 7.

## Examples
**Example 1:**
Input: `n = 10`
Output: `45`
Explanation: Good numbers ≤ 10 are 1,2,5,6,8,9,10 (10 is good because its digits 1 and 0 are allowed). Their sum is 1+2+5+6+8+9+10 = 45.

**Example 2:**
Input: `n = 20`
Output: `115`

## Approach
Generate good numbers by performing a depth‑first search on digit positions, appending only allowed digits. Stop recursion when the constructed number exceeds `n`. Accumulate the sum of all generated numbers.

## Walkthrough
| Step | Current number | Action |
|------|----------------|--------|
| 0 | "" (empty) | start DFS |
| 1 | "1" | ≤ n, add to sum |
| 2 | "10" | ≤ n, add to sum |
| … | … | continue exploring allowed digits |

## Complexity Analysis
Time: O(g) where g is the count of good numbers ≤ n (much smaller than n). Each number is built once.
Space: O(d) recursion depth, where d is the number of digits of `n`.

## Follow-Up Questions
* How would you adapt the algorithm to count good numbers instead of summing them?
* Can the solution be extended to bases other than decimal?
* What if the set of allowed digits changes dynamically?

## Key Takeaway
Restricting digit choices enables a compact DFS that enumerates only valid numbers, avoiding a linear scan of the entire range.
