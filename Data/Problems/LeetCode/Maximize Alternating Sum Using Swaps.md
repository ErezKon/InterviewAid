# 3695. Maximize Alternating Sum Using Swaps

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-alternating-sum-using-swaps](https://leetcode.com/problems/maximize-alternating-sum-using-swaps)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy / Sorting — O(n log n)](#approach-greedy--sorting--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums`.

You want to maximize the **alternating sum** of `nums`, which is defined as the value obtained by **adding** elements at even indices and **subtracting** elements at odd indices. That is, `nums[0] - nums[1] + nums[2] - nums[3]...`

You are also given a 2D integer array `swaps` where `swaps[i] = [p_i, q_i]`. For each pair `[p_i, q_i]` in `swaps`, you are allowed to swap the elements at indices `p_i` and `q_i`. These swaps can be performed any number of times and in any order.

Return the maximum possible **alternating sum** of `nums`.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `0 <= swaps.length <= 10^5`
- `swaps[i] = [p_i, q_i]`
- `0 <= p_i < q_i <= nums.length - 1`
- `[p_i, q_i] != [p_j, q_j]`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3], swaps = [[0,2],[1,2]]
Output: 4
Explanation: The maximum alternating sum is achieved when nums is [2, 1, 3] or [3, 1, 2]. As an example, you can obtain nums = [2, 1, 3] as follows.
- Swap nums[0] and nums[2]. nums is now [3, 2, 1].
- Swap nums[1] and nums[2]. nums is now [3, 1, 2].
- Swap nums[0] and nums[2]. nums is now [2, 1, 3].
```

**Example 2:**
```
Input: nums = [1,2,3], swaps = [[1,2]]
Output: 2
Explanation: The maximum alternating sum is achieved by not performing any swaps.
```

**Example 3:**
```
Input: nums = [1,1000000000,1,1000000000,1,1000000000], swaps = []
Output: -2999999997
Explanation: Since we cannot perform any swaps, the maximum alternating sum is achieved by not performing any swaps.
```

---

## Key Insight

> After swapping, you can arrange the array in any order. The alternating sum assigns `+` to even indices and `-` to odd indices. To maximize: put the **largest** values at even (positive) positions and **smallest** values at odd (negative) positions.

Sort the array. Assign the top `⌈n/2⌉` values to even positions (added) and the bottom `⌊n/2⌋` values to odd positions (subtracted).

---

## Approach: Greedy / Sorting — O(n log n) ✅

```
FUNCTION maxAlternatingSum(nums):
    SORT nums in descending order
    result = 0
    FOR i ← 0 TO n - 1:
        IF i is even:
            result += nums[i]
        ELSE:
            result -= nums[i]
    RETURN result
```

Equivalently: `sum of top ⌈n/2⌉ values - sum of bottom ⌊n/2⌋ values`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Assign | **O(n log n)** | O(1) |

---

## Follow-Up Questions

**Q1: What if swaps are limited to at most k swaps?**
This becomes significantly harder — you'd need to determine which swaps maximize the gain. A greedy approach picking the most beneficial swap each time works for small k.

**Q2: What if the array is fixed (no swaps allowed)?**
Then use DP: `dp_even` = max alternating sum ending at an even-sign position, `dp_odd` = max ending at odd-sign.

**Q3: How does this relate to "Maximum Alternating Subsequence Sum" (LC 1911)?**
In LC 1911 you pick a subsequence (not rearrange), so DP is needed. Here, free rearrangement makes it a sorting problem.

---

## Key Takeaway

> **When you can freely rearrange, maximizing an alternating sum reduces to sorting: put large values at positive positions and small values at negative positions.**
