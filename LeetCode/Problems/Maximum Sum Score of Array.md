# 2219. Maximum Sum Score of Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-sum-score-of-array](https://leetcode.com/problems/maximum-sum-score-of-array)
**Companies:** Amazon

---

## Problem Description
You are given an integer array `nums` of length `n`. For each index `i` (0‑based), define the **score** of the prefix `nums[0..i]` as `prefixSum(i) * (i + 1)`, where `prefixSum(i)` is the sum of the first `i+1` elements. The **maximum sum score** of the array is the maximum score among all prefixes. Return this maximum value.

## Examples
**Example 1:**
```
Input: nums = [1,2,3,4]
Output: 20
Explanation: Prefix sums are [1,3,6,10]. Scores are [1*1, 3*2, 6*3, 10*4] = [1,6,18,40]. The maximum is 40.
```

**Example 2:**
```
Input: nums = [-5,2,3]
Output: 0
Explanation: Prefix sums are [-5,-3,0]. Scores are [-5*1,-3*2,0*3] = [-5,-6,0]. The maximum is 0.
```

## Approach
The score of a prefix can be computed while scanning the array once. Maintain a running sum `pref` and at each index `i` compute `score = pref * (i+1)`. Track the maximum score encountered.

### Pseudocode
```text
FUNCTION maxSumScore(nums):
    pref ← 0
    best ← -∞
    FOR i FROM 0 TO LENGTH(nums)-1:
        pref ← pref + nums[i]
        score ← pref * (i + 1)
        best ← MAX(best, score)
    RETURN best
```

## Walkthrough
For `nums = [1,2,3,4]`:
| i | nums[i] | pref (sum) | i+1 | score = pref*(i+1) |
|---|---------|------------|-----|--------------------|
| 0 | 1       | 1          | 1   | 1                  |
| 1 | 2       | 3          | 2   | 6                  |
| 2 | 3       | 6          | 3   | 18                 |
| 3 | 4       | 10         | 4   | 40 (max)           |
The algorithm returns 40.

## Complexity Analysis
*Time:* O(n) – single pass through the array.
*Space:* O(1) – only a few scalar variables.

## Follow‑Up Questions
1. How would you modify the algorithm to return the index of the prefix achieving the maximum score?
2. Can the approach be extended to compute the maximum score for any subarray (not just prefixes)?
3. What changes are needed if the score definition uses the **minimum** element of the prefix instead of its length?

## Key Takeaway
A single linear scan that maintains the running prefix sum and multiplies by the prefix length yields the maximum sum‑score efficiently.
