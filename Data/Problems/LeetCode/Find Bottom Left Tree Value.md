# 513. Find Bottom Left Tree Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-bottom-left-tree-value](https://leetcode.com/problems/find-bottom-left-tree-value)
**Companies:** Amazon, Bloomberg, Google, Gopuff, Josh Technology, Meta, Microsoft

---

## Problem Description

Given the root of a binary tree, return the value of the leftmost node in the last (deepest) row of the tree.

---

## Examples

**Example 1:**
```
Input: root = [2,1,3]
Output: 1
Explanation: The deepest row is the second level with nodes 1 and 3. The leftmost node is 1.
```

**Example 2:**
```
Input: root = [1,2,3,4,null,5,6,null,null,7]
Output: 7
Explanation: The deepest row is the fourth level with nodes 7,5,6. The leftmost node is 7.
```

---

## Approach: BFS Level Order — O(n) ✅

```text
FUNCTION findBottomLeftValue(root):
    // Queue for level order traversal
    queue ← [root]
    result ← root.val
    WHILE queue NOT EMPTY:
        // The first node in the current level becomes the candidate
        result ← queue[0].val
        nextLevel ← []
        FOR node IN queue:
            IF node.left EXISTS:
                APPEND node.left TO nextLevel
            IF node.right EXISTS:
                APPEND node.right TO nextLevel
        queue ← nextLevel
    RETURN result
```

---

## Walkthrough

| Step | Queue (current level) | result (leftmost) |
|------|-----------------------|-------------------|
| 1 | [2] | 2 |
| 2 | [1,3] | 1 |
| 3 | [4,5,6] | 4 |
| 4 | [7] | 7 |

The algorithm processes each level, updating `result` to the first node of that level. After the final level, `result` holds the leftmost value of the deepest row.

---

## Complexity Analysis

- **Time:** O(n) where n is the number of nodes (each node visited once).
- **Space:** O(w) where w is the maximum width of the tree (queue size).

---

## Follow-Up Questions

1. How would you solve the problem using a depth‑first search while tracking depth?
2. Can the solution be adapted to return the entire leftmost view of the tree?

---

## Key Takeaway

> **BFS level‑by‑level: the first node of each level overwrites `result`. After BFS completes, `result` holds the leftmost value of the deepest level.**