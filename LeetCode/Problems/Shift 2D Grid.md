# 1260. Shift 2D Grid

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shift-2d-grid](https://leetcode.com/problems/shift-2d-grid)
**Companies:** Amazon

---

## Problem Description

Given an `m × n` grid, shift all elements `k` times: each shift moves every element one position right, wrapping the last column to the first column of the next row.

---

## Examples

**Example 1:**
```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[9,1,2],[3,4,5],[6,7,8]]
```
Explanation: Each element moves one step to the right; the last element of a row moves to the first column of the next row, and the bottom‑right element wraps to the top‑left.

**Example 2:**
```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 9
Output: [[1,2,3],[4,5,6],[7,8,9]]
```
Explanation: Shifting `m·n` times returns the original grid.

---

## Approach

```
FUNCTION shiftGrid(grid, k):
    m, n ← dimensions of grid
    flat ← flatten grid to 1D list
    k ← k % (m * n)
    flat ← flat[-k:] + flat[:-k]  // rotate right by k
    RETURN reshape flat back to m × n matrix
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## Walkthrough

| Step | Flat List Before | Operation | Flat List After |
|------|------------------|-----------|-----------------|
| 1 | [1,2,3,4,5,6,7,8,9] | k = 1 → rotate right by 1 | [9,1,2,3,4,5,6,7,8] |
| 2 | Reshape to 3×3 | Convert back to rows | [[9,1,2],[3,4,5],[6,7,8]] |

---

## Complexity Analysis

- **Time:** O(m·n) – flattening, rotating, and reshaping each touch every element once.
- **Space:** O(m·n) – auxiliary 1‑D list holds all elements.

---

## Follow‑Up Questions

1. How would you perform the shift **in‑place** without extra O(m·n) space?
2. Can you extend the solution to support **left** shifts as well?
3. What if the grid is **sparse** and stored as a list of coordinates?

---

## Key Takeaway

> Flatten to 1D, rotate, reshape back. The 1D index mapping is `newIdx = (oldIdx + k) % (m*n)`.
