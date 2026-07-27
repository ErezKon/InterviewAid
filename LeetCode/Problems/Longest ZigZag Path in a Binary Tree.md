# 1372. Longest ZigZag Path in a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree)
**Companies:** Amazon, Microsoft

---

## 1. Problem Description

Find the longest zigzag path (alternating left-right-left...) in a binary tree.

---

## 2. Approach: DFS with Two States — O(n) ✅

```
FUNCTION longestZigZag(root):
    maxLen = 0

    FUNCTION dfs(node, goLeft, length):
        IF node == null: RETURN
        maxLen = MAX(maxLen, length)
        IF goLeft:
            dfs(node.left, false, length + 1)   // continue zigzag
            dfs(node.right, true, 1)             // restart
        ELSE:
            dfs(node.right, true, length + 1)
            dfs(node.left, false, 1)

    dfs(root, true, 0)
    dfs(root, false, 0)
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(h) |

---

## 3. Key Takeaway

> At each node, track direction and current zigzag length. Continue if alternating, restart at 1 if not. Can also return (leftZig, rightZig) tuple per node.
