# 503. Next Greater Element II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/next-greater-element-ii](https://leetcode.com/problems/next-greater-element-ii)
**Companies:** Amazon, Apple, Bloomberg, Flipkart, Goldman Sachs, Google, Intuit, Meta, Microsoft, Morgan Stanley, Nvidia, Servicenow, Uber, Visa, Zeta, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Monotonic Stack + Circular — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a circular array, find the **next greater element** for each element. The search wraps around.

**Constraints:**
- `1 <= nums.length <= 10⁴`

---

## 2. Key Insight

> Iterate the array twice (indices 0..2n-1) to simulate circularity. Use `i % n` for the actual index. Only push indices during the first pass.

---

## 3. Approach: Monotonic Stack + Circular — O(n) ✅

```
FUNCTION nextGreaterElements(nums):
    n = len(nums)
    result = [-1] * n
    stack = []    // indices

    FOR i ← 0 TO 2*n - 1:
        WHILE stack AND nums[stack.TOP()] < nums[i % n]:
            result[stack.POP()] = nums[i % n]
        IF i < n:
            stack.PUSH(i)

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Double iteration for circular arrays.** Same monotonic stack pattern as NGE I, but iterate `2n` times with modular indexing to handle wrap-around.
