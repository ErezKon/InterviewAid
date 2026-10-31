# 944. Delete Columns to Make Sorted

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-columns-to-make-sorted](https://leetcode.com/problems/delete-columns-to-make-sorted)
**Companies:** Amazon, Garmin, Google, Meta

---

## Problem Description

You are given an array of `n` strings `strs`, all of the same length.

The strings can be arranged such that there is one on each line, making a grid.

- For example, `strs = ["abc", "bce", "cae"]` can be arranged as follows:

```
abc
bce
cae
```

You want to **delete** the columns that are **not sorted lexicographically**. In the above example (**0-indexed**), columns 0 (`'a'`, `'b'`, `'c'`) and 2 (`'c'`, `'e'`, `'e'`) are sorted, while column 1 (`'b'`, `'c'`, `'a'`) is not, so you would delete column 1.

Return *the number of columns that you will delete*.

**Constraints:**

- `n == strs.length`
- `1 <= n <= 100`
- `1 <= strs[i].length <= 1000`
- `strs[i]` consists of lowercase English letters.

---

## Examples

```
Example 1:
  Input: strs = ["cba","daf","ghi"]
  Output: 1
  Explanation: The grid looks as follows:
    cba
    daf
    ghi
  Columns 0 and 2 are sorted, but column 1 is not, so you only need to delete 1 column.
```

```
Example 2:
  Input: strs = ["a","b"]
  Output: 0
  Explanation: The grid looks as follows:
    a
    b
  Column 0 is the only column and is sorted, so you will not delete any columns.
```

```
Example 3:
  Input: strs = ["zyx","wvu","tsr"]
  Output: 3
  Explanation: The grid looks as follows:
    zyx
    wvu
    tsr
  All 3 columns are not sorted, so you will delete all 3.
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

The algorithm scans each column `c`. For column 1 it finds `a < b` at rows 1 and 0, increments `count` and breaks early. After scanning all columns, `count = 1`.

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