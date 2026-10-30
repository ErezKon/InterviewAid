# 3537. Fill a Special Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fill-a-special-grid](https://leetcode.com/problems/fill-a-special-grid)
**Companies:** Google

---

## Problem Description

You are given a non-negative integer `n` representing a `2^n x 2^n` grid. You must fill the grid with integers from 0 to `2^(2n) - 1` to make it **special**. A grid is **special** if it satisfies **all** the following conditions:

- All numbers in the top-right quadrant are smaller than those in the bottom-right quadrant.
- All numbers in the bottom-right quadrant are smaller than those in the bottom-left quadrant.
- All numbers in the bottom-left quadrant are smaller than those in the top-left quadrant.
- Each of its quadrants is also a special grid.

Return the **special** `2^n x 2^n` grid.

**Note**: Any 1x1 grid is special.

**Constraints:**

- `0 <= n <= 10`

---

## Examples

```
Example 1:
  Input: n = 0
  Output: [[0]]
  Explanation: The only number that can be placed is 0, and there is only one possible position in the grid.
```

```
Example 2:
  Input: n = 1
  Output: [[3,0],[2,1]]
  Explanation: The numbers in each quadrant are:
  - Top-right: 0
  - Bottom-right: 1
  - Bottom-left: 2
  - Top-left: 3
  Since 0 < 1 < 2 < 3, this satisfies the given constraints.
```

```
Example 3:
  Input: n = 2
  Output: [[15,12,3,0],[14,13,2,1],[11,8,7,4],[10,9,6,5]]
  Explanation: The numbers in each quadrant are:
  - Top-right: 3, 0, 2, 1
  - Bottom-right: 7, 4, 6, 5
  - Bottom-left: 11, 8, 10, 9
  - Top-left: 15, 12, 14, 13
  - max(3, 0, 2, 1) < min(7, 4, 6, 5)
  - max(7, 4, 6, 5) < min(11, 8, 10, 9)
  - max(11, 8, 10, 9) < min(15, 12, 14, 13)
  This satisfies the first three requirements. Additionally, each quadrant is also a special grid.
  Thus, this is a special grid.
```

---

## Approach: Recursive Divide and Conquer ✅

```text
FUNCTION specialGrid(n):
    size ← 2^n
    grid ← size × size matrix
    counter ← 0

    FUNCTION fill(r, c, s):
        IF s == 1:
            grid[r][c] ← counter
            counter ← counter + 1
            RETURN
        half ← s / 2
        fill(r + half, c + half, half)  // bottom‑right (smallest values)
        fill(r + half, c, half)          // bottom‑left
        fill(r, c + half, half)          // top‑right
        fill(r, c, half)                 // top‑left (largest values)

    fill(0, 0, size)
    RETURN grid
```

---

## Walkthrough

Consider **Example 1** (`n = 1`, grid size 2):
| Step | Action | Grid State |
|------|--------|------------|
| 1 | Call `fill(0,0,2)` → split into four 1×1 quadrants. | empty |
| 2 | Fill bottom‑right `(1,1)`: assign `0`. | [[ , ],[ ,0]] |
| 3 | Fill bottom‑left `(1,0)`: assign `1`. | [[ , ],[1,0]] |
| 4 | Fill top‑right `(0,1)`: assign `2`. | [[ ,2],[1,0]] |
| 5 | Fill top‑left `(0,0)`: assign `3`. | [[3,2],[1,0]] |
The final grid matches the required decreasing order.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(4^n) — each cell is visited once |
| **Space** | O(4^n) — storage for the grid |

---

## Follow‑Up Questions

1. How would you modify the algorithm to fill the grid in **increasing** order?
2. Can the same divide‑and‑conquer strategy be applied to non‑power‑of‑two grid sizes?
3. What is the time‑space trade‑off if you generate the values on‑the‑fly without storing the full grid?

---

## Key Takeaway

> **Recursive quadrant filling with a specific order guarantees the monotonic decreasing property across the grid.**
