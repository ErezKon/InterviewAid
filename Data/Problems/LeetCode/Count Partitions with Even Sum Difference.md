# 3432. Count Partitions with Even Sum Difference

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-partitions-with-even-sum-difference](https://leetcode.com/problems/count-partitions-with-even-sum-difference)
**Companies:** Accenture, Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, count the number of ways to split it into a non-empty left part and a non-empty right part such that `(leftSum - rightSum)` is even.

**Constraints:**
- `2 <= nums.length <= 100`
- `1 <= nums[i] <= 1000`

---

## Examples

**Example 1:**
- **Input:** `nums = [10, 10, 3, 7, 6]`
- **Output:** `4`
- **Explanation:** Splits at indices 1,2,3,4. Check parity of leftSum − rightSum for each.

---

## Key Insight

`leftSum - rightSum = leftSum - (total - leftSum) = 2 × leftSum - total`. This is even iff `total` is even (since `2 × leftSum` is always even). So either **all** splits are valid (when total is even) or **none** are (when total is odd). The answer is either `n - 1` or `0`.

---

## Approach

```
FUNCTION countPartitions(nums):
    total = SUM(nums)
    IF total % 2 == 0: RETURN LENGTH(nums) - 1
    RETURN 0
```

Or equivalently (the scanning version which also works):
```
FUNCTION countPartitions(nums):
    total = SUM(nums)
    count = 0; leftSum = 0
    FOR i ← 0 TO n - 2:
        leftSum += nums[i]
        rightSum = total - leftSum
        IF (leftSum - rightSum) % 2 == 0: count += 1
    RETURN count
```

---

## Walkthrough

**Input:** `nums = [10, 10, 3, 7, 6]`, total = 36 (even)

Since total is even, all 4 splits are valid → answer = **4** ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — compute sum |
| **Space** | O(1) |

---

## Key Takeaway

> **When checking parity of a difference, simplify the algebra first. Here `leftSum - rightSum = 2×leftSum - total`, so parity depends only on the total sum, not the split point.**
