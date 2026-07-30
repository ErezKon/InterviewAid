# 700. Search in a Binary Search Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/search-in-a-binary-search-tree](https://leetcode.com/problems/search-in-a-binary-search-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given the root of a binary search tree (BST) and an integer `target`, return the subtree rooted at the node whose value equals `target`. If such a node does not exist, return `null`.

---

## 2. Examples

| Input Tree | Target | Output Subtree |
|------------|--------|----------------|
| `root = [4,2,7,1,3]` | `2` | `[2,1,3]` |
| `root = [4,2,7,1,3]` | `5` | `null` |

---

## 3. Approach

Iteratively traverse the BST using its ordering property.

```text
FUNCTION searchBST(root, target):
    WHILE root ≠ null AND root.val ≠ target:
        IF target < root.val:
            root ← root.left
        ELSE:
            root ← root.right
    RETURN root
```

---

## 4. Walkthrough

For `root = [4,2,7,1,3]`, `target = 2`:

| Step | Current Node | Comparison | Next Node |
|------|--------------|------------|-----------|
| 1 | 4 | 2 < 4 → left | 2 |
| 2 | 2 | 2 == 2 → stop | — |

The function returns the node with value `2`, whose subtree is `[2,1,3]`.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time | O(h) where h is tree height (O(log n) for balanced BST) |
| Space | O(1) |

---

## 6. Follow-Up Questions

- How would you implement this recursively?
- How can you modify the algorithm to find the predecessor or successor of a given value?
- What changes are needed if the tree is not a BST?

---

## Key Takeaway

> Leverage the BST ordering to prune half of the tree at each step, achieving O(h) time with O(1) extra space.
