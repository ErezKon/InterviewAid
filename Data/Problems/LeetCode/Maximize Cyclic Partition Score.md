# 3743. Maximize Cyclic Partition Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-cyclic-partition-score](https://leetcode.com/problems/maximize-cyclic-partition-score)
**Companies:** Amazon, Google

---

## Problem Description

> *Note: the Approach below sums positive per-boundary contributions, which is not the official problem (at most `k` cyclic subarrays, score = sum of max − min). Possible approach: rotate so the array starts at the global maximum (and also try starting just after it), then run a linear DP for at most `k` segments where each segment picks one element with `+` sign and one with `−` sign (states: segments used × phase). O(n·k).*

You are given a **cyclic** array `nums` and an integer `k`.

**Partition** `nums` into **at most** `k`** **subarrays. As `nums` is cyclic, these subarrays may wrap around from the end of the array back to the beginning.

The **range** of a subarray is the difference between its **maximum** and **minimum** values. The **score** of a partition is the sum of subarray **ranges**.

Return the **maximum** possible **score** among all cyclic partitions.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= nums.length`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,3], k = 2
Output: 3
Explanation: - Partition nums into [2, 3] and [3, 1] (wrapped around).
- The range of [2, 3] is max(2, 3) - min(2, 3) = 3 - 2 = 1.
- The range of [3, 1] is max(3, 1) - min(3, 1) = 3 - 1 = 2.
- The score is 1 + 2 = 3.
```

**Example 2:**
```
Input: nums = [1,2,3,3], k = 1
Output: 2
Explanation: - Partition nums into [1, 2, 3, 3].
- The range of [1, 2, 3, 3] is max(1, 2, 3, 3) - min(1, 2, 3, 3) = 3 - 1 = 2.
- The score is 2.
```

**Example 3:**
```
Input: nums = [1,2,3,3], k = 4
Output: 3
Explanation: Identical to Example 1, we partition nums into [2, 3] and [3, 1]. Note that nums may be partitioned into fewer than k subarrays.
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

> Cyclic partition problems often reduce to independent decisions on each boundary; greedily include positive-contribution cuts to maximize the total score.
