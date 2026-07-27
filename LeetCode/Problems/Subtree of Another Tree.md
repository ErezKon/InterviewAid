# 572. Subtree of Another Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/subtree-of-another-tree](https://leetcode.com/problems/subtree-of-another-tree)
**Companies:** Amazon, Bloomberg, Compass, Ebay, Google, Jump Trading, Meta, Microsoft

---

## 1. Problem Description

Given the roots of two binary trees `root` and `subRoot`, return `true` if there's a subtree of `root` with the same structure and node values as `subRoot`.

---

## 2. Approach: Recursive — O(m·n) ✅

For each node in `root`, check if the subtree starting there matches `subRoot`.

```
FUNCTION isSubtree(root, subRoot):
    IF root == null: RETURN false
    IF isSameTree(root, subRoot): RETURN true
    RETURN isSubtree(root.left, subRoot) OR isSubtree(root.right, subRoot)

FUNCTION isSameTree(t1, t2):
    IF t1 == null AND t2 == null: RETURN true
    IF t1 == null OR t2 == null: RETURN false
    RETURN t1.val == t2.val
       AND isSameTree(t1.left, t2.left)
       AND isSameTree(t1.right, t2.right)
```

| Time | Space |
|------|-------|
| O(m·n) | O(h) |

### O(m+n) approach?

Serialize both trees and use KMP/Rabin-Karp string matching on the serializations.

---

## Key Takeaway

> Two-level recursion: outer traverses the main tree, inner checks tree equality. String matching approach gives O(m+n) but is harder to implement correctly.
