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

Given two 2D arrays `items1` and `items2` where each entry is `[value, weight]`, merge items with the same `value` by summing their `weight`s. Return the result sorted by `value`.

**Constraints:**
- `1 ≤ items1.length, items2.length ≤ 1000`
- `1 ≤ value, weight ≤ 1000`

---

## Examples

**Example 1:**
```
Input:  items1 = [[1,1],[4,5],[3,8]], items2 = [[3,1],[1,5]]
Output: [[1,6],[3,9],[4,5]]
Explanation: value 1: 1+5=6, value 3: 8+1=9, value 4: 5.
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
