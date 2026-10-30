# 2363. Merge Similar Items

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/merge-similar-items](https://leetcode.com/problems/merge-similar-items)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two 2D integer arrays, `items1` and `items2`, representing two sets of items. Each array `items` has the following properties:

- `items[i] = [value_i, weight_i]` where `value_i` represents the **value** and `weight_i` represents the **weight **of the `i^th` item.
- The value of each item in `items` is **unique**.

Return *a 2D integer array* `ret` *where* `ret[i] = [value_i, weight_i]`*,* *with* `weight_i` *being the **sum of weights** of all items with value* `value_i`.

**Note:** `ret` should be returned in **ascending** order by value.

**Constraints:**
- `1 <= items1.length, items2.length <= 1000`
- `items1[i].length == items2[i].length == 2`
- `1 <= value_i, weight_i <= 1000`
- Each `value_i` in `items1` is **unique**.
- Each `value_i` in `items2` is **unique**.

---

## Examples

**Example 1:**
```
Input: items1 = [[1,1],[4,5],[3,8]], items2 = [[3,1],[1,5]]
Output: [[1,6],[3,9],[4,5]]
Explanation: The item with value = 1 occurs in items1 with weight = 1 and in items2 with weight = 5, total weight = 1 + 5 = 6.
The item with value = 3 occurs in items1 with weight = 8 and in items2 with weight = 1, total weight = 8 + 1 = 9.
The item with value = 4 occurs in items1 with weight = 5, total weight = 5.
Therefore, we return [[1,6],[3,9],[4,5]].
```

**Example 2:**
```
Input: items1 = [[1,1],[3,2],[2,3]], items2 = [[2,1],[3,2],[1,3]]
Output: [[1,4],[2,4],[3,4]]
Explanation: The item with value = 1 occurs in items1 with weight = 1 and in items2 with weight = 3, total weight = 1 + 3 = 4.
The item with value = 2 occurs in items1 with weight = 3 and in items2 with weight = 1, total weight = 3 + 1 = 4.
The item with value = 3 occurs in items1 with weight = 2 and in items2 with weight = 2, total weight = 2 + 2 = 4.
Therefore, we return [[1,4],[2,4],[3,4]].
```

**Example 3:**
```
Input: items1 = [[1,3],[2,2]], items2 = [[7,1],[2,2],[1,4]]
Output: [[1,7],[2,4],[7,1]]
Explanation: The item with value = 1 occurs in items1 with weight = 3 and in items2 with weight = 4, total weight = 3 + 4 = 7.
The item with value = 2 occurs in items1 with weight = 2 and in items2 with weight = 2, total weight = 2 + 2 = 4.
The item with value = 7 occurs in items2 with weight = 1, total weight = 1.
Therefore, we return [[1,7],[2,4],[7,1]].
```

---

## Key Insight

> Use a **hash map** (or sorted map) to aggregate weights by value. Iterate both arrays, summing weights for each value. Then sort by value.

---

## Approach

```
FUNCTION mergeSimilarItems(items1, items2):
    map ← {}
    FOR [val, weight] IN items1 DO
        map[val] ← map.GET(val, 0) + weight
    FOR [val, weight] IN items2 DO
        map[val] ← map.GET(val, 0) + weight
    
    result ← [[val, weight] FOR (val, weight) IN map]
    SORT result BY val
    RETURN result
```

---

## Walkthrough

```
items1 = [[1,1],[4,5],[3,8]], items2 = [[3,1],[1,5]]

After items1: map = {1:1, 4:5, 3:8}
After items2: map = {1:6, 4:5, 3:9}
Sorted: [[1,6],[3,9],[4,5]] ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Hash map + sort | **O((n+m) log(n+m))** | **O(n+m)** |

---

## Key Takeaway

> **Group-by aggregation** — use a map to sum values by key, then sort. A fundamental pattern for merging datasets.

---
