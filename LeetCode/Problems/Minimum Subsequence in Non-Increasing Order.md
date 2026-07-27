# 1403. Minimum Subsequence in Non-Increasing Order

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-subsequence-in-non-increasing-order](https://leetcode.com/problems/minimum-subsequence-in-non-increasing-order)
**Companies:** Amazon, Mercari

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Greedy — O(n log n)](#4-approach-sort--greedy--on-log-n)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an array `nums`, return a subsequence of `nums` in **non-increasing order** such that the sum of the subsequence is **strictly greater** than the sum of the remaining elements. If multiple solutions, return the one with **minimum** size.

**Constraints:**
- `1 <= nums.length <= 500`
- `1 <= nums[i] <= 100`

---

## 2. Examples

```
Example 1:
  Input: nums = [4, 3, 10, 9, 8]
  Output: [10, 9]
  Explanation: Sum=19, remaining=15. 19 > 15 ✅. No single element > 15.
```

---

## 3. Key Insight

> Sort descending. Greedily take the largest elements until the subsequence sum exceeds half the total sum.

---

## 4. Approach: Sort + Greedy — O(n log n) ✅

```
FUNCTION minSubsequence(nums):
    SORT nums DESC
    totalSum = SUM(nums)
    subSum = 0
    result = []

    FOR num IN nums:
        subSum += num
        result.APPEND(num)
        IF subSum > totalSum - subSum:
            RETURN result

    RETURN result
```

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting |
| **Space** | O(1) extra |

---

## 6. Key Takeaway

> **Greedy from largest** — to exceed half the total with minimum elements, always take the largest available. Sorting descending + prefix sum check.
