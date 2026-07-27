# 2070. Most Beautiful Item for Each Query

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-beautiful-item-for-each-query](https://leetcode.com/problems/most-beautiful-item-for-each-query)
**Companies:** Amazon, Google, Postmates, Razorpay

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Prefix Max + Binary Search — O((n+q) log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given items `[price, beauty]` and queries (max price budget), for each query return the **maximum beauty** of items with price ≤ query.

**Constraints:**
- `1 <= items.length, queries.length <= 10⁵`

---

## 2. Key Insight

> Sort items by price, build prefix max beauty. For each query, binary search for the rightmost item within budget and return its prefix max beauty.

---

## 3. Approach: Sort + Prefix Max + Binary Search — O((n+q) log n) ✅

```
FUNCTION maximumBeauty(items, queries):
    items.SORT()
    // Build prefix max beauty
    maxBeauty = []
    currMax = 0
    FOR price, beauty IN items:
        currMax = MAX(currMax, beauty)
        maxBeauty.ADD((price, currMax))

    result = []
    FOR q IN queries:
        idx = bisect_right(maxBeauty, (q, infinity)) - 1
        result.ADD(maxBeauty[idx][1] IF idx >= 0 ELSE 0)
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O((n + q) log n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Sort + prefix max + binary search** — classic offline query pattern. Prefix max ensures we get the best beauty up to any price point, and binary search answers each query in O(log n).
