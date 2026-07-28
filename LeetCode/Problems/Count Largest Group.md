# 1399. Count Largest Group

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-largest-group](https://leetcode.com/problems/count-largest-group)
**Companies:** Amazon, Bloomberg, Google, Mercari, Meta

---

## Problem Description
Given an integer `n`, consider the numbers from `1` to `n`. For each number, compute the sum of its digits. Group numbers that share the same digit‑sum. Return the number of groups that have the largest size.

## Examples
**Example 1:**
```
Input: n = 13
Output: 4
Explanation: Digit‑sum groups are {1,10}, {2,11}, {3,12}, {4,13}, {5}, {6}, {7}, {8}, {9}. The largest groups have size 2 and there are 4 such groups.
```
**Example 2:**
```
Input: n = 2
Output: 2
Explanation: Groups are {1} and {2}, both of size 1.
```

## Approach
Use a hash map to count how many numbers fall into each digit‑sum group, then find the maximum frequency and count how many groups achieve it.

## Walkthrough
| i | digit‑sum | groups after i |
|---|-----------|----------------|
| 1 | 1 | {1:1} |
| 2 | 2 | {1:1, 2:1} |
| … | … | … |
| 10| 1 | {1:2, 2:1, …} |
Continue until `n`, then compute `maxSize = max(groups.values())` and sum groups with that size.

## Complexity Analysis
- **Time:** O(n · log 10 n) → O(n) because digit sum of a number takes O(log n) time.
- **Space:** O(k) where `k` is the number of distinct digit sums (≤ 9 · log₁₀ n).

## Follow‑Up Questions
1. How would you modify the solution for a very large `n` (e.g., 10¹⁸) where iterating through all numbers is infeasible?
2. Can the problem be solved using combinatorial counting instead of enumeration?
3. How would the solution change if numbers were given in an arbitrary unsorted array instead of the range `1…n`?

## Key Takeaway
Counting digit‑sum groups reduces to a simple frequency map; the answer is the count of groups whose frequency equals the maximum frequency.
