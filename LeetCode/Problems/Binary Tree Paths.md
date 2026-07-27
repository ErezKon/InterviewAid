# 257. Binary Tree Paths

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-paths](https://leetcode.com/problems/binary-tree-paths)
**Companies:** Amazon, Apple, Bloomberg, Capital One, Google, Meta, Revolut

---

```
FUNCTION binaryTreePaths(root):
    result = []
    FUNCTION dfs(node, path):
        IF node.left == null AND node.right == null:
            result.ADD(path)
            RETURN
        IF node.left: dfs(node.left, path + "->" + str(node.left.val))
        IF node.right: dfs(node.right, path + "->" + str(node.right.val))
    IF root: dfs(root, str(root.val))
    RETURN result
```
