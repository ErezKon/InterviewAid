# 333. Largest BST Subtree

**Difficulty:** 🟡 Medium
**Companies:** Meta, Microsoft

---

## 1. Problem Description

Given a binary tree, find the largest subtree that is a valid BST. Return the number of nodes in it.

---

## 2. Approach: Post-Order DFS — O(n) ✅

Return `(isBST, size, min, max)` from each subtree. A node forms a BST if both children are BSTs and its value is within range.

```
FUNCTION largestBSTSubtree(root):
    maxSize = 0

    FUNCTION dfs(node):
        IF node == null: RETURN (true, 0, INF, -INF)
        lBST, lSize, lMin, lMax = dfs(node.left)
        rBST, rSize, rMin, rMax = dfs(node.right)

        IF lBST AND rBST AND lMax < node.val < rMin:
            size = lSize + rSize + 1
            maxSize = MAX(maxSize, size)
            RETURN (true, size, MIN(lMin, node.val), MAX(rMax, node.val))
        RETURN (false, 0, 0, 0)

    dfs(root)
    RETURN maxSize
```

| Time | Space |
|------|-------|
| O(n) | O(h) |

---

## 3. Key Takeaway

> Post-order DFS propagates BST validity + range upward. A subtree is BST iff both children are BSTs and the node's value respects both ranges.
