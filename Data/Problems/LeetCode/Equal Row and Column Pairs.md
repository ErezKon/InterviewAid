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

Given a **0-indexed** `n x n` integer matrix `grid`, *return the number of pairs* `(r_i, c_j)` *such that row* `r_i` *and column* `c_j` *are equal*.

A row and column pair is considered equal if they contain the same elements in the same order (i.e., an equal array).

**Constraints:**
- `n == grid.length == grid[i].length`
- `1 <= n <= 200`
- `1 <= grid[i][j] <= 10^5`

---

## Examples

```
Example 1:
  Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
  Output: 1
  Explanation: There is 1 equal row and column pair:
  - (Row 2, Column 1): [2,7,7]
```

```
Example 2:
  Input: grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
  Output: 3
  Explanation: There are 3 equal row and column pairs:
  - (Row 0, Column 0): [3,1,2,2]
  - (Row 2, Column 2): [2,4,2,2]
  - (Row 3, Column 2): [2,4,2,2]
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
