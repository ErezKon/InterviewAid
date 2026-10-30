# 2547. Minimum Cost to Split an Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-split-an-array](https://leetcode.com/problems/minimum-cost-to-split-an-array)
**Companies:** Indeed

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP with Frequency Tracking — O(n²)](#approach-dp-with-frequency-tracking--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums` and an integer `k`.

Split the array into some number of non-empty subarrays. The **cost** of a split is the sum of the **importance value** of each subarray in the split.

Let `trimmed(subarray)` be the version of the subarray where all numbers which appear only once are removed.
- For example, `trimmed([3,1,2,4,3,4]) = [3,4,3,4]`.

The **importance value** of a subarray is `k + trimmed(subarray).length`.
- For example, if a subarray is `[1,2,3,3,3,4,4]`, then `trimmed([1,2,3,3,3,4,4]) = [3,3,3,4,4]`. The importance value of this subarray will be `k + 5`.

Return *the minimum possible cost of a split of* `nums`.

A **subarray** is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `1 ≤ nums.length ≤ 1000`
- `0 ≤ nums[i] < nums.length`
- `1 ≤ k ≤ 10⁹`

---

## Examples

```
Example 1:
  Input: nums = [1,2,1,2,1,3,3], k = 2
  Output: 8
  Explanation: We split nums to have two subarrays: [1,2], [1,2,1,3,3].
  The importance value of [1,2] is 2 + (0) = 2.
  The importance value of [1,2,1,3,3] is 2 + (2 + 2) = 6.
  The cost of the split is 2 + 6 = 8. It can be shown that this is the minimum possible cost among all the possible splits.
```

```
Example 2:
  Input: nums = [1,2,1,2,1], k = 2
  Output: 6
  Explanation: We split nums to have two subarrays: [1,2], [1,2,1].
  The importance value of [1,2] is 2 + (0) = 2.
  The importance value of [1,2,1] is 2 + (2) = 4.
  The cost of the split is 2 + 4 = 6. It can be shown that this is the minimum possible cost among all the possible splits.
```

```
Example 3:
  Input: nums = [1,2,1,2,1], k = 5
  Output: 10
  Explanation: We split nums to have one subarray: [1,2,1,2,1].
  The importance value of [1,2,1,2,1] is 5 + (3 + 2) = 10.
  The cost of the split is 10. It can be shown that this is the minimum possible cost among all the possible splits.
```

---

## Key Insight

> The cost of a subarray `nums[i..j]` is `k + (number of elements with freq ≥ 2, counted with multiplicity)`. Define `dp[i]` = min cost to split `nums[0..i-1]`. For each `j < i`, try `dp[j] + cost(nums[j..i-1])`. Track duplicates incrementally as you extend the subarray.

---

## Approach: DP with Frequency Tracking — O(n²) ✅

```
FUNCTION minCost(nums, k):
    n ← len(nums)
    dp ← array of size n+1, filled with infinity
    dp[0] ← 0

    FOR i ← 1 TO n:
        freq ← empty hashmap
        duplicateCost ← 0
        FOR j ← i-1 DOWNTO 0:
            freq[nums[j]] ← freq[nums[j]] + 1
            IF freq[nums[j]] == 2:
                duplicateCost ← duplicateCost + 2   // first time becoming duplicate
            ELSE IF freq[nums[j]] > 2:
                duplicateCost ← duplicateCost + 1   // additional occurrence
            dp[i] ← MIN(dp[i], dp[j] + k + duplicateCost)

    RETURN dp[n]
```

---

## Walkthrough

```
nums = [1,2,1,2,1,3,3], k = 2
```

Computing `dp[7]` (full array):
- Trying j=0 (entire array): freq tracking gives duplicateCost = 5 (1→×3, 2→×2, 3→×2), cost = 2 + 5 = 7.
- Optimal split [1,2] + [1,2,1,3,3]: dp[2] + cost([1,2,1,3,3]) = 2 + (2+4) = 2 + 6 = **8** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — two nested loops with O(1) frequency updates |
| **Space** | O(n) — DP array + frequency map |

---

## Follow-Up Questions

1. **Can we do better than O(n²)?** Potentially with divide-and-conquer optimization if the cost function is concave/convex, but the standard approach is O(n²).
2. **What does "trimmed" mean exactly?** Remove all elements that appear exactly once, then the length of what remains is the duplicate cost.
3. **What if k=0?** Then it's always best to split into individual elements (each costs 0), total = 0.

---

## Key Takeaway

> When splitting an array to minimize a cost function involving duplicates, use **DP with backward frequency tracking** — extend the subarray one element at a time and maintain running duplicate counts in O(1) per step.
