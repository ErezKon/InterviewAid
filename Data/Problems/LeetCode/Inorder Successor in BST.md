# 285. Inorder Successor in BST

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/inorder-successor-in-bst](https://leetcode.com/problems/inorder-successor-in-bst)
**Companies:** Amazon, Docusign, Google, Meta, Microsoft, Pocket Gems

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: BST Search — O(h) ✅](#4-approach-bst-search--oh-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given the `root` of a binary search tree and a node `p` in it, return *the in-order successor of that node in the BST*. If the given node has no in-order successor in the tree, return `null`.

The successor of a node `p` is the node with the smallest key greater than `p.val`.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-10^5 <= Node.val <= 10^5`
- All Nodes will have unique values.

---

## 2. Examples

**Example 1:**
```
Input: root = [2,1,3], p = 1
Output: 2
Explanation: 1's in-order successor node is 2. Note that both p and the return value is of TreeNode type.
```

**Example 2:**
```
Input: root = [5,3,6,2,4,null,null,1], p = 6
Output: null
Explanation: There is no in-order successor of the current node, so the answer is null.
```

---

## 3. Key Insight

When traversing a BST from the root looking for `p`'s successor:

- If `root.val > p.val` → root **could** be the successor, so record it and go **left** to find something smaller but still > p.
- If `root.val <= p.val` → root is too small, go **right**.

The last recorded candidate when traversal ends is the answer.

---

## 4. Approach: BST Search — O(h) ✅

```
FUNCTION inorderSuccessor(root, p):
    successor = null
    WHILE root:
        IF p.val < root.val:
            successor = root
            root = root.left
        ELSE:
            root = root.right
    RETURN successor
```

Go left when root > p (potential successor), go right otherwise. O(h).

---

## 5. Walkthrough

```
Tree:     5
         / \
        3    6
       / \
      2    4

Find successor of p = 3:
```

| Step | root | Condition | Action |
|------|------|-----------|--------|
| 1 | 5 | 3 < 5 | successor = 5, go left |
| 2 | 3 | 3 = 3 (not <) | go right |
| 3 | 4 | 3 < 4 | successor = 4, go left |
| 4 | null | — | Stop |

**Result:** Successor = **4** ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(h) | Single root-to-leaf path traversal |
| Space | O(1) | Only a pointer variable |

Where `h` = O(log n) balanced, O(n) skewed.

---

## 7. Follow-Up Questions

### 7.1 What if the node has a parent pointer but no root access?

That's **LeetCode #510**. Use two cases: go right-then-leftmost, or climb up until you come from a left child.

### 7.2 How to find the in-order predecessor?

Mirror the logic: go right when `root.val < p.val` (recording candidate), go left otherwise.

### 7.3 What if the BST allows duplicates?

The `<` vs `<=` comparison determines whether you find the successor among equal values or skip them. Clarify the requirement with the interviewer.

---

## 8. Key Takeaway

> Finding the in-order successor in a BST without parent pointers is a **single-pass root-to-leaf search**: go left when the current node could be the answer (and record it), go right when it can't. This O(h) / O(1) pattern is the foundation for BST iterator design.
