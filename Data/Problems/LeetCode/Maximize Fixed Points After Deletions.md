# 3920. Maximize Fixed Points After Deletions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-fixed-points-after-deletions](https://leetcode.com/problems/maximize-fixed-points-after-deletions)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP — O(n)](#approach-dp--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums`.

A position `i` is called a **fixed point** if `nums[i] == i`.

You are allowed to delete **any** number of elements (including zero) from the array. After each deletion, the remaining elements **shift left**, and indices are reassigned starting from 0.

Return an integer denoting the **maximum** number of fixed points that can be achieved after performing any number of deletions.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`

---

## Key Insight

> After deleting `d` elements before position `i`, element `nums[i]` gets new index `i - d`. So `nums[i]` becomes a fixed point when `nums[i] == i - d`, i.e., `d == i - nums[i]`. Use DP: for each element, track how many deletions have occurred so far and whether keeping this element creates a fixed point.

---

## Approach: DP — O(n) ✅

```text
FUNCTION maxFixedPoints(nums):
    n = len(nums)
    dp = [-infinity] * (n + 1)
    dp[0] = 0
    FOR i ← 0 TO n - 1:
        newDp = [-infinity] * (n + 1)
        FOR d ← 0 TO i:
            IF dp[d] == -infinity: CONTINUE
            // delete nums[i]
            newDp[d + 1] = MAX(newDp[d + 1], dp[d])
            // keep nums[i]
            fixed = 1 IF nums[i] == i - d ELSE 0
            newDp[d] = MAX(newDp[d], dp[d] + fixed)
        dp = newDp
    RETURN MAX(dp)
```

---

## Examples

**Example 1:**
```
Input: nums = [0,2,1]
Output: 2
Explanation: - Delete nums[1] = 2. The array becomes [0, 1].
- Now, nums[0] = 0 and nums[1] = 1, so both indices are fixed points.
- Thus, the answer is 2.
```

**Example 2:**
```
Input: nums = [3,1,2]
Output: 2
Explanation: - Do not delete any elements. The array remains [3, 1, 2].
- Here, nums[1] = 1 and nums[2] = 2, so these indices are fixed points.
- Thus, the answer is 2.
```

**Example 3:**
```
Input: nums = [1,0,1,2]
Output: 3
Explanation: - Delete nums[0] = 1. The array becomes [0, 1, 2].
- Now, nums[0] = 0, nums[1] = 1, and nums[2] = 2, so all indices are fixed points.
- Thus, the answer is 3.
```

---

## Walkthrough

| Step | i | d (deletions) | nums[i] | New Index | Fixed? | dp State |
|------|---|---------------|---------|-----------|--------|----------|
| 1 | 0 | 0 | 0 | 0 | ✅ | dp[0]=1 |
| 2 | 1 | 0 | 2 | 1 | ❌ | dp unchanged |
| 3 | 2 | 1 (delete index1) | 1 | 1 | ✅ | dp[1]=2 |

The DP tracks the best count for each possible deletion count, ultimately yielding 2 fixed points.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP (optimized) | **O(n)** | O(n) |

---

## Follow-Up Questions

- How would the solution change if deletions were limited to at most `k` elements?
- Can the problem be solved in O(1) extra space?
- What if the array is not a permutation but may contain duplicates?

---

## Key Takeaway

> **After deletions, element `nums[i]` is a fixed point iff exactly `i - nums[i]` elements before it were deleted.** This reframing turns a combinatorial problem into a DP on deletion count.
