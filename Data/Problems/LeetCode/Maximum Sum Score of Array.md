# 2219. Maximum Sum Score of Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-sum-score-of-array](https://leetcode.com/problems/maximum-sum-score-of-array)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach below uses `prefix · (i+1)`. Officially the score at `i` is `max(prefix sum of nums[0..i], suffix sum of nums[i..n−1])`. Compute the total, scan once and take the max. O(n).*

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a **0-indexed** integer array `nums` of length `n`.

The **sum ****score** of `nums` at an index `i` where `0 <= i < n` is the **maximum** of:

- The sum of the **first** `i + 1` elements of `nums`.
- The sum of the **last** `n - i` elements of `nums`.

Return *the **maximum** **sum ****score** of *`nums`* at any index.*

**Constraints:**
- `n == nums.length`
- `1 <= n <= 10^5`
- `-10^5 <= nums[i] <= 10^5`

## Examples

**Example 1:**
```
Input: nums = [4,3,-2,5]
Output: 10
Explanation: The sum score at index 0 is max(4, 4 + 3 + -2 + 5) = max(4, 10) = 10.
The sum score at index 1 is max(4 + 3, 3 + -2 + 5) = max(7, 6) = 7.
The sum score at index 2 is max(4 + 3 + -2, -2 + 5) = max(5, 3) = 5.
The sum score at index 3 is max(4 + 3 + -2 + 5, 5) = max(10, 5) = 10.
The maximum sum score of nums is 10.
```

**Example 2:**
```
Input: nums = [-3,-5]
Output: -3
Explanation: The sum score at index 0 is max(-3, -3 + -5) = max(-3, -8) = -3.
The sum score at index 1 is max(-3 + -5, -5) = max(-8, -5) = -5.
The maximum sum score of nums is -3.
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

## Follow-Up Questions
1. How would you modify the algorithm to return the index of the prefix achieving the maximum score?
2. Can the approach be extended to compute the maximum score for any subarray (not just prefixes)?
3. What changes are needed if the score definition uses the **minimum** element of the prefix instead of its length?

## Key Takeaway
A single linear scan that maintains the running prefix sum and multiplies by the prefix length yields the maximum sum-score efficiently.
