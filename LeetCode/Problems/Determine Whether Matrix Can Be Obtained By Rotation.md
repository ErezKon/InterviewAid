# 1886. Determine Whether Matrix Can Be Obtained By Rotation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation](https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Rotate and Compare](#approach-rotate-and-compare)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two `n × n` binary matrices `mat` and `target`, return `true` if it is possible to make `mat` equal to `target` by rotating `mat` by **0°, 90°, 180°, or 270°** clockwise.

**Constraints:**
- `n == mat.length == target.length`
- `1 <= n <= 10`
- `mat[i][j]` and `target[i][j]` are either `0` or `1`.

---

## Examples

**Example 1:**
```
mat =    [[0,1],    target = [[1,0],
          [1,0]]               [0,1]]

Output: true (90° clockwise rotation)
```

**Example 2:**
```
mat =    [[0,1],    target = [[1,0],
          [1,1]]               [0,1]]

Output: false (no rotation matches)
```

---

## Key Insight

> There are only **4 possible rotations** (0°, 90°, 180°, 270°). Simply rotate `mat` up to 3 times and compare with `target` each time. A 90° clockwise rotation maps `(i, j) → (j, n-1-i)`.

---

## Approach: Rotate and Compare ✅

```
FUNCTION findRotation(mat, target):
    FOR _ ← 0 TO 3:
        IF mat == target: RETURN true
        mat = rotate90(mat)
    RETURN false

FUNCTION rotate90(m):
    RETURN [list(row) for row in zip(*m[::-1])]
```

The `zip(*m[::-1])` trick: reverse the rows, then transpose. This is a standard 90° clockwise rotation.

```
Original:       Reverse rows:    Transpose:
1 2 3           7 8 9            7 4 1
4 5 6    →      4 5 6     →     8 5 2
7 8 9           1 2 3            9 6 3
```

---

## Walkthrough

```
mat = [[0,1],[1,0]],  target = [[1,0],[0,1]]
```

| Rotation | mat state | == target? |
|----------|-----------|------------|
| 0°       | `[[0,1],[1,0]]` | ✗ |
| 90° CW   | `[[1,0],[0,1]]` | ✅ → return true |

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n²) | At most 4 rotations, each O(n²) |
| **Space** | O(n²) | New matrix for each rotation |

---

## Follow-Up Questions

**Q1: Can you do it in-place?**
> Yes — rotate in-place by transposing + reversing rows. But for n ≤ 10, creating new matrices is fine.

**Q2: How does the rotation formula work element-wise?**
> 90° CW: `new[j][n-1-i] = old[i][j]`. Equivalently, reverse rows then transpose.

**Q3: What about counter-clockwise or reflections?**
> CCW 90° = CW 270°, so it's covered. Reflections (flips) would require separate checks and aren't part of this problem.

---

## Key Takeaway

> **For small finite transformation groups (4 rotations), brute-force enumeration is optimal — apply each transformation and compare.**
