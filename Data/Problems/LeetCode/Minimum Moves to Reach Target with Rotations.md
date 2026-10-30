# 1210. Minimum Moves to Reach Target with Rotations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations](https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations)
**Companies:** Kakao

---

## Problem Description

In an `n*n` grid, there is a snake that spans 2 cells and starts moving from the top left corner at `(0, 0)` and `(0, 1)`. The grid has empty cells represented by zeros and blocked cells represented by ones. The snake wants to reach the lower right corner at `(n-1, n-2)` and `(n-1, n-1)`.

In one move the snake can:

- Move one cell to the right if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.
- Move down one cell if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.
- Rotate clockwise if it's in a horizontal position and the two cells under it are both empty. In that case the snake moves from `(r, c)` and `(r, c+1)` to `(r, c)` and `(r+1, c)`.**
  ![img](https://assets.leetcode.com/uploads/2019/09/24/image-2.png)
- Rotate counterclockwise if it's in a vertical position and the two cells to its right are both empty. In that case the snake moves from `(r, c)` and `(r+1, c)` to `(r, c)` and `(r, c+1)`.**
  ![img](https://assets.leetcode.com/uploads/2019/09/24/image-1.png)

Return the minimum number of moves to reach the target.

If there is no way to reach the target, return `-1`.

**Constraints:**
- `2 <= n <= 100`
- `0 <= grid[i][j] <= 1`
- It is guaranteed that the snake starts at empty cells.

## Examples

**Example 1:**
```
![img](https://assets.leetcode.com/uploads/2019/09/24/image.png)
Input: grid = [[0,0,0,0,0,1],
               [1,1,0,0,1,0],
               [0,0,0,0,1,1],
               [0,0,1,0,1,0],
               [0,1,1,0,0,0],
               [0,1,1,0,0,0]]
Output: 11
Explanation: One possible solution is [right, right, rotate clockwise, right, down, down, down, down, rotate counterclockwise, right, down].
```

**Example 2:**
```
Input: grid = [[0,0,1,1,1,1],
               [0,0,0,0,1,1],
               [1,1,0,0,0,1],
               [1,1,1,0,0,1],
               [1,1,1,0,0,1],
               [1,1,1,0,0,0]]
Output: 9
```

## Approach

**Algorithm:** Breadth‑First Search (BFS) on a state space that includes the snake’s head position and its orientation (horizontal = 0, vertical = 1).

**Key Insight:** The snake’s movement depends on both cells it occupies, so the state must capture orientation. Rotations are only allowed when the 2×2 block around the head is free.

```text
FUNCTION minimumMoves(grid):
    n ← LENGTH(grid)
    start ← (0, 0, 0)               // row, col of head, orientation
    target ← (n-1, n-2, 0)
    queue ← [(start, 0)]            // (state, moves)
    visited ← {start}
    WHILE queue NOT EMPTY:
        (r, c, orient), moves ← queue.DEQUEUE()
        IF (r, c, orient) == target: RETURN moves
        // generate possible moves
        FOR each (nr, nc, nOrient) in validNextStates(r, c, orient, grid):
            IF (nr, nc, nOrient) NOT IN visited:
                visited.ADD((nr, nc, nOrient))
                queue.ENQUEUE(((nr, nc, nOrient), moves + 1))
    RETURN -1
```

## Walkthrough

Consider the first example grid. The snake starts at `(0,0)` horizontal.
1. **Move Right** → head at `(0,1)`. Both cells `(0,0)` and `(0,1)` are free.
2. **Move Right** → head at `(0,2)`.
3. **Move Down** → head at `(1,2)`, orientation stays horizontal.
4. **Rotate Clockwise** → now vertical with head at `(1,2)`. The 2×2 block `(0,1)-(1,2)` is free, allowing rotation.
5. Continue exploring moves; BFS guarantees the first time we reach `(4,3)` horizontal is with 7 moves.

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(n²) – each cell with two orientations is visited at most once. |
| Space  | O(n²) – queue and visited set store states for each cell/orientation. |

## Follow‑Up Questions

1. How would the solution change if the snake length were greater than 2?
2. Could a heuristic (A*) improve performance on very large grids?
3. What modifications are needed if diagonal moves were allowed?

## Key Takeaway

> Multi‑cell movement on grids → BFS with state including **position + orientation**. Rotation constraints require checking a 2×2 area for obstacles.