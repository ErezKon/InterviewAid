# 510. Inorder Successor in BST II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/inorder-successor-in-bst-ii](https://leetcode.com/problems/inorder-successor-in-bst-ii)
**Companies:** Arista Networks, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two-Case Parent Pointer — O(h) ✅](#4-approach-two-case-parent-pointer--oh-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a node in a binary search tree where each node has a `parent` pointer (in addition to `left` and `right`), find the **in-order successor** of that node. The in-order successor is the node with the smallest key **greater than** the given node's value. Return `null` if no successor exists (i.e., the node is the last in in-order traversal).

**Constraints:**
- The number of nodes is in the range `[1, 10⁴]`.
- `-10⁵ <= Node.val <= 10⁵`
- All values are **unique**.
- You do **not** have access to the root of the tree.

---

## 2. Examples

**Example 1:**
```
        5
       / \
      3    6
     / \
    2    4
   /
  1

Input: node = 2
Output: 3
Explanation: 3 is the next value in in-order traversal after 2.
```

**Example 2:**
```
Input: node = 6 (the rightmost in-order node)
Output: null
Explanation: No successor exists.
```

---

## 3. Key Insight

There are exactly **two cases** for finding the in-order successor:

1. **Node has a right subtree** → the successor is the **leftmost node** of the right subtree.
2. **Node has no right subtree** → travel **up** via parent pointers until you come from a **left child**. That parent is the successor.

This mirrors the two fundamental cases of BST in-order traversal.

---

## 4. Approach: Two-Case Parent Pointer — O(h) ✅

```
FUNCTION inorderSuccessor(node):
    // Case 1: has right child → leftmost of right subtree
    IF node.right:
        node = node.right
        WHILE node.left: node = node.left
        RETURN node

    // Case 2: go up until we come from a left child
    WHILE node.parent AND node == node.parent.right:
        node = node.parent
    RETURN node.parent
```

---

## 5. Walkthrough

```
Tree:     5
         / \
        3    6
       / \
      2    4
     /
    1

Find successor of node 4:
```

| Step | Action | Current Node |
|------|--------|-------------|
| 1 | Node 4 has no right child → go to Case 2 | 4 |
| 2 | 4 is the **right** child of 3 → keep going up | 3 |
| 3 | 3 is the **left** child of 5 → stop, return parent | **5** |

**Result:** Successor of 4 is **5** ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(h) | At most traverse the height of the tree |
| Space | O(1) | No extra data structures used |

Where `h` is the height of the BST (O(log n) balanced, O(n) worst case).

---

## 7. Follow-Up Questions

### 7.1 What if there is no parent pointer?

Use the approach from **LeetCode #285** — start from the root and track the last node where you went left (that's the potential successor). O(h) time.

### 7.2 How would you find the in-order predecessor instead?

Mirror the logic: if the node has a left subtree, go to its **rightmost** node. Otherwise, go up until you come from a **right** child.

### 7.3 Can this approach work for a non-BST binary tree?

No. In-order successor in a general binary tree requires a full traversal since node values don't maintain the BST ordering property.

---

## 8. Key Takeaway

> The in-order successor in a BST with parent pointers follows two simple rules: **go right then all the way left**, or **go up until you came from the left**. This O(h) / O(1) approach requires no root access and is the canonical pattern for iterator-style BST traversal.
