# 3537. Fill a Special Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fill-a-special-grid](https://leetcode.com/problems/fill-a-special-grid)
**Companies:** Google

---

## Problem Description

Fill a `2^n × 2^n` grid with numbers `0` to `2^(2n) - 1` such that for any two cells `(r1,c1)` and `(r2,c2)`: if `r1 ≤ r2` and `c1 ≤ c2`, then `grid[r1][c1] > grid[r2][c2]` (i.e., values decrease going down-right).

---

## Examples

**Example 1:**
```
Input: n = 1
Output: [[3,2],[1,0]]
Explanation: The 2×2 grid satisfies the decreasing property.
```

**Example 2:**
```
Input: n = 2
Output: [[15,14,13,12],[11,10,9,8],[7,6,5,4],[3,2,1,0]]
Explanation: The 4×4 grid follows the required ordering.
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
