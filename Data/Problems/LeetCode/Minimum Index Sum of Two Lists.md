# 599. Minimum Index Sum of Two Lists

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-index-sum-of-two-lists](https://leetcode.com/problems/minimum-index-sum-of-two-lists)
**Companies:** Amazon, Bloomberg, Google, Yelp

---

## Problem Description

Given two arrays of strings `list1` and `list2`, find the **common strings with the least index sum**.

A **common string** is a string that appeared in both `list1` and `list2`.

A **common string with the least index sum** is a common string such that if it appeared at `list1[i]` and `list2[j]` then `i + j` should be the minimum value among all the other **common strings**.

Return *all the **common strings with the least index sum***. Return the answer in **any order**.

**Constraints:**
- `1 <= list1.length, list2.length <= 1000`
- `1 <= list1[i].length, list2[i].length <= 30`
- `list1[i]` and `list2[i]` consist of spaces `' '` and English letters.
- All the strings of `list1` are **unique**.
- All the strings of `list2` are **unique**.
- There is at least a common string between `list1` and `list2`.

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
Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]
Output: ["Shogun"]
Explanation: The only common string is "Shogun".
```

**Example 2:**
```
Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["KFC","Shogun","Burger King"]
Output: ["Shogun"]
Explanation: The common string with the least index sum is "Shogun" with index sum = (0 + 1) = 1.
```

**Example 3:**
```
Input: list1 = ["happy","sad","good"], list2 = ["sad","happy","good"]
Output: ["sad","happy"]
Explanation: There are three common strings:
"happy" with index sum = (0 + 1) = 1.
"sad" with index sum = (1 + 0) = 1.
"good" with index sum = (2 + 2) = 4.
The strings with the least index sum are "sad" and "happy".
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
