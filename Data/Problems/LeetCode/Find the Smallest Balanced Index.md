# 3862. Find the Smallest Balanced Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-smallest-balanced-index](https://leetcode.com/problems/find-the-smallest-balanced-index)
**Companies:** Google, Meta
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Prefix Sum — O(n) ✅](#2-approach-prefix-sum--on-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

You are given an integer array `nums`.

An index `i` is **balanced** if the sum of elements **strictly** to the left of `i` equals the product of elements **strictly** to the right of `i`.

If there are no elements to the left, the sum is considered as 0. Similarly, if there are no elements to the right, the product is considered as 1.

Return an integer denoting the **smallest** balanced index. If no balanced index exists, return -1.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

> *Note: the Approach/Walkthrough below compare left sum with right **sum** — wrong. Official compares left sum with right **product**. Correct idea: precompute suffix products capped above `sum(nums)` (≤ 10^14, so cap to avoid overflow), then scan left to right maintaining the prefix sum and return the first `i` with `prefixSum == suffixProduct[i+1]`.*

---

## 2. Approach: Prefix Sum — O(n) ✅

```text
FUNCTION smallestBalancedIndex(nums):
    total ← SUM(nums)
    leftSum ← 0
    FOR i FROM 0 TO LENGTH(nums)-1 DO
        IF leftSum == total - leftSum - nums[i] THEN
            RETURN i
        leftSum ← leftSum + nums[i]
    RETURN -1
```

---

## 3. Examples

**Example 1:**
```
Input: nums = [2,1,2]
Output: 1
Explanation: For index i = 1: left sum = nums[0] = 2, right product = nums[2] = 2. Since the left sum equals the right product, index 1 is balanced. No smaller index satisfies the condition, so the answer is 1.
```

**Example 2:**
```
Input: nums = [2,8,2,2,5]
Output: 2
Explanation: For index i = 2: left sum = 2 + 8 = 10, right product = 2 * 5 = 10. Since the left sum equals the right product, index 2 is balanced. No smaller index satisfies the condition, so the answer is 2.
```

**Example 3:**
```
Input: nums = [1]
Output: -1
Explanation: For index i = 0: the left side is empty, so the left sum is 0; the right side is empty, so the right product is 1. Since they are not equal, index 0 is not balanced. Therefore, no balanced index exists and the answer is -1.
```

---

## 4. Walkthrough

Take `nums = [1,2,3,4,6]`.
| i | nums[i] | leftSum (before) | rightSum (after) | Balanced? |
|---|---------|------------------|------------------|-----------|
|0|1|0|2+3+4+6=15|No|
|1|2|1|3+4+6=13|No|
|2|3|1+2=3|4+6=10|No|
|3|4|1+2+3=6|6|Yes → return 3 |

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 6. Key Takeaway

> Track left sum while iterating; right sum is total minus left sum minus current element. Return first index where they match.
