
# 236. Lowest Common Ancestor of a Binary Tree

**Difficulty:** 🟡 Medium
**Acceptance:** 66.2%
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree)
**Companies:** Adobe, Amazon, Apple, Atlassian, Bitgo, Bloomberg, Cisco, Goldman Sachs, Google, Intel, Intuit, Linkedin, Lucid, Meta, Microsoft, Mongodb, Newsbreak, Oracle, Sap, Tiktok, Wix, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Solution: Recursive DFS — O(n) ✅](#4-solution-recursive-dfs--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given a binary tree, find the **lowest common ancestor (LCA)** of two given nodes `p` and `q`.

The LCA is the deepest node that is an **ancestor** of both `p` and `q` (a node can be its own ancestor).

---

## 2. Examples

```
Example 1:
          3
        /   \
       5     1
      / \   / \
     6   2 0   8
        / \
       7   4

  p = 5, q = 1 → LCA = 3
  p = 5, q = 4 → LCA = 5 (5 is ancestor of 4 and itself)
```

---

## 3. Key Insight

For any node during DFS:
- If `p` is in the left subtree and `q` is in the right subtree (or vice versa), the current node is the LCA.
- If both are in the same subtree, the LCA is deeper in that subtree.
- If the current node IS `p` or `q`, and the other target is in a subtree, then the current node is the LCA.

---

## 4. Solution: Recursive DFS — O(n) ✅

```
FUNCTION lowestCommonAncestor(root, p, q):

    // Base cases
    IF root IS NULL:
        RETURN NULL

    IF root == p OR root == q:
        RETURN root

    // Search both subtrees
    left  = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)

    // If both subtrees found a target → root is the LCA
    IF left IS NOT NULL AND right IS NOT NULL:
        RETURN root

    // Otherwise, return whichever subtree found something
    RETURN left IF left IS NOT NULL ELSE right
```

### What Does the Return Value Mean?

- `NULL` → neither `p` nor `q` is in this subtree.
- `p` or `q` → one of them was found.
- When both children return non-null → the current node is the LCA.

---

## 5. Walkthrough

```
Tree:
          3
        /   \
       5     1
      / \   / \
     6   2 0   8
        / \
       7   4

Find LCA(5, 4):

lowestCommonAncestor(3, 5, 4)
  root=3, not p or q
  left = lowestCommonAncestor(5, 5, 4)
    root=5 == p → RETURN 5        // early return, 5 is found
  right = lowestCommonAncestor(1, 5, 4)
    root=1, not p or q
    left = lowestCommonAncestor(0, 5, 4) → NULL
    right = lowestCommonAncestor(8, 5, 4) → NULL
    both NULL → RETURN NULL

  left=5 (NOT NULL), right=NULL
  RETURN 5

Result: LCA = 5 ✅ (5 is an ancestor of both 5 and 4)
```

```
Find LCA(5, 1):

lowestCommonAncestor(3, 5, 1)
  left = lowestCommonAncestor(5, 5, 1) → returns 5
  right = lowestCommonAncestor(1, 5, 1) → returns 1

  left=5 (NOT NULL), right=1 (NOT NULL)
  Both found → RETURN 3

Result: LCA = 3 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — visit each node at most once |
| **Space** | O(h) — recursion stack, where h = height of tree |

---

## 7. Follow-Up Questions

### 7.1 LCA in a Binary Search Tree (LeetCode #235)

In a BST, use the ordering property:

```
FUNCTION lowestCommonAncestorBST(root, p, q):
    WHILE root:
        IF p.val < root.val AND q.val < root.val:
            root = root.left
        ELSE IF p.val > root.val AND q.val > root.val:
            root = root.right
        ELSE:
            RETURN root
```

**Time:** O(h), **Space:** O(1) iterative.

### 7.2 What if nodes might not exist in the tree? (LeetCode #1644)

The standard algorithm assumes both nodes exist. If they might not:

```
FUNCTION lowestCommonAncestorII(root, p, q):
    found = [FALSE, FALSE]        // found[0] for p, found[1] for q

    FUNCTION dfs(node):
        IF node IS NULL: RETURN NULL

        left  = dfs(node.left)
        right = dfs(node.right)

        IF node == p:
            found[0] = TRUE
            RETURN node
        IF node == q:
            found[1] = TRUE
            RETURN node

        IF left AND right: RETURN node
        RETURN left IF left ELSE right

    result = dfs(root)
    RETURN result IF found[0] AND found[1] ELSE NULL
```

### 7.3 LCA with Parent Pointers (LeetCode #1650)

If each node has a `.parent` pointer, this becomes "intersection of two linked lists":

```
FUNCTION lowestCommonAncestorIII(p, q):
    a = p
    b = q

    WHILE a != b:
        a = a.parent IF a IS NOT NULL ELSE q
        b = b.parent IF b IS NOT NULL ELSE p

    RETURN a
```

**Time:** O(h), **Space:** O(1).

### 7.4 LCA of multiple nodes?

Generalize: for `k` nodes, find a node such that both its left and right subtrees contain at least one of the target nodes.

```
FUNCTION lcaMultiple(root, nodes):
    nodeSet = SET(nodes)

    FUNCTION dfs(node):
        IF node IS NULL: RETURN NULL
        IF node IN nodeSet: RETURN node

        left = dfs(node.left)
        right = dfs(node.right)

        IF left AND right: RETURN node
        RETURN left IF left ELSE right

    RETURN dfs(root)
```

---

## Key Takeaway

> LCA is a classic **post-order DFS** problem. The recursion naturally bubbles up information from both subtrees to determine where targets diverge. The elegant 7-line solution works because it handles all cases: both in one subtree, split across subtrees, or one being the ancestor of the other. This pattern — "search subtrees and combine results" — is the foundation of many tree problems.
