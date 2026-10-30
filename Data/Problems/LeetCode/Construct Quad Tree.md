# 427. Construct Quad Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-quad-tree](https://leetcode.com/problems/construct-quad-tree)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Palantir, Uber

---

## Problem Description
Given a `n * n` matrix `grid` of `0's` and `1's` only. We want to represent `grid` with a Quad-Tree.

Return *the root of the Quad-Tree representing* `grid`.

A Quad-Tree is a tree data structure in which each internal node has exactly four children. Besides, each node has two attributes:

- `val`: True if the node represents a grid of 1's or False if the node represents a grid of 0's. Notice that you can assign the `val` to True or False when `isLeaf` is False, and both are accepted in the answer.
- `isLeaf`: True if the node is a leaf node on the tree or False if the node has four children.

```
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;
}
```

We can construct a Quad-Tree from a two-dimensional area using the following steps:

1. If the current grid has the same value (i.e all `1's` or all `0's`) set `isLeaf` True and set `val` to the value of the grid and set the four children to Null and stop.
2. If the current grid has different values, set `isLeaf` to False and set `val` to any value and divide the current grid into four sub-grids (top-left, top-right, bottom-left, bottom-right).
3. Recurse for each of the children with the proper sub-grid.

If you want to know more about the Quad-Tree, you can refer to the [wiki](https://en.wikipedia.org/wiki/Quadtree).

**Quad-Tree format:**

You don't need to read this section for solving the problem. This is only if you want to understand the output format here. The output represents the serialized format of a Quad-Tree using level order traversal, where `null` signifies a path terminator where no node exists below.

It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list `[isLeaf, val]`.

If the value of `isLeaf` or `val` is True we represent it as **1** in the list `[isLeaf, val]` and if the value of `isLeaf` or `val` is False we represent it as **0**.

**Constraints:**
- `n == grid.length == grid[i].length`
- `n == 2^x` where `0 <= x <= 6`

## Examples
```
Example 1:
  Input: grid = [[0,1],[1,0]]
  Output: [[0,1],[1,0],[1,1],[1,1],[1,0]]
  Explanation: The grid values differ, so the root is an internal node ([isLeaf=0, val=1]) with four
    1x1 leaf children: topLeft=[1,0], topRight=[1,1], bottomLeft=[1,1], bottomRight=[1,0].
    Notice that 0 represents False and 1 represents True.
```
```
Example 2:
  Input: grid = [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]
  Output: [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
  Explanation: All values in the grid are not the same. We divide the grid into four sub-grids.
    The topLeft, bottomLeft and bottomRight each has the same value.
    The topRight have different values so we divide it into 4 sub-grids where each has the same value.
```

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