# 701. Insert into a Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/insert-into-a-binary-search-tree](https://leetcode.com/problems/insert-into-a-binary-search-tree)
**Companies:** Amazon, Anduril, Bloomberg, Google, Linkedin, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Recursive BST Insert — O(h) ✅](#4-approach-recursive-bst-insert--oh-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given the `root` of a BST and a `val` to insert, insert the value into the tree and return the root. It is **guaranteed** that `val` does not exist in the original tree. Any valid insertion (maintaining BST property) is accepted.

**Constraints:**
- Number of nodes: `[0, 10⁴]`
- `-10⁸ <= Node.val <= 10⁸`
- All values are **unique**.
- `val` is guaranteed not to exist in the tree.

---

## 2. Examples

**Example 1:**
```
Input:       4              Insert 5
            / \
           2   7
          / \
         1   3

Output:      4
            / \
           2   7
          / \ /
         1  3 5
```

**Example 2:**
```
Input: root = [], val = 5
Output: [5]   (new single-node tree)
```

---

## 3. Key Insight

In a BST, every insertion point is a **null leaf position**. Navigate left or right based on the BST property until you reach a `null`, then create the new node there. No rebalancing is needed (unless using AVL/Red-Black trees).

---

## 4. Approach: Recursive BST Insert — O(h) ✅

```
FUNCTION insertIntoBST(root, val):
    IF root == null: RETURN TreeNode(val)
    IF val < root.val:
        root.left = insertIntoBST(root.left, val)
    ELSE:
        root.right = insertIntoBST(root.right, val)
    RETURN root
```

---

## 5. Walkthrough

```
Tree:    4         Insert val = 5
        / \
       2   7
      / \
     1   3
```

| Step | Node | Comparison | Action |
|------|------|-----------|--------|
| 1 | 4 | 5 > 4 | Go right |
| 2 | 7 | 5 < 7 | Go left |
| 3 | null | — | Create node(5), return it |

Node 7's left child becomes 5. **Result:** BST property maintained ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(h) | Follow one root-to-leaf path |
| Space | O(h) | Recursion stack (O(1) iterative) |

Where `h` = O(log n) balanced, O(n) skewed.

---

## 7. Follow-Up Questions

### 7.1 Can this be done iteratively?

Yes. Walk down the tree keeping a `parent` pointer. When `curr` is null, attach the new node to `parent.left` or `parent.right`.

### 7.2 What if the tree must remain balanced after insertion?

Use a self-balancing BST (AVL tree or Red-Black tree) which performs rotations after insertion.

### 7.3 What if `val` might already exist?

Check for equality during traversal and either skip or handle duplicates (e.g., count field, insert to one side).

---

## 8. Key Takeaway

> BST insertion is a natural recursive descent: compare, go left or right, and create the node at the first null position. The recursive version is clean and elegant — just 4 lines of logic.
