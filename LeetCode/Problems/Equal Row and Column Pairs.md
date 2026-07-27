# 2352. Equal Row and Column Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/equal-row-and-column-pairs](https://leetcode.com/problems/equal-row-and-column-pairs)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Hash Map of Row Tuples](#approach-hash-map-of-row-tuples--on²-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `n × n` integer matrix `grid`, return the number of pairs `(r, c)` where row `r` and column `c` are **equal** (same elements in same order).

---

## Examples

```
Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
Output: 1
Explanation: Row 2 = [2,7,7], Column 2 = [1,6,7] ✗; Row 1 = [1,7,6], Column 1 = [2,7,7] ✗
  Row 0 = [3,2,1], Column 0 = [3,1,2] ✗. Only match: row with col that are equal.
```

---

## Key Insight

> Convert each row to a tuple and count frequencies in a hash map. Then convert each column to a tuple and look up how many rows match it. This avoids O(n³) brute force.

---

## Approach: Hash Map of Row Tuples — O(n²) ✅

```
FUNCTION equalPairs(grid):
    n = len(grid)
    rowMap = Counter()
    FOR row IN grid:
        rowMap[tuple(row)] += 1

    count = 0
    FOR c ← 0 TO n - 1:
        col = tuple(grid[r][c] for r in range(n))
        count += rowMap[col]

    RETURN count
```

---

## Walkthrough

```
grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]

Row tuples:
  (3,1,2,2): 1, (1,4,4,5): 1, (2,4,2,2): 2

Column tuples:
  col0 = (3,1,2,2) → rowMap[(3,1,2,2)] = 1 → count += 1
  col1 = (1,4,4,4) → 0
  col2 = (2,4,2,2) → rowMap[(2,4,2,2)] = 2 → count += 2
  col3 = (2,5,2,2) → 0

Result: 3 ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n²) — build row map + check each column |
| **Space** | O(n²) — storing row tuples |

---

## Key Takeaway

> **Use tuple hashing to compare rows with columns efficiently. Counter for row frequencies + column lookup gives O(n²) instead of brute-force O(n³).**
