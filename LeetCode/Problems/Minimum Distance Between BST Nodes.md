# 783. Minimum Distance Between BST Nodes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-distance-between-bst-nodes](https://leetcode.com/problems/minimum-distance-between-bst-nodes)
**Companies:** Amazon, Google, Meta, Wix

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Inorder Traversal — O(n)](#approach-inorder-traversal--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given the root of a BST, return the **minimum difference** between values of any two different nodes.

**Constraints:**
- `2 ≤ number of nodes ≤ 100`
- `0 ≤ Node.val ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: root = [4,2,6,1,3]
        4
       / \
      2   6
     / \
    1   3
Output: 1
Explanation: Min difference is between 2 and 3 (or 3 and 4) = 1.
```

---

## Key Insight

> In a BST, inorder traversal visits nodes in sorted order. The minimum difference must occur between **consecutive elements** in this sorted sequence. Track the previous value and compute differences on the fly.

---

## Approach: Inorder Traversal — O(n) ✅

```
FUNCTION minDiffInBST(root):
    prev = null; minDiff = infinity

    FUNCTION inorder(node):
        IF NOT node: RETURN
        inorder(node.left)
        IF prev != null: minDiff = MIN(minDiff, node.val - prev)
        prev = node.val
        inorder(node.right)

    inorder(root)
    RETURN minDiff
```

---

## Walkthrough

```
BST: [4,2,6,1,3]
Inorder: 1 → 2 → 3 → 4 → 6
```

| prev | node.val | Difference |
|------|----------|------------|
| null | 1 | — |
| 1 | 2 | 1 |
| 2 | 3 | **1** |
| 3 | 4 | 1 |
| 4 | 6 | 2 |

**Result:** min = **1** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — visit each node once |
| **Space** | O(h) — recursion stack (h = height) |

---

## Follow-Up Questions

1. **Is this the same as LeetCode #530?** Yes, identical problem under a different number.
2. **What if it weren't a BST?** You'd need to sort all values first, then check consecutive differences — O(n log n).
3. **Can we do this iteratively?** Yes, with an explicit stack for inorder traversal.

---

## Key Takeaway

> In a BST, the minimum absolute difference is always between **adjacent elements in inorder traversal** — leverage the sorted property for O(n) single-pass solutions.
