# 1706. Where Will the Ball Fall

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/where-will-the-ball-fall](https://leetcode.com/problems/where-will-the-ball-fall)
**Companies:** Google

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented binary-tree problem. Correct idea: simulate each ball row by row — at column `c` with board `d = grid[r][c]`, the next column is `c + d`; the ball is stuck if `c + d` is out of bounds or `grid[r][c + d] != d` (a "V"). Otherwise move to `c + d` and continue. O(m·n).*

You have a 2-D `grid` of size `m x n` representing a box, and you have `n` balls. The box is open on the top and bottom sides.

Each cell in the box has a diagonal board spanning two corners of the cell that can redirect a ball to the right or to the left.

- A board that redirects the ball to the right spans the top-left corner to the bottom-right corner and is represented in the grid as `1`.
- A board that redirects the ball to the left spans the top-right corner to the bottom-left corner and is represented in the grid as `-1`.

We drop one ball at the top of each column of the box. Each ball can get stuck in the box or fall out of the bottom. A ball gets stuck if it hits a "V" shaped pattern between two boards or if a board redirects the ball into either wall of the box.

Return *an array* `answer` *of size* `n` *where* `answer[i]` *is the column that the ball falls out of at the bottom after dropping the ball from the* `i`th *column at the top, or `-1` if the ball gets stuck in the box*.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 100`
- `grid[i][j]` is `1` or `-1`.

## Examples

**Example 1:**
```
Input: grid = [[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]
Output: [1,-1,-1,-1,-1]
Explanation: This example is shown in the photo.
Ball b0 is dropped at column 0 and falls out of the box at column 1.
Ball b1 is dropped at column 1 and will get stuck in the box between column 2 and 3 and row 1.
Ball b2 is dropped at column 2 and will get stuck on the box between column 2 and 3 and row 0.
Ball b3 is dropped at column 3 and will get stuck on the box between column 2 and 3 and row 0.
Ball b4 is dropped at column 4 and will get stuck on the box between column 2 and 3 and row 1.
```

**Example 2:**
```
Input: grid = [[-1]]
Output: [-1]
Explanation: The ball gets stuck against the left wall.
```

**Example 3:**
```
Input: grid = [[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1]]
Output: [0,1,2,3,4,-1]
```

## Approach
Traverse the tree from the root following the direction indicated by each node’s value until a leaf is reached.

```text
FUNCTION findBallLeaf(root):
    SET node ← root
    WHILE node.left ≠ null OR node.right ≠ null:
        IF node.val = 0:
            SET node ← node.left
        ELSE:
            SET node ← node.right
    RETURN node.val
```

## Walkthrough
| Current node value | Move to |
|--------------------|---------|
| 0 (root)           | left child |
| 1                  | right child |
| …                  | … |
Continue until a leaf is reached; return its value.

## Complexity Analysis
- Time: O(h) where h is the height of the tree (≤ number of nodes).
- Space: O(1) extra space.

## Follow‑Up Questions
- How would you handle a tree where nodes can have both left and right children regardless of value?
- What if the ball could bounce back on certain nodes?
- Can you compute the path taken as a binary string?

## Key Takeaway
A simple deterministic traversal following node values yields the final leaf in linear time relative to tree height.
