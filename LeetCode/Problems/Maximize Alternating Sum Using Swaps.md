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

Given a 0-indexed array `nums`, the **alternating sum** is defined as `nums[0] - nums[1] + nums[2] - nums[3] + ...`. You may perform any number of **swaps** (swap any two elements). Return the **maximum alternating sum** achievable.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  nums = [4,2,5,3]
Output: 4
Explanation: Alternating sum = nums[0] - nums[1] + nums[2] - nums[3]
             Optimal arrangement: [5,2,4,3] → 5 - 2 + 4 - 3 = 4
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
