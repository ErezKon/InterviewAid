# 199. Binary Tree Right Side View

**Difficulty:** 🟡 Medium
**Acceptance:** 65.0%
**LeetCode:** [https://leetcode.com/problems/binary-tree-right-side-view](https://leetcode.com/problems/binary-tree-right-side-view)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Oracle, Servicenow, Tiktok, Uber, Visa, Walmart Labs, Wix, Yandex

---

## 1. Problem Description

Given the root of a binary tree, return the values visible from the right side (last node at each level).

---

## 2. Approach: BFS Level Order — O(n) ✅

```
FUNCTION rightSideView(root):
    IF root == null: RETURN []
    result = []
    queue = [root]

    WHILE queue not empty:
        levelSize = queue.SIZE()
        FOR i ← 0 TO levelSize - 1:
            node = queue.DEQUEUE()
            IF i == levelSize - 1:
                result.ADD(node.val)    // rightmost node
            IF node.left: queue.ENQUEUE(node.left)
            IF node.right: queue.ENQUEUE(node.right)

    RETURN result
```

### DFS Alternative

Preorder with right-first traversal. Track the current depth; if depth == result.size, it's a new level.

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> BFS level order, take the last node of each level. DFS alternative: visit right subtree first, and the first node seen at each depth is the rightmost.
