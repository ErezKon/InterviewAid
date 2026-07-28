# 955. Delete Columns to Make Sorted II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-columns-to-make-sorted-ii](https://leetcode.com/problems/delete-columns-to-make-sorted-ii)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

Delete minimum columns so that the remaining rows are in lexicographic order.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| ["ca","bb","ac"] | 1 | Delete the second column to get ["c","b","a"] which is sorted. |
| ["abcdef","uvwxyz"] | 0 | Already sorted, no deletions needed. |

---

## Approach

```
FUNCTION minDeletionSize(strs):
    // Greedy column selection ensuring prefixes stay sorted
    n ← LENGTH(strs)
    m ← LENGTH(strs[0])
    cur ← ARRAY OF "" WITH SIZE n
    deletions ← 0
    FOR c ← 0 TO m - 1:
        temp ← []
        FOR i ← 0 TO n - 1:
            APPEND cur[i] + strs[i][c] TO temp
        IF temp = SORTED(temp):
            cur ← temp
        ELSE:
            deletions ← deletions + 1
    RETURN deletions
```

---

## Walkthrough

Consider the input ["ca","bb","ac"]:

1. Initialize `cur = ["","",""]`.
2. Column 0 ('c','b','a') → temp = ["c","b","a"]. Sorted? No ("a" < "b" < "c"), so delete column 0 → deletions=1.
3. Column 1 ('a','b','c') → temp = ["a","b","c"]. Sorted? Yes, keep column → cur = ["a","b","c"].
4. End of columns. Result = 1 deletion.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × m²) |
| **Space** | O(n × m) |

---

## Follow-Up Questions

- How would you adapt the algorithm if you could reorder columns instead of deleting them?
- Can you achieve O(n·m) time using a more advanced greedy strategy?

---

## Key Takeaway

> **Greedy column selection: try adding each column; if the resulting strings remain sorted, keep it. Otherwise, delete that column. Track accumulated prefixes.**