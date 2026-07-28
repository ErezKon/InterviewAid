# 2236. Root Equals Sum of Children

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/root-equals-sum-of-children](https://leetcode.com/problems/root-equals-sum-of-children)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given the `root` of a binary tree with exactly 3 nodes (root + 2 children), return `true` if the root's value equals the sum of its children's values.

---

## Approach

```
FUNCTION checkTree(root):
    RETURN root.val == root.left.val + root.right.val
```

---

## Examples

| Input Tree | Output |
|------------|--------|
| `root = [5,2,3]` (root=5, left=2, right=3) | `true` |
| `root = [1,2,3]` (root=1, left=2, right=3) | `false` |

---

## Walkthrough

1. Access `root.val`, `root.left.val`, and `root.right.val`.
2. Compute the sum of the two children values.
3. Compare the sum with `root.val` and return the boolean result.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Follow-Up Questions

* How would you modify the solution for a tree with more than two children per node?
* Can this check be performed iteratively without recursion for a larger tree?

---

## Key Takeaway

The problem reduces to a single equality check between the root value and the sum of its two children, requiring constant time and space.
