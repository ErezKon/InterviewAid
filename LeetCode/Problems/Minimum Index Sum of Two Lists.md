# 599. Minimum Index Sum of Two Lists

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-index-sum-of-two-lists](https://leetcode.com/problems/minimum-index-sum-of-two-lists)
**Companies:** Amazon, Bloomberg, Google, Yelp

---

## Problem Description

Given two lists of strings, find common strings with the **minimum index sum** (sum of indices in both lists).

## Approach: HashMap — O(n + m) ✅

```
FUNCTION findRestaurant(list1, list2):
    index1 = {s: i for i, s in enumerate(list1)}
    minSum = infinity; result = []
    FOR j, s IN enumerate(list2):
        IF s IN index1:
            total = index1[s] + j
            IF total < minSum:
                minSum = total
                result = [s]
            ELSE IF total == minSum:
                result.ADD(s)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n + m) | O(n) |

## Key Takeaway

> Map one list's strings to indices, scan the other to find common strings with minimum index sum — standard hashmap intersection pattern.
