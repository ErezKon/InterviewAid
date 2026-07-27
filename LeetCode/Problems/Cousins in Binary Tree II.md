# 2641. Cousins in Binary Tree II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cousins-in-binary-tree-ii](https://leetcode.com/problems/cousins-in-binary-tree-ii)
**Companies:** Amazon, Google

---

## Problem Description

Replace each node's value with the **sum of its cousins' values** (nodes at the same depth but different parents).

---

## Key Insight

Two BFS passes: first compute level sums, then for each parent subtract its children's values from the level sum to get the cousin sum for those children.

---

## Approach

```
FUNCTION replaceValueInTree(root):
    // BFS Pass 1: compute sum of each level
    levelSums = []
    queue = [root]
    WHILE queue:
        levelSums.ADD(SUM(node.val for node in queue))
        nextQueue = []
        FOR node IN queue:
            IF node.left: nextQueue.ADD(node.left)
            IF node.right: nextQueue.ADD(node.right)
        queue = nextQueue

    // BFS Pass 2: set each node's value to cousins' sum
    root.val = 0
    queue = [root]; depth = 0
    WHILE queue:
        nextQueue = []
        FOR node IN queue:
            siblingSum = (node.left.val IF node.left ELSE 0) +
                         (node.right.val IF node.right ELSE 0)
            IF node.left:
                node.left.val = levelSums[depth+1] - siblingSum
                nextQueue.ADD(node.left)
            IF node.right:
                node.right.val = levelSums[depth+1] - siblingSum
                nextQueue.ADD(node.right)
        queue = nextQueue; depth += 1

    RETURN root
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) for BFS queue |

---

## Key Takeaway

> **Cousin sum = level sum - sibling sum. Two-pass BFS: first collect level sums, then for each parent, set children's values to `level_sum - (left.val + right.val)`.**
