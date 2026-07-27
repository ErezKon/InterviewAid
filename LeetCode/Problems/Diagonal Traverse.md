# 498. Diagonal Traverse

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/diagonal-traverse](https://leetcode.com/problems/diagonal-traverse)
**Companies:** Amazon, Bloomberg, Cisco, Google, Liftoff, Meta, Microsoft, Nike, Oracle, Tiktok, Walmart Labs, Zoho

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Simulation — O(m·n)](#approach-simulation--omn)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` matrix `mat`, return all elements in **diagonal order** — alternating between going up-right and down-left.

```
Example traversal for 3×3:
  1 → 2   4
      ↑ ↙ ↑ ↙
      3   5   7
        ↗   ↗ ↓
      6 → 8   9
```

**Constraints:**
- `1 <= m, n <= 10^4`
- `1 <= m × n <= 10^4`

---

## Examples

**Example 1:**
```
Input: mat = [[1,2,3],
              [4,5,6],
              [7,8,9]]
Output: [1, 2, 4, 7, 5, 3, 6, 8, 9]
```

**Example 2:**
```
Input: mat = [[1,2],[3,4]]
Output: [1, 2, 3, 4]
```

---

## Key Insight

> Alternate direction on each diagonal. The tricky part is **boundary handling** when you hit a wall. Priority matters: check column boundary before row boundary when going up, and row boundary before column boundary when going down.

---

## Approach: Simulation — O(m·n) ✅

Alternate direction on each diagonal. Handle boundary conditions carefully.

```
FUNCTION findDiagonalOrder(mat):
    m, n = dimensions
    result = []
    r, c = 0, 0
    goingUp = true

    FOR _ ← 0 TO m*n - 1:
        result.ADD(mat[r][c])

        IF goingUp:
            IF c == n-1: r += 1; goingUp = false
            ELSE IF r == 0: c += 1; goingUp = false
            ELSE: r -= 1; c += 1
        ELSE:
            IF r == m-1: c += 1; goingUp = true
            ELSE IF c == 0: r += 1; goingUp = true
            ELSE: r += 1; c -= 1

    RETURN result
```

**Boundary priority is critical:**
- Going up: check **right wall** (`c == n-1`) before **top wall** (`r == 0`) — the corner `(0, n-1)` should go down, not right.
- Going down: check **bottom wall** (`r == m-1`) before **left wall** (`c == 0`).

---

## Walkthrough

```
mat = [[1,2,3],[4,5,6],[7,8,9]]
```

| Step | (r,c) | Value | Direction | Boundary? | Next |
|------|-------|-------|-----------|-----------|------|
| 1 | (0,0) | 1 | ↗ up | r=0 → flip | (0,1) |
| 2 | (0,1) | 2 | ↙ down | c=0? No, r=0? → goes ↙ | wait — r=0, flip happened |
| 3 | (1,0) | 4 | ↙ down | c=0 → flip | (2,0) |
| 4 | (2,0) | 7 | ↗ up | — | (1,1) |
| 5 | (1,1) | 5 | ↗ up | — | (0,2) |
| 6 | (0,2) | 3 | ↗ up | c=n-1 → flip | (1,2) |
| 7 | (1,2) | 6 | ↙ down | r=m-1? No → c? | wait, going down... (2,1) |
| 8 | (2,1) | 8 | ↙ down | r=m-1 → flip | (2,2) |
| 9 | (2,2) | 9 | ↗ up | done | — |

Output: `[1, 2, 4, 7, 5, 3, 6, 8, 9]` ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(m × n) | Visit each cell exactly once |
| **Space** | O(1) | Excluding output array |

---

## Follow-Up Questions

**Q1: Why does boundary check order matter?**
> At corners like `(0, n-1)`, both `r == 0` and `c == n-1` are true. Checking `c == n-1` first ensures we move down (correct), not right (out of bounds).

**Q2: How does this differ from Diagonal Traverse II (LC 1424)?**
> LC 498 is rectangular with alternating directions. LC 1424 is jagged with consistent bottom-left → top-right direction.

**Q3: Can you solve it by grouping diagonals instead?**
> Yes — group by `r + c`, reverse every other group, then concatenate. Both approaches are O(m×n).

---

## Key Takeaway

> **Diagonal traversal with alternating directions is a simulation problem — the core challenge is getting boundary conditions right by checking the "further" boundary first at corners.**
