# 700. Search in a Binary Search Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/search-in-a-binary-search-tree](https://leetcode.com/problems/search-in-a-binary-search-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

You are given the `root` of a binary search tree (BST) and an integer `val`.

Find the node in the BST that the node's value equals `val` and return the subtree rooted with that node. If such a node does not exist, return `null`.

**Constraints:**

- The number of nodes in the tree is in the range `[1, 5000]`.
- `1 <= Node.val <= 10^7`
- `root` is a binary search tree.
- `1 <= val <= 10^7`

---

## 2. Examples

```
Example 1:
  Input: root = [4,2,7,1,3], val = 2
  Output: [2,1,3]
```

```
Example 2:
  Input: root = [4,2,7,1,3], val = 5
  Output: []
```

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
