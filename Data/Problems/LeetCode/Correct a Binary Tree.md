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

```text
FUNCTION correctBinaryTree(root):
    IF root IS NULL:
        RETURN NULL
    queue ← [root]
    visited ← SET()
    parentMap ← MAP() // child → parent
    WHILE queue NOT EMPTY:
        nextLevel ← []
        FOR node IN queue:
            // Check right child first (right‑to‑left within the same level)
            IF node.right IS NOT NULL:
                IF node.right IN visited:
                    // node is the invalid one; detach it from its parent
                    parent ← parentMap[node]
                    IF parent IS NOT NULL:
                        IF parent.left IS node:
                            parent.left ← NULL
                        ELSE IF parent.right IS node:
                            parent.right ← NULL
                    RETURN root
                visited.ADD(node.right)
                parentMap[node.right] ← node
                nextLevel.ADD(node.right)
            IF node.left IS NOT NULL:
                visited.ADD(node.left)
                parentMap[node.left] ← node
                nextLevel.ADD(node.left)
        queue ← nextLevel
    RETURN root
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Examples

| Input Tree (level order) | Output Tree (level order) |
|---------------------------|---------------------------|
| `[1,2,3,null,4,null,5,6,null,null,null,null,7]` | `[1,2,3,null,4,null,5,6,null,null,null,null,7]` (invalid node removed) |
| `[1,2,3,4,5,6,7]` | `[1,2,3,4,5,6,7]` (already valid) |

---

## Walkthrough

Consider the first example where node `5`'s right child incorrectly points to node `7` at the same depth:
1. BFS starts at root `1`. No conflict.
2. Level 2 processes nodes `2` then `3` (right‑to‑left). When processing `3`, its right child `5` is already in `visited` from node `2`'s left subtree, indicating `5` is the invalid node.
3. Using `parentMap`, detach `5` from its parent `3` and return the corrected tree.

---

## Complexity Analysis

- **Time:** O(n) – each node is visited once during BFS.
- **Space:** O(n) – the queue, visited set, and parent map store up to n nodes.

---

## Follow-Up Questions

1. How would you modify the algorithm if multiple invalid links could exist?
2. Can the problem be solved with a single DFS traversal instead of BFS?
3. What changes are needed to handle trees stored as adjacency lists rather than explicit node objects?

---

## Key Takeaway

> BFS right‑to‑left ensures the wrongly‑pointed‑to node is visited before the invalid node. When a node's right child is already visited, that node is the culprit — remove it.
