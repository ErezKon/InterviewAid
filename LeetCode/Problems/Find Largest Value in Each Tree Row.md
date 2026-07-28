# 515. Find Largest Value in Each Tree Row

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-largest-value-in-each-tree-row](https://leetcode.com/problems/find-largest-value-in-each-tree-row)
**Companies:** Amazon, Apple, Bloomberg, Google, Josh Technology, Linkedin, Meta, Microsoft

---

```
FUNCTION largestValues(root):
    IF root == null: RETURN []
    result = []
    queue = [root]
    WHILE queue:
        maxVal = -infinity
        nextLevel = []
        FOR node IN queue:
            maxVal = MAX(maxVal, node.val)
            IF node.left: nextLevel.ADD(node.left)
            IF node.right: nextLevel.ADD(node.right)
        result.ADD(maxVal)
        queue = nextLevel
    RETURN result
```

---

## Problem Description

Return the largest value in each row of a binary tree.

---

## Examples

| Input Tree | Output |
|------------|--------|
| `[1,3,2,5,3,null,9]` | `[1,3,9]` |
| `[1,2,3]` | `[1,3]` |

---

## Approach

**Breadth‑First Search (Level Order Traversal)** – traverse the tree level by level, tracking the maximum value seen in each level.

```text
FUNCTION largestValues(root):
    IF root == null: RETURN []
    result ← []
    queue ← [root]
    WHILE queue NOT EMPTY:
        maxVal ← -infinity
        nextLevel ← []
        FOR node IN queue:
            maxVal ← MAX(maxVal, node.val)
            IF node.left: nextLevel.ADD(node.left)
            IF node.right: nextLevel.ADD(node.right)
        result.ADD(maxVal)
        queue ← nextLevel
    RETURN result
```

---

## Walkthrough

Consider the tree `[1,3,2,5,3,null,9]`.

| Step | Queue | maxVal | result |
|------|-------|--------|--------|
| Start | `[1]` | -∞ | [] |
| Process level 0 | `1` → maxVal=1 | `[3,2]` | `[1]` |
| Process level 1 | `3,2` → maxVal=3 | `[5,3,9]` | `[1,3]` |
| Process level 2 | `5,3,9` → maxVal=9 | `[]` | `[1,3,9]` |

---

## Complexity Analysis

- **Time:** O(N) – each node visited once.
- **Space:** O(W) – width of the tree (maximum number of nodes at any level) for the queue.

---

## Follow‑Up Questions

1. How would you modify the algorithm to return the minimum value per level?
2. Can you solve the problem using depth‑first search while tracking depth?
3. How would you handle a tree stored as an adjacency list instead of node objects?

---

## Key Takeaway

> **BFS level‑by‑level, track max at each level. Standard level‑order traversal with aggregation.**