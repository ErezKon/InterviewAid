
# 98. Validate Binary Search Tree

**Difficulty:** 🟡 Medium
**Acceptance:** 35.1%
**LeetCode:** [https://leetcode.com/problems/validate-binary-search-tree](https://leetcode.com/problems/validate-binary-search-tree)
**Companies:** Amazon, Apple, Bloomberg, Citadel, Expedia, Goldman Sachs, Google, Ibm, Linkedin, Meta, Microsoft, Millennium, Oracle, Salesforce, Wix, Yahoo, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Common Mistake](#3-common-mistake)
4. [Approach 1: Recursive with Bounds — O(n) ✅](#4-approach-1-recursive-with-bounds--on-)
5. [Approach 2: Inorder Traversal — O(n)](#5-approach-2-inorder-traversal--on)
6. [Walkthrough](#6-walkthrough)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Given the `root` of a binary tree, determine if it is a valid **binary search tree (BST)**.

A valid BST:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree contains only nodes with keys **greater than** the node's key.
- Both left and right subtrees must also be valid BSTs.

---

## 2. Examples

```
Example 1:        Example 2:
    2                  5
   / \                / \
  1   3              1   4
                        / \
                       3   6

  Output: true        Output: false
                      (3 is in right subtree of 5 but 3 < 5)
```

---

## 3. Common Mistake

Checking only `node.left.val < node.val < node.right.val` is **wrong**. A node must be valid within the **entire** ancestor chain's constraints, not just its immediate parent.

```
    5
   / \
  1   6
     / \
    3   7      ← 3 < 5, but 3 is in right subtree of 5 → INVALID
```

---

## 4. Approach 1: Recursive with Bounds — O(n) ✅

Pass down the **allowed range** `(minVal, maxVal)` for each node.

```
FUNCTION isValidBST(root):
    RETURN validate(root, -INFINITY, +INFINITY)

FUNCTION validate(node, minVal, maxVal):
    IF node IS NULL:
        RETURN TRUE

    IF node.val <= minVal OR node.val >= maxVal:
        RETURN FALSE

    // Left child must be in (minVal, node.val)
    // Right child must be in (node.val, maxVal)
    RETURN validate(node.left, minVal, node.val) AND
           validate(node.right, node.val, maxVal)
```

---

## 5. Approach 2: Inorder Traversal — O(n)

A valid BST's inorder traversal produces a **strictly increasing** sequence.

```
FUNCTION isValidBST(root):
    prev = -INFINITY

    FUNCTION inorder(node):
        IF node IS NULL:
            RETURN TRUE

        IF NOT inorder(node.left):
            RETURN FALSE

        IF node.val <= prev:
            RETURN FALSE
        prev = node.val

        RETURN inorder(node.right)

    RETURN inorder(root)
```

### Iterative Inorder (with stack)

```
FUNCTION isValidBST(root):
    stack = []
    prev  = -INFINITY
    node  = root

    WHILE node IS NOT NULL OR stack IS NOT EMPTY:
        WHILE node IS NOT NULL:
            stack.PUSH(node)
            node = node.left

        node = stack.POP()

        IF node.val <= prev:
            RETURN FALSE
        prev = node.val

        node = node.right

    RETURN TRUE
```

---

## 6. Walkthrough

```
Tree:
    5
   / \
  1   6
     / \
    3   7

validate(5, -∞, +∞):
  5 > -∞ and 5 < +∞ ✓
  validate(1, -∞, 5):
    1 > -∞ and 1 < 5 ✓
    validate(NULL) → TRUE
    validate(NULL) → TRUE
    return TRUE
  validate(6, 5, +∞):
    6 > 5 and 6 < +∞ ✓
    validate(3, 5, 6):
      3 > 5? NO → RETURN FALSE ✗

Result: FALSE ✅ (node 3 violates the lower bound of 5)
```

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| **Recursive with bounds** | **O(n)** | O(h) recursion stack |
| **Inorder traversal** | **O(n)** | O(h) stack |

---

## 8. Follow-Up Questions

### 8.1 What if duplicates are allowed (left ≤ root)?

Change the left bound check: `node.val < minVal` instead of `node.val <= minVal`.

### 8.2 Recover BST (LeetCode #99)

Two nodes are swapped by mistake. Find and fix them. During inorder, detect two violations and swap the offending values.

```
FUNCTION recoverTree(root):
    first = NULL, second = NULL, prev = new TreeNode(-∞)

    FUNCTION inorder(node):
        IF node IS NULL: RETURN
        inorder(node.left)

        IF node.val < prev.val:
            IF first IS NULL:
                first = prev
            second = node
        prev = node

        inorder(node.right)

    inorder(root)
    SWAP(first.val, second.val)
```

### 8.3 Kth Smallest Element in BST (LeetCode #230)

Inorder traversal, return the kth element:

```
FUNCTION kthSmallest(root, k):
    count = 0

    FUNCTION inorder(node):
        IF node IS NULL: RETURN -1
        result = inorder(node.left)
        IF result != -1: RETURN result
        count += 1
        IF count == k: RETURN node.val
        RETURN inorder(node.right)

    RETURN inorder(root)
```

### 8.4 Convert Sorted Array to BST (LeetCode #108)

Build a balanced BST from a sorted array by picking the middle element as root:

```
FUNCTION sortedArrayToBST(nums):
    FUNCTION build(lo, hi):
        IF lo > hi: RETURN NULL
        mid = (lo + hi) / 2
        node = new TreeNode(nums[mid])
        node.left  = build(lo, mid - 1)
        node.right = build(mid + 1, hi)
        RETURN node
    RETURN build(0, LENGTH(nums) - 1)
```

---

## BST Problem Family

| Problem | Key Technique | Time |
|---------|--------------|------|
| **Validate BST** (#98) | Bound propagation / inorder | O(n) |
| **Recover BST** (#99) | Inorder, find 2 swapped | O(n) |
| **Kth Smallest** (#230) | Inorder, count | O(h + k) |
| **Sorted Array → BST** (#108) | Recursive mid-split | O(n) |
| **BST Iterator** (#173) | Controlled inorder (stack) | O(1) amortized |

---

## Key Takeaway

> The bound-propagation approach is the cleanest: every node inherits constraints from its ancestors. The inorder approach leverages the BST's fundamental property — sorted traversal order. Both are O(n). In interviews, state both approaches and implement whichever feels most natural.
