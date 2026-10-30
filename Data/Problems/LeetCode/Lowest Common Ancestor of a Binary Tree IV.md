# 1676. Lowest Common Ancestor of a Binary Tree IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv)
**Companies:** Amazon, Atlassian, Meta, Tiktok

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given the `root` of a binary tree and an array of `TreeNode` objects `nodes`, return *the lowest common ancestor (LCA) of **all the nodes** in *`nodes`. All the nodes will exist in the tree, and all values of the tree's nodes are **unique**.

Extending the **definition of LCA on Wikipedia**: "The lowest common ancestor of `n` nodes `p_1`, `p_2`, ..., `p_n` in a binary tree `T` is the lowest node that has every `p_i` as a **descendant** (where we allow **a node to be a descendant of itself**) for every valid `i`". A **descendant** of a node `x` is a node `y` that is on the path from node `x` to some leaf node.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are **unique**.
- All `nodes[i]` will exist in the tree.
- All `nodes[i]` are distinct.

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
Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [4,7]
Output: 2
Explanation: The lowest common ancestor of nodes 4 and 7 is node 2.
```

**Example 2:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [1]
Output: 1
Explanation: The lowest common ancestor of a single node is the node itself.
```

**Example 3:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [7,6,2,4]
Output: 5
Explanation: The lowest common ancestor of the nodes 7, 6, 2, and 4 is node 5.
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
