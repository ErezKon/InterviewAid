# 1240. Tiling a Rectangle with the Fewest Squares

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/tiling-a-rectangle-with-the-fewest-squares](https://leetcode.com/problems/tiling-a-rectangle-with-the-fewest-squares)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description
Given an `n × m` rectangle, tile it completely with the fewest number of integer‑sided squares. Each placed square must lie entirely inside the rectangle and cannot overlap another square. Return the minimum count of squares needed.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 2, m = 3` | `3` | Tile with three `1×1` squares or one `2×2` and two `1×1` squares; the minimum is 3. |
| `n = 5, m = 8` | `5` | An optimal tiling uses squares of sizes `5,3,2,2,1`. |

## Approach
Apply backtracking with aggressive pruning:
1. Keep a 2‑D boolean grid of filled cells.
2. At each step, locate the top‑leftmost empty cell.
3. Try placing the largest possible square (limited by remaining width/height and empty space).
4. Recurse, updating the grid and the count of squares used.
5. Prune branches where the current count already exceeds the best known solution.

```text
FUNCTION tilingRectangle(n, m):
    SET best ← n * m  // worst case: all 1×1 squares
    CREATE grid[n][m] initialized FALSE
    CALL dfs(grid, 0)
    RETURN best

FUNCTION dfs(grid, used):
    IF used ≥ best:
        RETURN
    SET (r, c) ← findFirstEmpty(grid)
    IF r = -1:  // no empty cell
        SET best ← MIN(best, used)
        RETURN
    SET maxSize ← MIN(n - r, m - c)
    FOR size FROM maxSize DOWNTO 1:
        IF canPlace(grid, r, c, size):
            CALL place(grid, r, c, size, TRUE)
            CALL dfs(grid, used + 1)
            CALL place(grid, r, c, size, FALSE)
```

## Walkthrough
Consider `n = 2, m = 3`.
| Step | Action | Grid after action |
|------|--------|-------------------|
| 1 | Find first empty (0,0), maxSize=2 → try size=2 (cannot fit height 2, width 2) | – |
| 2 | Try size=1 at (0,0), place it | `X . .` / `. . .` |
| 3 | Recurse: first empty (0,1), maxSize=2 → place size=1 | `X X .` / `. . .` |
| 4 | Recurse: first empty (0,2), place size=1 → grid full, used=3, update best=3 |

## Complexity Analysis
*Time*: Exponential in the worst case; pruning dramatically reduces the search space for typical inputs. 
*Space*: `O(n*m)` for the grid plus recursion stack depth ≤ number of squares placed.

## Follow‑Up Questions
1. Can dynamic programming be applied for special cases (e.g., when `n` divides `m`)?
2. How would you modify the algorithm to also return the actual placement of squares?
3. What heuristics improve pruning for larger rectangles?

## Key Takeaway
Backtracking with a “place the largest possible square first” heuristic and early pruning yields an efficient search for the minimal tiling of a rectangle.
