# 427. Construct Quad Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-quad-tree](https://leetcode.com/problems/construct-quad-tree)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Palantir, Uber

---

## Problem Description
Given an `n x n` binary grid `grid` (where `n` is a power of 2), construct a **quad‑tree** representation of the grid. Each node represents a region; leaf nodes store a uniform value (all 0s or all 1s) and are marked as `isLeaf = true`. Internal nodes have `isLeaf = false` and four children representing the top‑left, top‑right, bottom‑left, and bottom‑right quadrants.

## Examples
- Input: `grid = [[1,1],[1,1]]` → Output: Leaf node with `val = 1`.
- Input: `grid = [[0,1],[1,0]]` → Output: Root internal node with four leaf children each storing the corresponding cell value.

## Approach
**Algorithm:** Recursive divide‑and‑conquer (O(n²))
For a region defined by its top‑left corner `(r, c)` and size `size`, check if all cells are identical. If so, create a leaf node. Otherwise, split the region into four equal quadrants of size `size/2` and recursively build each child.

```text
FUNCTION construct(grid):
    RETURN build(grid, 0, 0, LENGTH(grid))

FUNCTION build(grid, r, c, size):
    IF allSame(grid, r, c, size):
        SET val ← grid[r][c]
        RETURN NEW Node(val, true, null, null, null, null)
    SET half ← size / 2
    SET topLeft ← build(grid, r, c, half)
    SET topRight ← build(grid, r, c + half, half)
    SET bottomLeft ← build(grid, r + half, c, half)
    SET bottomRight ← build(grid, r + half, c + half, half)
    RETURN NEW Node(true, false, topLeft, topRight, bottomLeft, bottomRight)

FUNCTION allSame(grid, r, c, size):
    SET first ← grid[r][c]
    FOR i ← r TO r + size - 1:
        FOR j ← c TO c + size - 1:
            IF grid[i][j] ≠ first:
                RETURN false
    RETURN true
```

## Walkthrough
For `grid = [[0,1],[1,0]]`:
1. `build(0,0,2)` finds mixed values → split into four 1×1 quadrants.
2. Each 1×1 call returns a leaf with its cell value.
3. The root node combines these four leaves.

## Complexity Analysis
- **Time:** O(n²) – each cell is examined at most once when checking uniformity.
- **Space:** O(n²) in worst case for the recursion stack and node objects (each cell may become a leaf).

## Follow-Up Questions
- How would you modify the algorithm to handle non‑binary values (e.g., grayscale images)?
- Can you construct the quad‑tree iteratively using a stack or queue?
- What is the impact on space complexity if you compress leaf nodes further using run‑length encoding?

## Key Takeaway
A quad‑tree recursively partitions a grid until each region is uniform, enabling efficient representation of large homogeneous areas with a simple divide‑and‑conquer strategy.