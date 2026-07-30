# 2387. Median of a Row Wise Sorted Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/median-of-a-row-wise-sorted-matrix](https://leetcode.com/problems/median-of-a-row-wise-sorted-matrix)
**Companies:** De Shaw

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` matrix where each **row** is sorted in non-decreasing order and `m × n` is odd, find the **median** element of the matrix.

**Constraints:**
- `1 ≤ m, n ≤ 500`
- `m * n` is odd
- `1 ≤ matrix[i][j] ≤ 10⁶`

---

## Examples

**Example 1:**
```
Input:  matrix = [[1,3,5],[2,6,9],[3,6,9]]
Output: 5
Explanation: Sorted: [1,2,3,3,5,6,6,9,9]. Median = 5.
```

---

## Key Insight

> Binary search on the **value** (not index). For a candidate value `mid`, count how many elements in the matrix are ≤ `mid` using binary search within each sorted row. The median is the smallest value where this count ≥ `(m*n + 1) / 2`.

---

## Approach

```
FUNCTION matrixMedian(matrix):
    m ← ROWS(matrix)
    n ← COLS(matrix)
    lo ← 1
    hi ← 10⁶
    target ← (m * n + 1) / 2
    
    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        count ← 0
        FOR row IN matrix DO
            count ← count + UPPER_BOUND(row, mid)  // elements ≤ mid
        
        IF count < target THEN
            lo ← mid + 1
        ELSE
            hi ← mid
    
    RETURN lo
```

---

## Walkthrough

```
matrix = [[1,3,5],[2,6,9],[3,6,9]]
target = (9+1)/2 = 5

lo=1, hi=10⁶

mid=500000: count=9 ≥ 5 → hi=500000
...converges...
mid=5: count per row: [3, 1, 1] = 5 ≥ 5 → hi=5
mid=4: count per row: [2, 1, 1] = 4 < 5 → lo=5
lo=hi=5 → Return 5 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search on value | **O(m · log(n) · log(maxVal))** | **O(1)** |
| Flatten + sort | O(mn · log(mn)) | O(mn) |

---

## Follow-Up Questions

1. **Why binary search on value instead of index?** Rows are independently sorted — there's no global ordering by index, but we can count elements ≤ any value efficiently.
2. **What if the matrix is both row and column sorted?** Same approach works. Could also use a min-heap of row pointers.
3. **What if m*n is even?** Find the two middle values separately and average them.

---

## Key Takeaway

> **Binary search on the answer + per-row binary search counting** — when data is partially sorted (row-wise), binary search on the value domain with a counting oracle is the optimal approach.

---
