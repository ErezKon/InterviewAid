# 951. Flip Equivalent Binary Trees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flip-equivalent-binary-trees](https://leetcode.com/problems/flip-equivalent-binary-trees)
**Companies:** Amazon, Anduril, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Recursive — O(n) ✅](#3-approach-recursive--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

For a binary tree **T**, we can define a **flip operation** as follows: choose any node, and swap the left and right child subtrees.

A binary tree **X** is *flip equivalent* to a binary tree **Y** if and only if we can make **X** equal to **Y** after some number of flip operations.

Given the roots of two binary trees `root1` and `root2`, return `true` if the two trees are flip equivalent or `false` otherwise.

**Constraints:**
- The number of nodes in each tree is in the range `[0, 100]`.
- Each tree will have **unique node values** in the range `[0, 99]`.

**Examples:**
```
Example 1:
  Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
  Output: true
  Explanation: We flipped at nodes with values 1, 3, and 5.

Example 2:
  Input: root1 = [], root2 = []
  Output: true

Example 3:
  Input: root1 = [], root2 = [1]
  Output: false
```

---

## 2. Key Insight

> At each node, children either match directly (left↔left, right↔right) or are flipped (left↔right, right↔left). Recurse both possibilities.

---

## 3. Approach: Recursive — O(n) ✅

```text
FUNCTION flipEquiv(root1, root2):
    IF NOT root1 AND NOT root2: RETURN true
    IF NOT root1 OR NOT root2: RETURN false
    IF root1.val != root2.val: RETURN false
    RETURN (flipEquiv(root1.left, root2.left) AND flipEquiv(root1.right, root2.right)) OR
           (flipEquiv(root1.left, root2.right) AND flipEquiv(root1.right, root2.left))
```

---

## 4. Examples

**Example 1:**
```
Input: root1 = [1,2,3,4,5,6,null,null,null,7,8],
       root2 = [1,3,2,null,6,4,5,null,null,null,8,7]
Output: true
Explanation: By flipping the left child of node 2 and the right child of node 3, the trees become identical.
```

**Example 2:**
```
Input: root1 = [1,2,3], root2 = [1,3,2]
Output: true
Explanation: A single flip at the root makes the trees equivalent.
```

---

## 5. Walkthrough

| Step | root1 node | root2 node | Action |
|------|------------|------------|--------|
| 1 | 1 | 1 | Values match, recurse both children. |
| 2 | left children: 2 vs 3 | right children: 3 vs 2 | Check flip: 2 matches 2 (right of root2) and 3 matches 3 (left of root2). |
| 3 | Recurse on subtrees of node 2 and node 3 with flipped orientation. |
| … | Continue until leaves; all leaf pairs match. |

Result: All recursive checks succeed → trees are flip equivalent.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(h) — recursion depth |

---

## 7. Follow-Up Questions

- How would you modify the algorithm to return the sequence of flips performed?
- Can you solve the problem iteratively using a stack or queue?
- How does the solution change if the trees are not binary but n-ary?

---

## 8. Key Takeaway

> Check both **no-flip** and **flip** orderings at each node. If either matches recursively, the trees are flip equivalent.
