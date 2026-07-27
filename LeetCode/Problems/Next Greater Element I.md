# 496. Next Greater Element I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/next-greater-element-i](https://leetcode.com/problems/next-greater-element-i)
**Companies:** Accenture, Agoda, Amazon, Barclays, Bloomberg, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Morgan Stanley, Oracle, Swiggy, Tcs, Tiktok, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Monotonic Stack + Hash Map — O(m+n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `nums1` (subset of `nums2`), for each element in `nums1`, find its **next greater element** in `nums2`. Return `-1` if none exists.

**Constraints:**
- `1 <= nums1.length <= nums2.length <= 1000`

---

## 2. Key Insight

> Build a next-greater map for all elements in `nums2` using a monotonic decreasing stack. Then look up each element of `nums1` in the map.

---

## 3. Approach: Monotonic Stack + Hash Map — O(m+n) ✅

```
FUNCTION nextGreaterElement(nums1, nums2):
    stack = []
    nextGreater = {}

    FOR num IN nums2:
        WHILE stack AND stack.TOP() < num:
            nextGreater[stack.POP()] = num
        stack.PUSH(num)

    RETURN [nextGreater.get(num, -1) for num in nums1]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m + n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Monotonic decreasing stack builds next-greater map in O(n).** Each element is pushed and popped at most once. The canonical pattern for "next greater element" queries.
