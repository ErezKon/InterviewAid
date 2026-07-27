# 1660. Correct a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/correct-a-binary-tree](https://leetcode.com/problems/correct-a-binary-tree)
**Companies:** Google

---

## 1. Problem Description

A binary tree has one invalid node whose right child points to a node at the same depth but to the right (creating an invalid link). Remove the invalid node and return the corrected tree.

---

## 2. Key Insight

> BFS level by level, right to left. Track visited nodes. If a node's right child is already visited, that node is the invalid one — remove it from its parent.

---

## 3. Approach: BFS Right-to-Left — O(n) ✅

```
FUNCTION correctBinaryTree(root):
    queue = [root]
    visited = set()
    
    WHILE queue:
        nextLevel = []
        FOR node IN queue:
            // Check right child first (right-to-left within level)
            IF node.right AND node.right IN visited:
                // node is invalid — its parent should skip it
                // Handle via parent tracking
            visited.ADD(node)
            IF node.right: nextLevel.ADD(node.right)
            IF node.left: nextLevel.ADD(node.left)
        queue = nextLevel
    
    // Alternative: BFS tracking parents
    // When invalid node found, set parent's child to null
    RETURN root
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> BFS right-to-left ensures the wrongly-pointed-to node is visited before the invalid node. When a node's right child is already visited, that node is the culprit — remove it.
