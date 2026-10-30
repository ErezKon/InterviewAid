# 3153. Sum of Digit Differences of All Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-digit-differences-of-all-pairs](https://leetcode.com/problems/sum-of-digit-differences-of-all-pairs)
**Companies:** Google, Turing

---

## Problem Description

> *Note: the Approach below sums `|d1 − d2|`; the official "digit difference" **counts** positions whose digits differ. Correct contribution per position: `C(n, 2) − Σ_d C(cnt[d], 2)` (or `Σ_{d1<d2} cnt[d1]·cnt[d2]`). O(n·digits).*

You are given an array `nums` consisting of **positive** integers where all integers have the **same** number of digits.

The **digit difference** between two integers is the *count* of different digits that are in the **same** position in the two integers.

Return the **sum** of the **digit differences** between **all** pairs of integers in `nums`.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i] < 10^9`
- All integers in `nums` have the same number of digits.

## Examples

**Example 1:**
```
Input: nums = [13,23,12]
Output: 4
Explanation:
We have the following:
- The digit difference between 13 and 23 is 1.
- The digit difference between 13 and 12 is 1.
- The digit difference between 23 and 12 is 2.
So the total sum of digit differences between all pairs of integers is 1 + 1 + 2 = 4.
```

**Example 2:**
```
Input: nums = [10,10,10,10]
Output: 0
Explanation:
All the integers in the array are the same. So the total sum of digit differences between all pairs of integers will be 0.
```

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
