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

Given the array `nums`, obtain a subsequence of the array whose sum of elements is **strictly greater** than the sum of the non included elements in such subsequence.

If there are multiple solutions, return the subsequence with **minimum size** and if there still exist multiple solutions, return the subsequence with the **maximum total sum** of all its elements. A subsequence of an array can be obtained by erasing some (possibly zero) elements from the array.

Note that the solution with the given constraints is guaranteed to be **unique**. Also return the answer sorted in **non-increasing** order.

**Constraints:**
- `1 <= nums.length <= 500`
- `1 <= nums[i] <= 100`

---

## 2. Examples

**Example 1:**
```
Input: nums = [4,3,10,9,8]
Output: [10,9]
Explanation: The subsequences [10,9] and [10,8] are minimal such that the sum of their elements is strictly greater than the sum of elements not included. However, the subsequence [10,9] has the maximum total sum of its elements.
```

**Example 2:**
```
Input: nums = [4,4,7,6,7]
Output: [7,7,6]
Explanation: The subsequence [7,7] has the sum of its elements equal to 14 which is not strictly greater than the sum of elements not included (14 = 4 + 4 + 6). Therefore, the subsequence [7,6,7] is the minimal satisfying the conditions. Note the subsequence has to be returned in non-increasing order.
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
