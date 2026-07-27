# 427. Construct Quad Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-quad-tree](https://leetcode.com/problems/construct-quad-tree)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Palantir, Uber

---

```
FUNCTION construct(grid):
    RETURN build(grid, 0, 0, len(grid))

FUNCTION build(grid, r, c, size):
    IF allSame(grid, r, c, size):
        RETURN Node(grid[r][c], true, null, null, null, null)

    half = size / 2
    RETURN Node(true, false,
        build(grid, r, c, half),
        build(grid, r, c + half, half),
        build(grid, r + half, c, half),
        build(grid, r + half, c + half, half))
```

Recursively split into 4 quadrants. Leaf if all values are the same.
