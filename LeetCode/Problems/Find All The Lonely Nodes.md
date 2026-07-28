# 1469. Find All The Lonely Nodes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-all-the-lonely-nodes](https://leetcode.com/problems/find-all-the-lonely-nodes)
**Companies:** Microsoft

---

## Problem Description

A node is **lonely** if it's the only child of its parent. Return all lonely node values in a binary tree.

---

## Examples

**Example 1:**
```
Input: root = [1,2,3,null,4]
Output: [4]
Explanation: Node 4 is the only child of node 2.
```

**Example 2:**
```
Input: root = [7,1,4,6,null,5,3,null,null,null,null]
Output: [6,5,3]
Explanation: Nodes 6, 5 and 3 each have a parent with only one child.
```

---

## Approach: DFS — O(n) ✅

```
FUNCTION getLonelyNodes(root):
    result = []
    FUNCTION dfs(node):
        IF node IS null: RETURN
        IF node.left AND NOT node.right: result.ADD(node.left.val)
        IF node.right AND NOT node.left: result.ADD(node.right.val)
        dfs(node.left); dfs(node.right)
    dfs(root)
    RETURN result
```

---

## Walkthrough

Consider the tree `[1,2,3,null,4]`.

| Node | Left Child | Right Child | Lonely Child |
|------|------------|-------------|--------------|
| 1    | 2          | 3           | none |
| 2    | null       | 4           | 4 |
| 3    | null       | null        | none |
| 4    | null       | null        | none |

DFS visits node 1, then node 2 (detects right child 4 as lonely), then node 4, then node 3. Result `[4]`.

---

## Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(h) – recursion stack, where h is tree height (worst‑case O(n)).

---

## Follow-Up Questions

1. How would you modify the algorithm to return lonely nodes in preorder without recursion?
2. Can you solve it iteratively using a stack?
3. What if you need to count lonely nodes instead of listing them?

---

## Key Takeaway

> **DFS: at each parent, if exactly one child exists, that child is lonely. Check `left XOR right` at every node.**