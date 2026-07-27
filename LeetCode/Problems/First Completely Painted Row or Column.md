# 2661. First Completely Painted Row or Column

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/first-completely-painted-row-or-column](https://leetcode.com/problems/first-completely-painted-row-or-column)
**Companies:** Amazon, Bloomberg, Citadel, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Position Map + Row/Col Counters — O(m·n) ✅](#3-approach-position-map--rowcol-counters)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a painting order `arr` and an `m × n` matrix `mat`, find the index in `arr` at which a full row or column is first completely painted.

**Constraints:**
- `m · n == arr.length`
- `1 <= m, n <= 10⁵`

---

## 2. Key Insight

> Precompute each value's position in the matrix. As we paint in order, increment row/column counters. Return when any counter hits its target.

---

## 3. Approach: Position Map + Row/Col Counters — O(m·n) ✅

```
FUNCTION firstCompleteIndex(arr, mat):
    pos = {}
    FOR r, row IN enumerate(mat):
        FOR c, val IN enumerate(row):
            pos[val] = (r, c)

    rowCount = [0] * m; colCount = [0] * n
    FOR i, val IN enumerate(arr):
        r, c = pos[val]
        rowCount[r] += 1
        colCount[c] += 1
        IF rowCount[r] == n OR colCount[c] == m:
            RETURN i
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n) |
| **Space** | O(m · n) — position map |

---

## 5. Key Takeaway

> **Position lookup + row/column counters** — paint in order, check completion on each step. O(m·n) single pass.
