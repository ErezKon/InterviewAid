# 968. Binary Tree Cameras

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/binary-tree-cameras](https://leetcode.com/problems/binary-tree-cameras)
**Companies:** 6Sense, Amazon, Bloomberg, De Shaw, Dp World, Ebay, Goldman Sachs, Google, Graviton, Mathworks, Meta, Microsoft, Nutanix, Zeta

---

## Problem Description
You are given the `root` of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children.

Return *the minimum number of cameras needed to monitor all nodes of the tree*.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 1000]`.
- `Node.val == 0`

## Examples
```
Example 1:
  Input: root = [0,0,null,0,0]
  Output: 1
  Explanation: One camera is enough to monitor all nodes if placed as shown.

Example 2:
  Input: root = [0,0,null,0,null,0,null,null,0]
  Output: 2
  Explanation: At least two cameras are needed to monitor all nodes of the tree. The above image shows one of the valid configurations of camera placement.
```

## Approach
Use a post‑order **Greedy DFS**. Each node returns a state:
- `0` – needs a camera.
- `1` – has a camera.
- `2` – covered, no camera.
If any child needs a camera (`0`), place a camera at the current node (`1`). If any child has a camera (`1`), the current node is covered (`2`). Otherwise it needs a camera (`0`). After processing the root, if it still needs a camera, add one.

### Pseudocode
```text
FUNCTION minCameraCover(root):
    SET cameras ← 0
    IF dfs(root) == 0:
        SET cameras ← cameras + 1
    RETURN cameras

FUNCTION dfs(node):
    IF node == null:
        RETURN 2  // null is considered covered
    SET left ← dfs(node.left)
    SET right ← dfs(node.right)
    IF left == 0 OR right == 0:
        SET cameras ← cameras + 1
        RETURN 1  // place camera here
    IF left == 1 OR right == 1:
        RETURN 2  // covered by child's camera
    RETURN 0  // needs camera from parent
```

## Walkthrough
Consider a tree where the left child is a leaf and the right subtree is deeper.
1. Leaf returns `0` (needs camera).
2. Its parent sees a child `0`, places a camera (`1`).
3. The parent’s parent becomes covered (`2`).
4. Continue upward; root may need a camera if all children are covered (`2`).

## Complexity Analysis
- **Time:** `O(n)` – each node visited once.
- **Space:** `O(h)` – recursion stack, where `h` is tree height.

## Follow‑Up Questions
1. How would you adapt the solution for an N‑ary tree?
2. Can you solve it iteratively using explicit stack?
3. What if cameras could only monitor parent and itself (not children)?

## Key Takeaway
Model each node’s monitoring state and greedily place cameras at parents of uncovered children to achieve optimal coverage.
