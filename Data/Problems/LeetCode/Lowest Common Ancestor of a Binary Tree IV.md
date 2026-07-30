# 1676. Lowest Common Ancestor of a Binary Tree IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv)
**Companies:** Amazon, Atlassian, Meta, Tiktok

---

## 1. Problem Description

Find the LCA of multiple nodes in a binary tree.

---

## 2. Approach: DFS with Set — O(n) ✅

```text
FUNCTION lowestCommonAncestor(root, nodes):
    nodeSet ← SET(nodes)
    FUNCTION dfs(node):
        IF NOT node OR node IN nodeSet: RETURN node
        left ← dfs(node.left)
        right ← dfs(node.right)
        IF left AND right: RETURN node
        RETURN left OR right
    RETURN dfs(root)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

**Example 1:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [5,1]
Output: 3
Explanation: The LCA of nodes 5 and 1 is the root node 3.
```

**Example 2:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [5,4,7]
Output: 5
Explanation: Nodes 5, 4, and 7 are all in the left subtree of 5, so 5 is the LCA.
```

---

## 4. Walkthrough

| Step | Current Node | Action |
|------|--------------|--------|
| 1 | root (3) | Not in set, recurse left & right |
| 2 | left child (5) | 5 is in set → return 5 |
| 3 | right child (1) | 1 is in set → return 1 |
| 4 | Back at 3 | left and right returned non‑null → LCA is 3 |

For the second example, recursion returns 5 from left subtree and null from right, so 5 bubbles up as the LCA.

---

## 5. Complexity Analysis

- **Time Complexity:** O(n) – each node visited at most once.
- **Space Complexity:** O(h) recursion stack, where h is tree height (worst‑case O(n)).

---

## Key Takeaway

> Use a set of target nodes and a standard DFS LCA routine; the first node where two recursive calls return non‑null is the lowest common ancestor for any number of nodes.
