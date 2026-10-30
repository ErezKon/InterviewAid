# 1785. Minimum Elements to Add to Form a Given Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-elements-to-add-to-form-a-given-sum](https://leetcode.com/problems/minimum-elements-to-add-to-form-a-given-sum)
**Companies:** Twitter
---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums` and two integers `limit` and `goal`. The array `nums` has an interesting property that `abs(nums[i]) <= limit`.

Return *the minimum number of elements you need to add to make the sum of the array equal to *`goal`. The array must maintain its property that `abs(nums[i]) <= limit`.

Note that `abs(x)` equals `x` if `x >= 0`, and `-x` otherwise.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= limit <= 10^6`
- `-limit <= nums[i] <= limit`
- `-10^9 <= goal <= 10^9`

---

## Key Insight

> The deficit is `|goal - sum(nums)|`. Each added element contributes at most `limit` toward closing the gap. Answer = `ceil(deficit / limit)`.

---

## Approach: Math — O(n) ✅

```text
FUNCTION minElements(nums, limit, goal):
    diff ← ABS(goal - SUM(nums))
    RETURN CEIL(diff / limit)
```

---

## Examples

**Example 1:**
```
Input: nums = [1,-1,1], limit = 3, goal = -4
Output: 2
Explanation: You can add -2 and -3, then the sum of the array will be 1 - 1 + 1 - 2 - 3 = -4.
```

**Example 2:**
```
Input: nums = [1,-10,9,1], limit = 100, goal = 0
Output: 1
```

---

## Walkthrough

Consider `nums = [1, -1, 1]`, `limit = 3`, `goal = 6`.

| Step | sum(nums) | diff | elements added |
|------|-----------|------|----------------|
| 0 | 1 | 5 | 0 |
| 1 | 1 + 3 = 4 | 2 | 1 (value 3) |
| 2 | 4 + 2 = 6 | 0 | 2 (value 2) |

Result: 2 elements added.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Math | **O(n)** | **O(1)** |

---

## Key Takeaway

> The minimum number of bounded elements needed equals the ceiling of the deficit divided by the limit.

---