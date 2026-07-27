# 944. Delete Columns to Make Sorted

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-columns-to-make-sorted](https://leetcode.com/problems/delete-columns-to-make-sorted)
**Companies:** Amazon, Garmin, Google, Meta

---

## Problem Description

Count columns that are not sorted in non-decreasing order across all rows.

---

## Approach

```
FUNCTION minDeletionSize(strs):
    count = 0
    FOR c ← 0 TO len(strs[0]) - 1:
        FOR r ← 1 TO len(strs) - 1:
            IF strs[r][c] < strs[r-1][c]:
                count += 1
                BREAK
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × m) |
| **Space** | O(1) |

---

## Key Takeaway

> **Check each column independently: if any adjacent pair is out of order, count it as unsorted. Simple column-wise scan.**
