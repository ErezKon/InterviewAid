# 1863. Sum of All Subset XOR Totals

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-all-subset-xor-totals](https://leetcode.com/problems/sum-of-all-subset-xor-totals)
**Companies:** Adobe, Amazon, Bloomberg, Google, Microsoft

---

## Problem Description
Given an integer array `nums`, consider all possible subsets of `nums`. For each subset, compute the bitwise XOR of its elements. Return the sum of these XOR values over all subsets.

## Examples
**Example 1:**
Input: `nums = [1,3]`
Output: `6`
Explanation: Subsets are [], [1], [3], [1,3] with XORs 0,1,3,2 respectively; sum = 0+1+3+2 = 6.

**Example 2:**
Input: `nums = [5,1,6]`
Output: `28`

## Approach
The contribution of each bit is independent. If a bit is set in any element, it appears in exactly half of the subsets (2^(n‑1)). Therefore, the total sum equals `(OR of all numbers) * 2^(n‑1)`.

## Walkthrough
| Step | OR so far | Explanation |
|------|----------|-------------|
| Start | 0 | Initialize |
| after 5 | 0101 | 5 sets bits 0 and 2 |
| after 1 | 0101 | 1 adds no new bits |
| after 6 | 0111 | 6 adds bit 1 |
Resulting OR = 7. Multiply by 2^(3‑1)=4 → 28.

## Complexity Analysis
Time: O(n) to compute OR.
Space: O(1).

## Follow-Up Questions
* How would the solution change if subsets must be of size at least k?
* Can you extend the idea to compute the sum of AND over all subsets?

## Key Takeaway
Each set bit contributes to half of the subsets, allowing a simple O(n) OR‑times‑power calculation.
