# 3153. Sum of Digit Differences of All Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-digit-differences-of-all-pairs](https://leetcode.com/problems/sum-of-digit-differences-of-all-pairs)
**Companies:** Google, Turing

---

## Problem Description
Given an array `nums` of non‑negative integers, for every pair of indices `(i, j)` with `i < j` compute the sum of absolute differences of corresponding digits of `nums[i]` and `nums[j]`. Return the total sum over all pairs.

## Examples
**Example 1:**
Input: `nums = [12, 23]`
Output: `2`
Explanation: Digits differ by |1‑2| + |2‑3| = 2.

**Example 2:**
Input: `nums = [10, 20, 30]`
Output: `6`

## Approach
Treat each decimal position independently. For each digit position, count how many numbers have each digit (0‑9). The contribution of that position equals the sum over all digit pairs of `|d1‑d2| * count[d1] * count[d2]`. Sum contributions across positions.

## Walkthrough
| Position (units) | counts 0‑9 | contribution |
|------------------|-----------|--------------|
| units of [12,23] | 0:0,1:1,2:1,3:1,… | (|1‑2|+|1‑3|+|2‑3|)=2 |
| tens ... |
Total = 2.

## Complexity Analysis
Time: O(L·10) where L is max number of digits (≤10 for 32‑bit ints).
Space: O(10) for digit counts per position.

## Follow-Up Questions
* How would you adapt the solution for binary representation?
* Can you compute the sum modulo 10⁹ + 7 for very large arrays?
* What if numbers have leading zeros considered?

## Key Takeaway
Separating digit positions allows linear‑time aggregation of pairwise digit differences.
