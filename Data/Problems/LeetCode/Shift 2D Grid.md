# 1260. Shift 2D Grid

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shift-2d-grid](https://leetcode.com/problems/shift-2d-grid)
**Companies:** Amazon

---

## Problem Description

Given a 2D `grid` of size `m x n` and an integer `k`. You need to shift the `grid` `k` times.

In one shift operation:

- Element at `grid[i][j]` moves to `grid[i][j + 1]`.
- Element at `grid[i][n - 1]` moves to `grid[i + 1][0]`.
- Element at `grid[m - 1][n - 1]` moves to `grid[0][0]`.

Return the *2D grid* after applying shift operation `k` times.

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m <= 50`
- `1 <= n <= 50`
- `-1000 <= grid[i][j] <= 1000`
- `0 <= k <= 100`

---

## Examples

```
Example 1:
  Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
  Output: [[9,1,2],[3,4,5],[6,7,8]]
```

```
Example 2:
  Input: grid = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4
  Output: [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]
```

```
Example 3:
  Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 9
  Output: [[1,2,3],[4,5,6],[7,8,9]]
```

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
