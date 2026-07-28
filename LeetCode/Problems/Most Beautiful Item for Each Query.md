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
        idx = bisect_right(maxBeauty, (q, INFINITY)) - 1
        result.ADD(maxBeauty[idx][1] IF idx >= 0 ELSE 0)
    RETURN result
```

---

## Examples

**Example 1:**
```
items = [[1,2],[3,5],[2,4]]
queries = [2,3]
```
- For budget `2`, items with price ≤2 are `[1,2]` and `[2,4]`; maximum beauty is `4`.
- For budget `3`, all items are affordable; maximum beauty is `5`.
**Output:** `[4,5]`

**Example 2:**
```
items = [[5,10],[1,1]]
queries = [0,5]
```
- Budget `0` yields no items → `0`.
- Budget `5` includes both items, max beauty `10`.
**Output:** `[0,10]`

---

## Walkthrough

| Step | Action | Prefix Max Beauty |
|------|--------|-------------------|
| 1 | Sort items by price → `[[1,2],[2,4],[3,5]]` | — |
| 2 | Build prefix max: after first → `(1,2)` | `[(1,2)]` |
| 3 | After second → max(2,4)=4 → `(2,4)` | `[(1,2),(2,4)]` |
| 4 | After third → max(4,5)=5 → `(3,5)` | `[(1,2),(2,4),(3,5)]` |
| 5 | Query `2`: binary search finds index `1` → beauty `4` |
| 6 | Query `3`: index `2` → beauty `5` |

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O((n + q) log n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Sort + prefix max + binary search** — classic offline query pattern. Prefix max ensures we get the best beauty up to any price point, and binary search answers each query in O(log n).
