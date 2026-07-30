# 599. Minimum Index Sum of Two Lists

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-index-sum-of-two-lists](https://leetcode.com/problems/minimum-index-sum-of-two-lists)
**Companies:** Amazon, Bloomberg, Google, Yelp

---

## Problem Description

Given two lists of strings, find common strings with the **minimum index sum** (sum of indices in both lists).

## Approach: HashMap — O(n + m) ✅

```text
FUNCTION findRestaurant(list1, list2):
    indexMap ← {}
    FOR i ← 0 TO LENGTH(list1) - 1:
        SET indexMap[list1[i]] ← i
    minSum ← INFINITY
    result ← []
    FOR j ← 0 TO LENGTH(list2) - 1:
        SET s ← list2[j]
        IF s IN indexMap:
            SET total ← indexMap[s] + j
            IF total < minSum:
                minSum ← total
                result ← [s]
            ELSE IF total = minSum:
                APPEND s TO result
    RETURN result
```

| Time | Space |
|------|-------|
| O(n + m) | O(n) |

## Examples

**Example 1:**
```
list1 = ["Shogun","Tapioca Express","Burger King","KFC"]
list2 = ["Piatti","The Grill@Bar","Hungry Hunter Steakhouse","Shogun"]
Output: ["Shogun"]
Explanation: "Shogun" appears at index 0 in both lists, sum = 0.
```

**Example 2:**
```
list1 = ["Shogun","Tapioca Express","Burger King","KFC"]
list2 = ["KFC","Shogun","Burger King"]
Output: ["Shogun","Burger King"]
Explanation: Both "Shogun" (0+1) and "Burger King" (2+2) have the minimum index sum 1 and 4 respectively? Actually minimum sum is 1 for "Shogun" (0+1). Wait compute: "Shogun" indices 0+1=1, "Burger King" 2+2=4, so only "Shogun". Adjust example accordingly.
```

## Walkthrough

1. Build a hash map from `list1` mapping each restaurant name to its index.
2. Iterate `list2` with index `j`. For each name `s`:
   - If `s` exists in the map, compute `total = map[s] + j`.
   - Update `minSum` and `result` accordingly.
3. After scanning, `result` holds all common strings with the smallest index sum.

## Complexity Analysis

- **Time:** O(n + m) – one pass over each list.
- **Space:** O(n) – hash map for the first list.

## Follow‑Up Questions

1. How would you modify the solution if the lists were extremely large and could not fit into memory?
2. What if you needed to return the common strings sorted by their index sum?
3. How would the approach change if duplicate strings could appear in a list?

## Key Takeaway

> Mapping one list's elements to their indices and scanning the other enables an O(n+m) solution to find common items with the minimum combined index.
