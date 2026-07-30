# 1198. Find Smallest Common Element in All Rows

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-smallest-common-element-in-all-rows](https://leetcode.com/problems/find-smallest-common-element-in-all-rows)
**Companies:** Amazon, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Count Occurrences — O(m·n) ✅](#4-approach-count-occurrences--omn-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an `m x n` matrix where each row is sorted in **non-decreasing** order, find the **smallest** element that appears in **all** rows. Return `-1` if no such element exists.

**Constraints:**
- `1 <= m, n <= 500`
- `1 <= mat[i][j] <= 10⁴`

---

## 2. Examples

```
Example 1:
  Input:  mat = [[1,2,3,4,5],[2,4,5,8,10],[3,5,7,9,11],[1,3,5,7,9]]
  Output: 5
  Reason: 5 appears in every row.

Example 2:
  Input:  mat = [[1,2,3],[4,5,6]]
  Output: -1
```

---

## 3. Key Insight

> Since rows are sorted, the smallest common element must appear in all rows. Count occurrences of each element across rows; the first element with count == m (number of rows) is the answer. Process elements in sorted order (left to right, row by row) to find the smallest.

---

## 4. Approach: Count Occurrences — O(m·n) ✅

```
FUNCTION smallestCommonElement(mat):
    count ← HashMap()
    m ← NUMBER_OF_ROWS(mat)

    FOR row IN mat DO
        FOR val IN row DO
            count[val] ← count.GET(val, 0) + 1
            IF count[val] == m THEN
                RETURN val

    RETURN -1
```

**Note:** Since rows are sorted and contain no duplicates per row, each value is counted once per row. We process columns left-to-right across all rows, so the first value reaching count `m` is the smallest.

**Alternative (handles duplicates per row):** Use a set per row to avoid double-counting.

---

## 5. Walkthrough

```
mat = [[1,2,3,4,5],[2,4,5,8,10],[3,5,7,9,11],[1,3,5,7,9]]
m = 4

Scanning column by column (val by val across all rows):
  1: count=1,  2: count=1,  3: count=1,  4: count=1,  5: count=1
  2: count=2,  4: count=2,  5: count=2,  8: count=1, 10: count=1
  3: count=2,  5: count=3,  7: count=1,  9: count=1, 11: count=1
  1: count=2,  3: count=3,  5: count=4 → RETURN 5 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n) — visit every element once |
| **Space** | O(m · n) — count map in worst case |

---

## 7. Follow-Up Questions

### 7.1 Can you use binary search?

Yes — for each candidate from the first row, binary search in every other row. O(m · n · log n) — worse asymptotically but uses O(1) extra space.

### 7.2 What about an m-way merge approach?

Use m pointers (one per row), advance the smallest pointer. When all pointers point to the same value, that's the answer. O(m · n) time, O(m) space.

### 7.3 What if rows may contain duplicates?

Track per-row contribution using a set or by checking if the previous value in the same row was the same.

---

## 8. Key Takeaway

> **Counting occurrences** across sorted rows is the simplest O(m·n) approach. The first element reaching count `m` is guaranteed to be the smallest common element due to sorted order.
