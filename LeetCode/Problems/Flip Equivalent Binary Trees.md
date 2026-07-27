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

Two binary trees are **flip equivalent** if one can be transformed into the other by swapping left and right children at any nodes. Determine if two trees are flip equivalent.

---

## 2. Key Insight

> At each node, children either match directly (left↔left, right↔right) or are flipped (left↔right, right↔left). Recurse both possibilities.

---

## 3. Approach: Recursive — O(n) ✅

```
FUNCTION flipEquiv(root1, root2):
    IF NOT root1 AND NOT root2: RETURN true
    IF NOT root1 OR NOT root2: RETURN false
    IF root1.val != root2.val: RETURN false
    RETURN (flipEquiv(root1.left, root2.left) AND flipEquiv(root1.right, root2.right)) OR
           (flipEquiv(root1.left, root2.right) AND flipEquiv(root1.right, root2.left))
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(h) — recursion depth |

---

## 5. Key Takeaway

> Check both **no-flip** and **flip** orderings at each node. If either matches recursively, the trees are flip equivalent.
