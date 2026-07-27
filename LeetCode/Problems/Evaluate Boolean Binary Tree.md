# 2331. Evaluate Boolean Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/evaluate-boolean-binary-tree](https://leetcode.com/problems/evaluate-boolean-binary-tree)
**Companies:** Google

---

## Problem Description

Given a full binary tree where leaf nodes have values `0` (False) or `1` (True), and internal nodes have values `2` (OR) or `3` (AND), evaluate the tree and return the root's boolean result.

---

## Key Insight

> Recursive post-order evaluation: leaves return their boolean value; internal nodes apply their operator to the results of left and right children.

---

## Approach: Recursive Evaluation — O(n) ✅

```
FUNCTION evaluateTree(root):
    IF root IS leaf:
        RETURN root.val == 1
    left = evaluateTree(root.left)
    right = evaluateTree(root.right)
    IF root.val == 2:  // OR
        RETURN left OR right
    ELSE:              // AND (val == 3)
        RETURN left AND right
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n) — visit each node once |
| **Space** | O(h) — recursion depth = tree height |

---

## Key Takeaway

> **Tree evaluation = post-order traversal. Leaves return values, internal nodes combine children with their operator. Clean recursive pattern.**
