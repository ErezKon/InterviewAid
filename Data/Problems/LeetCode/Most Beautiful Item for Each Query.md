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

You are given a 2D integer array `items` where `items[i] = [price_i, beauty_i]` denotes the **price** and **beauty** of an item respectively.

You are also given a **0-indexed** integer array `queries`. For each `queries[j]`, you want to determine the **maximum beauty** of an item whose **price** is **less than or equal** to `queries[j]`. If no such item exists, then the answer to this query is `0`.

Return *an array *`answer`* of the same length as *`queries`* where *`answer[j]`* is the answer to the *`j^th`* query*.

**Constraints:**
- `1 <= items.length, queries.length <= 10^5`
- `items[i].length == 2`
- `1 <= price_i, beauty_i, queries[j] <= 10^9`

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
Input: items = [[1,2],[3,2],[2,4],[5,6],[3,5]], queries = [1,2,3,4,5,6]
Output: [2,4,5,5,6,6]
Explanation: - For queries[0]=1, [1,2] is the only item which has price <= 1. Hence, the answer for this query is 2.
- For queries[1]=2, the items which can be considered are [1,2] and [2,4].
  The maximum beauty among them is 4.
- For queries[2]=3 and queries[3]=4, the items which can be considered are [1,2], [3,2], [2,4], and [3,5].
  The maximum beauty among them is 5.
- For queries[4]=5 and queries[5]=6, all items can be considered.
  Hence, the answer for them is the maximum beauty of all items, i.e., 6.
```

**Example 2:**
```
Input: items = [[1,2],[1,2],[1,3],[1,4]], queries = [1]
Output: [4]
Explanation: The price of every item is equal to 1, so we choose the item with the maximum beauty 4.
Note that multiple items can have the same price and/or beauty.
```

**Example 3:**
```
Input: items = [[10,1000]], queries = [5]
Output: [0]
Explanation: No item has a price less than or equal to 5, so no item can be chosen.
Hence, the answer to the query is 0.
```

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
