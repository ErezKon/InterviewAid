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

You are given the `root` node of a binary search tree (BST) and a `value` to insert into the tree. Return *the root node of the BST after the insertion*. It is **guaranteed** that the new value does not exist in the original BST.

**Notice** that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return **any of them**.

**Constraints:**
- The number of nodes in the tree will be in the range `[0, 10^4]`.
- `-10^8 <= Node.val <= 10^8`
- All the values `Node.val` are **unique**.
- `-10^8 <= val <= 10^8`
- It's **guaranteed** that `val` does not exist in the original BST.

---

## 2. Examples

**Example 1:**
```
Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
Explanation: Another accepted tree is:
```

**Example 2:**
```
Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]
```

**Example 3:**
```
Input: root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
Output: [4,2,7,1,3,5]
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
