# 2044. Count Number of Maximum Bitwise-OR Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets
**Companies:** Amazon, Bloomberg, Bny Mellon, Citadel, Google, Meta, Microsoft
---

## Problem Description
Given an integer array `nums` (length ≤ 16), a subset’s bitwise OR is the OR of all its elements. Let `maxOr` be the maximum possible OR over all subsets. Return the number of subsets whose OR equals `maxOr`.

## Examples
**Example 1:**
```
Input: nums = [3,1,5]
Output: 2
Explanation: maxOr = 7 (111). Subsets achieving 7 are [3,5] and [3,1,5].
```
**Example 2:**
```
Input: nums = [2,2,2]
Output: 7
Explanation: maxOr = 2. Every non‑empty subset yields OR 2, total 2^3‑1 = 7.
```

## Approach
1. Compute `maxOr` by OR‑ing all numbers.
2. Use backtracking (or bitmask enumeration) to explore every subset, tracking the current OR.
3. When the end of the array is reached, increment a counter if the current OR equals `maxOr`.
The backtracking explores two choices per element: include it (OR with current) or exclude it.

## Walkthrough
| Step | idx | currOr (binary) | Action | New currOr |
|------|-----|----------------|--------|-----------|
| 0    | 0   | 000            | include 3 (011) | 011 |
| 1    | 1   | 011            | include 1 (001) | 011 |
| 2    | 2   | 011            | include 5 (101) | 111 → count++ |
| …    | …   | …              | …      | … |
All 2^n subsets are visited; those reaching `maxOr` are counted.

## Complexity Analysis
- **Time:** O(2^n) – each element has two choices; n ≤ 16 makes this feasible.
- **Space:** O(n) – recursion stack depth.

## Follow-Up Questions
- How would you solve the problem if `n` were up to 10^5?
- Can you compute the answer using DP with bitmask states to avoid explicit recursion?
- What if we needed the count of subsets whose OR is at least a given threshold?

## Key Takeaway
When the input size is tiny, exhaustive backtracking over all subsets efficiently counts those achieving the maximal bitwise OR.
