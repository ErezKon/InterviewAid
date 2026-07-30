# 944. Delete Columns to Make Sorted

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-columns-to-make-sorted](https://leetcode.com/problems/delete-columns-to-make-sorted)
**Companies:** Amazon, Garmin, Google, Meta

---

## Problem Description

Count columns that are not sorted in non-decreasing order across all rows.

---

## Examples

**Example 1:**
```
Input: strs = ["cba","daf","ghi"]
Output: 1
Explanation: Column 0 ("c", "d", "g") is sorted, column 1 ("b", "a", "h") is not, column 2 ("a", "f", "i") is sorted. Only column 1 needs deletion.
```

**Example 2:**
```
Input: strs = ["a","b"]
Output: 0
Explanation: All columns are already sorted.
```

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

## Walkthrough

Consider the first example `strs = ["cba","daf","ghi"]`.
| Column | Characters | Sorted? |
|--------|------------|---------|
| 0 | c, d, g | ✅ |
| 1 | b, a, h | ❌ (b > a) |
| 2 | a, f, i | ✅ |

The algorithm scans each column `c`. For column 1 it finds `a < b` at rows 1 and 0, increments `count` and breaks early. After scanning all columns, `count = 1`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × m) |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you modify the solution to return the list of unsorted column indices?
2. Can the approach be extended to handle Unicode characters with custom ordering?
3. What if the rows have varying lengths?

---

## Key Takeaway

> **Check each column independently: if any adjacent pair is out of order, count it as unsorted. Simple column-wise scan.**