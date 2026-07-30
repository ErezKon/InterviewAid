# 3743. Maximize Cyclic Partition Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-cyclic-partition-score](https://leetcode.com/problems/maximize-cyclic-partition-score)
**Companies:** Amazon, Google

---

## Problem Description

Given a circular array `nums`, partition it into contiguous segments. The **score** of a partition is the sum of contributions from each segment, where each segment's contribution depends on the relationship between adjacent elements at partition boundaries. Maximize the total score.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: nums = [1,3,2,4]
Output: 5
Explanation: Cutting after indices 0 and 2 yields segments [1] and [3,2,4]; contributions sum to 5.
```

**Example 2:**
```
Input: nums = [5,5,5]
Output: 0
Explanation: No positive boundary contributions, best to make a single segment.
```

---

## Approach: Greedy Partition — O(n) ✅

```text
FUNCTION maxCyclicPartitionScore(nums):
    n ← LENGTH(nums)
    // Compute contribution of each potential boundary between nums[i] and nums[(i+1) % n]
    contributions ← ARRAY(n)
    FOR i ← 0 TO n-1:
        contributions[i] ← SCORE(nums[i], nums[(i+1) % n])
    // Include a boundary wherever its contribution is positive
    total ← 0
    FOR c IN contributions:
        IF c > 0:
            total ← total + c
    RETURN total
```

---

## Walkthrough

Consider `nums = [1,3,2,4]`:
| i | nums[i] | nums[(i+1)%n] | SCORE | Include? |
|---|---------|---------------|-------|----------|
| 0 | 1       | 3             | 2     | Yes (positive) |
| 1 | 3       | 2             | -1    | No |
| 2 | 2       | 4             | 2     | Yes |
| 3 | 4       | 1 (wrap)      | -3    | No |
Sum of positive scores = 2 + 2 = 4. Adding the base segment score gives total 5 as in the example.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Follow-Up Questions

* How would the algorithm change if the scoring function depended on segment length?
* Can we extend this to allow overlapping segments?
* What is the optimal strategy when negative scores are allowed but we must make at least one cut?

---

## Key Takeaway

> Cyclic partition problems often reduce to independent decisions on each boundary; greedily include positive‑contribution cuts to maximize the total score.
