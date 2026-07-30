
# 105. Construct Binary Tree from Preorder and Inorder Traversal

**Difficulty:** 🟡 Medium
**Acceptance:** 67.3%
**LeetCode:** [https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft, Salesforce, Snowflake, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Solution — O(n) ✅](#4-solution--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given two integer arrays `preorder` and `inorder` where:
- `preorder` is the preorder traversal of a binary tree
- `inorder` is the inorder traversal of the **same** tree

Construct and return the binary tree. All values are **unique**.

---

## 2. Examples

```
Example:
  preorder = [3, 9, 20, 15, 7]
  inorder  = [9, 3, 15, 20, 7]

  Output:
       3
      / \
     9   20
        /  \
       15   7
```

---

## 3. Key Insight

- **Preorder** visits root first → `preorder[0]` is always the root.
- **Inorder** splits at the root → everything **left** of root in inorder = left subtree, everything **right** = right subtree.

```
preorder: [3 | 9 | 20, 15, 7]
           root  left    right

inorder:  [9 | 3 | 15, 20, 7]
           left root   right
```

Use a **hash map** for O(1) lookup of root position in inorder.

---

## 4. Solution — O(n) ✅

```
FUNCTION buildTree(preorder, inorder):
    // Map inorder values to indices for O(1) lookup
    inMap = {}
    FOR i ← 0 TO LENGTH(inorder) - 1:
        inMap[inorder[i]] = i

    preIdx = [0]                    // mutable index into preorder

    FUNCTION build(inLeft, inRight):
        IF inLeft > inRight:
            RETURN NULL

        rootVal = preorder[preIdx[0]]
        preIdx[0] += 1

        node = new TreeNode(rootVal)

        // Find root position in inorder
        inRootIdx = inMap[rootVal]

        // Build left subtree first (matches preorder traversal order)
        node.left  = build(inLeft, inRootIdx - 1)
        node.right = build(inRootIdx + 1, inRight)

        RETURN node

    RETURN build(0, LENGTH(inorder) - 1)
```

### Why Build Left Before Right?

Preorder is: root → **left subtree** → right subtree. So after consuming the root, the next elements in preorder belong to the left subtree. We must build left first to consume them in the correct order.

---

## 5. Walkthrough

```
preorder = [3, 9, 20, 15, 7]
inorder  = [9, 3, 15, 20, 7]
inMap = {9:0, 3:1, 15:2, 20:3, 7:4}

build(0, 4):
  root = preorder[0] = 3, preIdx = 1
  inRootIdx = inMap[3] = 1
  node(3).left = build(0, 0)        // inorder[0..0] = [9]
    root = preorder[1] = 9, preIdx = 2
    inRootIdx = inMap[9] = 0
    node(9).left = build(0, -1) → NULL
    node(9).right = build(1, 0) → NULL
    return node(9)
  node(3).right = build(2, 4)       // inorder[2..4] = [15, 20, 7]
    root = preorder[2] = 20, preIdx = 3
    inRootIdx = inMap[20] = 3
    node(20).left = build(2, 2)     // inorder[2..2] = [15]
      root = preorder[3] = 15, preIdx = 4
      node(15).left = NULL, node(15).right = NULL
      return node(15)
    node(20).right = build(4, 4)    // inorder[4..4] = [7]
      root = preorder[4] = 7, preIdx = 5
      node(7).left = NULL, node(7).right = NULL
      return node(7)
    return node(20)
  return node(3)

Result:
     3
    / \
   9   20
      /  \
     15   7  ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — each node processed once, O(1) lookup |
| **Space** | O(n) — hash map + recursion stack |

---

## 7. Follow-Up Questions

### 7.1 From Inorder and Postorder (LeetCode #106)

Postorder visits root **last**. Process postorder from right to left, build **right subtree first**:

```
FUNCTION buildTree(inorder, postorder):
    inMap = build index map from inorder
    postIdx = [LENGTH(postorder) - 1]

    FUNCTION build(inLeft, inRight):
        IF inLeft > inRight: RETURN NULL
        rootVal = postorder[postIdx[0]]
        postIdx[0] -= 1
        inRootIdx = inMap[rootVal]

        node = new TreeNode(rootVal)
        node.right = build(inRootIdx + 1, inRight)   // right FIRST
        node.left  = build(inLeft, inRootIdx - 1)
        RETURN node

    RETURN build(0, LENGTH(inorder) - 1)
```

### 7.2 From Preorder alone (BST) (LeetCode #1008)

For a BST, preorder alone is sufficient — use value bounds:

```
FUNCTION bstFromPreorder(preorder):
    idx = [0]

    FUNCTION build(minVal, maxVal):
        IF idx[0] >= LENGTH(preorder): RETURN NULL
        val = preorder[idx[0]]
        IF val < minVal OR val > maxVal: RETURN NULL
        idx[0] += 1
        node = new TreeNode(val)
        node.left  = build(minVal, val)
        node.right = build(val, maxVal)
        RETURN node

    RETURN build(-∞, +∞)
```

### 7.3 Why can't we reconstruct from preorder + postorder?

For a general binary tree, preorder + postorder is **ambiguous** when a node has only one child (can't tell if it's left or right). It works only for **full** binary trees (every node has 0 or 2 children).

---

## Key Takeaway

> The core insight is that **preorder gives the root** and **inorder gives the partition** into left/right subtrees. The hash map optimization turns what could be O(n²) (linear search for root in inorder) into O(n). This problem tests your understanding of traversal orders and recursive tree construction.
