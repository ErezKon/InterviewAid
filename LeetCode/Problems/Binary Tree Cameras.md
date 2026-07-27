# 968. Binary Tree Cameras

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/binary-tree-cameras](https://leetcode.com/problems/binary-tree-cameras)
**Companies:** 6Sense, Amazon, Bloomberg, De Shaw, Dp World, Ebay, Goldman Sachs, Google, Graviton, Mathworks, Meta, Microsoft, Nutanix, Zeta

---

## Approach: Greedy DFS — O(n) ✅

States: 0 = needs camera, 1 = has camera, 2 = covered.

```
FUNCTION minCameraCover(root):
    cameras = 0

    FUNCTION dfs(node):
        IF node == null: RETURN 2    // null is covered

        left = dfs(node.left)
        right = dfs(node.right)

        IF left == 0 OR right == 0:
            cameras += 1
            RETURN 1    // place camera here

        IF left == 1 OR right == 1:
            RETURN 2    // covered by child's camera

        RETURN 0    // needs camera from parent

    IF dfs(root) == 0:
        cameras += 1    // root needs camera

    RETURN cameras
```

Greedy: place cameras as high as possible (at parents of leaves, not at leaves).
