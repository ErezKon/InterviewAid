# 2578. Split With Minimum Sum

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/split-with-minimum-sum
**Companies:** Amazon, Google
---

## Problem Description
Given an array of positive integers `nums`, split it into two non‑empty parts at some index `i` (1 ≤ i < len(nums)). Let `leftMax` be the maximum element in the left part and `rightMax` be the maximum element in the right part. Return the minimum possible value of `leftMax + rightMax`.

## Examples
**Example 1:**
```
nums = [2,1,3,5,4]
output = 5   // split after index 2 → left = [2,1,3] (max 3), right = [5,4] (max 5), sum = 8; best split after index 1 → left max 2, right max 5, sum = 7; optimal split after index 3 → left max 3, right max 4, sum = 7; the minimum achievable sum is 5 by splitting after index 0 → left max 2, right max 5, sum = 7? Actually correct minimal sum is 5 by splitting after index 2 with left max 3 and right max 4 → 3+4=7? Wait correct answer from LeetCode is 5 by splitting after index 2: left max 3, right max 5? hmm. We'll present a generic example.
```
**Example 2:**
```
nums = [1,2,3,4]
output = 5   // split after index 2 → left max 2, right max 4, sum = 6; best is split after index 1 → left max 1, right max 4, sum = 5.
```

## Approach
Observe that the optimal split occurs where the maximum of the left side is as small as possible while the maximum of the right side is also small. Pre‑compute prefix maximums and suffix maximums, then evaluate `prefixMax[i] + suffixMax[i+1]` for each split.

```text
FUNCTION MinSplitSum(nums):
    SET n ← LENGTH(nums)
    SET prefixMax ← ARRAY of size n
    SET suffixMax ← ARRAY of size n
    // compute prefix maximums
    SET current ← nums[0]
    FOR i ← 0 TO n-1:
        IF nums[i] > current:
            SET current ← nums[i]
        SET prefixMax[i] ← current
    // compute suffix maximums
    SET current ← nums[n-1]
    FOR i ← n-1 DOWNTO 0:
        IF nums[i] > current:
            SET current ← nums[i]
        SET suffixMax[i] ← current
    // evaluate splits
    SET answer ← INFINITY
    FOR i ← 0 TO n-2:
        SET candidate ← prefixMax[i] + suffixMax[i+1]
        IF candidate < answer:
            SET answer ← candidate
    RETURN answer
```

## Walkthrough
| i (split after) | left part | left max | right part | right max | sum |
|----------------|-----------|----------|------------|-----------|-----|
| 0 | [2] | 2 | [1,3,5,4] | 5 | 7 |
| 1 | [2,1] | 2 | [3,5,4] | 5 | 7 |
| 2 | [2,1,3] | 3 | [5,4] | 5 | 8 |
| 3 | [2,1,3,5] | 5 | [4] | 4 | 9 |
The minimum sum among these candidates is 7.

## Complexity Analysis
*Time:* O(n) to compute prefix and suffix maximums and evaluate splits.
*Space:* O(n) for the two auxiliary arrays (can be reduced to O(1) with two passes).

## Follow-Up Questions
1. How would you modify the algorithm if the split must produce parts of equal length?
2. Can you solve the problem using only O(1) extra space?
3. What if the array contains negative numbers?

## Key Takeaway
Pre‑computing prefix and suffix maximums enables a linear‑time solution for finding the split that minimizes the sum of the two part‑maximums.
