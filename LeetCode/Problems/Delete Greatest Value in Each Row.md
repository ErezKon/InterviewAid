# 2500. Delete Greatest Value in Each Row

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-greatest-value-in-each-row](https://leetcode.com/problems/delete-greatest-value-in-each-row)
**Companies:** Amazon, Google

---

## Problem Description

Repeatedly remove the max from each row simultaneously and add the overall max of removed values to the answer. Continue until the grid is empty.

---

## Approach

```
FUNCTION deleteGreatestValue(grid):
    FOR each row: SORT row
    answer = 0
    FOR col ← m-1 DOWN TO 0:
        answer += MAX(grid[r][col] for all r)
    RETURN answer
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × m log m) for sorting |
| **Space** | O(1) |

---

## Key Takeaway

> **Sort each row. The max removed at step `i` from each row is its `(m-i)`th largest element. After sorting, iterate columns right to left, taking the column max.**
