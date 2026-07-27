# 955. Delete Columns to Make Sorted II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-columns-to-make-sorted-ii](https://leetcode.com/problems/delete-columns-to-make-sorted-ii)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

Delete minimum columns so that the remaining rows are in lexicographic order.

---

## Approach

```
FUNCTION minDeletionSize(strs):
    n = len(strs); m = len(strs[0])
    // Greedy: try to keep each column, check if sorted
    cur = [""] * n
    deletions = 0
    FOR c ← 0 TO m - 1:
        temp = [cur[i] + strs[i][c] for i in range(n)]
        IF temp == sorted(temp): cur = temp
        ELSE: deletions += 1
    RETURN deletions
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × m²) |
| **Space** | O(n × m) |

---

## Key Takeaway

> **Greedy column selection: try adding each column; if the resulting strings remain sorted, keep it. Otherwise, delete that column. Track accumulated prefixes.**
