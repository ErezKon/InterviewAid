# 2548. Maximum Price to Fill a Bag

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-price-to-fill-a-bag](https://leetcode.com/problems/maximum-price-to-fill-a-bag)
**Companies:** Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given items with `weight[i]` and `price[i]`, and a bag `capacity`, you can take fractions of items. Return the **maximum total price** to fill the bag exactly. Return -1 if impossible.

**Constraints:**
- `1 <= items.length <= 10^5`

---

## Examples

**Example 1:**
```
Input:  items = [[50,50],[50,100]], capacity = 100
Output: 150
Explanation: Take both items fully.
```

---

## Key Insight

> **Fractional knapsack** — sort by price-per-unit-weight descending. Greedily take the most valuable items first. If total weight < capacity, return -1.

---

## Approach

```
FUNCTION maxPrice(items, capacity)
    IF SUM(weight) < capacity THEN RETURN -1

    SORT items by price/weight DESCENDING
    total ← 0

    FOR each (w, p) IN items DO
        IF capacity ≥ w THEN
            total ← total + p
            capacity ← capacity - w
        ELSE
            total ← total + p × (capacity / w)
            capacity ← 0
            BREAK

    RETURN total
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sorting |
| Space  | **O(1)** — in-place |

---

## Key Takeaway

> **Fractional knapsack** — sort by value density, greedily fill. Unlike 0/1 knapsack, the greedy approach is optimal when items are divisible.
