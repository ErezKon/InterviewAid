# 2270. Number of Ways to Split Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-split-array](https://leetcode.com/problems/number-of-ways-to-split-array)
**Companies:** Amazon, Bloomberg, Google, Jpmorgan, Meta, Microsoft, Nvidia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Prefix Sum — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Count valid split indices where the left sum ≥ right sum.

---

## 2. Examples

| nums | Output |
|------|--------|
| [1,2,3,4,5] | 2 |
| [5,4,3,2,1] | 0 |
| [1,1,1,1] | 3 |

*Explanation*: For `[1,2,3,4,5]`, splits after index 2 and 3 satisfy the condition.

---

## 3. Approach: Prefix Sum — O(n) ✅

```text
FUNCTION waysToSplitArray(nums):
    total ← SUM(nums)
    leftSum ← 0
    count ← 0
    FOR i ← 0 TO LENGTH(nums) - 2:
        leftSum ← leftSum + nums[i]
        IF leftSum * 2 ≥ total:
            count ← count + 1
    RETURN count
```

---

## 4. Walkthrough

Consider `nums = [1,2,3,4,5]`.

| i | leftSum | total | Condition `2*leftSum ≥ total` | count |
|---|---------|-------|------------------------------|-------|
| 0 | 1       | 15    | false                        | 0 |
| 1 | 3       | 15    | false                        | 0 |
| 2 | 6       | 15    | true                         | 1 |
| 3 | 10      | 15    | true                         | 2 |

After processing up to index 3, we have two valid split points.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would you modify the solution if the array could contain negative numbers?
2. Can you extend the approach to count splits where the left sum is strictly greater than the right sum?
3. What if you need to return the actual split indices instead of just the count?

---

## 7. Key Takeaway

> **Running prefix sum vs total.** `leftSum ≥ total - leftSum` ↔ `2 * leftSum ≥ total`. Single pass, no extra array needed.
