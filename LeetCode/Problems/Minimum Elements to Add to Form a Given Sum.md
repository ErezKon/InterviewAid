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

Given an array `nums`, an integer `limit`, and an integer `goal`, add the minimum number of elements (each with absolute value ≤ `limit`) so that the array sums to `goal`.

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
Input: nums = [1, -1, 1], limit = 3, goal = 6
Output: 1
Explanation: Current sum = 1. Deficit = 5. One element of value 3 reduces deficit to 2, another of value 2 (≤ limit) makes sum 6. Minimum elements needed = 2.
```

**Example 2:**
```
Input: nums = [1, -10, 9, 1], limit = 100, goal = 0
Output: 0
Explanation: Sum already equals goal, no elements needed.
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