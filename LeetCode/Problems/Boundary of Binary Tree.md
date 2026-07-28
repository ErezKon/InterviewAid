# 545. Boundary of Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/boundary-of-binary-tree](https://leetcode.com/problems/boundary-of-binary-tree)
**Companies:** Adobe, Amazon, Geico, Google, Meta, Microsoft, Nutanix, Oracle, Salesforce, Snowflake, Uber

---

## Problem Description
Given the root of a binary tree, return the values of its boundary in anti‑clockwise order starting from the root. The boundary consists of the left boundary (excluding leaves), all leaf nodes from left to right, and the right boundary (excluding leaves) in reverse order.

## Examples
- Input: `[1,2,3,4,5,null,6,null,null,7,8]` → Output: `[1,2,4,7,8,6,3]`. The left boundary is `2`, leaves are `4,7,8,6`, and the right boundary reversed is `3`.
- Input: `[1,null,2,3,4]` → Output: `[1,3,4,2]`. Left boundary is empty, leaves `3,4`, right boundary `2`.

## Approach
**Three Pass Traversal** – Perform three separate DFS traversals:
1. Collect left boundary nodes (excluding leaves).
2. Collect all leaf nodes in order.
3. Collect right boundary nodes (excluding leaves) and reverse them.
Combine the three lists with the root at the front.

```text
FUNCTION boundaryOfBinaryTree(root):
    IF root IS NULL: RETURN []
    IF isLeaf(root): RETURN [root.val]
    SET result ← [root.val]
    // left boundary
    SET node ← root.left
    WHILE node IS NOT NULL AND NOT isLeaf(node):
        result.APPEND(node.val)
        node ← node.left IF node.left IS NOT NULL ELSE node.right
    // leaves
    CALL addLeaves(root, result)
    // right boundary (collect then reverse)
    SET rightBoundary ← []
    SET node ← root.right
    WHILE node IS NOT NULL AND NOT isLeaf(node):
        rightBoundary.APPEND(node.val)
        node ← node.right IF node.right IS NOT NULL ELSE node.left
    result += REVERSE(rightBoundary)
    RETURN result

FUNCTION isLeaf(node):
    RETURN node.left IS NULL AND node.right IS NULL

FUNCTION addLeaves(node, result):
    IF node IS NULL: RETURN
    IF isLeaf(node):
        result.APPEND(node.val)
        RETURN
    CALL addLeaves(node.left, result)
    CALL addLeaves(node.right, result)
```

## Walkthrough
Consider the tree `1 → {2,3}` with left subtree `2 → {4,5}` and right subtree `3 → {null,6}` where `5` has children `7,8`.
1. Root `1` added.
2. Left boundary: traverse `2` (not leaf) → add `2`.
3. Leaves collected in order: `4,7,8,6`.
4. Right boundary: traverse `3` (not leaf) → add `3`; reverse → `3`.
Result `[1,2,4,7,8,6,3]`.

## Complexity Analysis
- **Time:** O(n) – each node visited at most twice.
- **Space:** O(h) recursion stack, where h is tree height.

## Follow‑Up Questions
1. How would you modify the algorithm to return the boundary in clockwise order?
2. Can you compute the boundary iteratively using a stack instead of recursion?
3. What if the tree is extremely large and does not fit in memory?

## Key Takeaway
A clean three‑pass DFS separates left boundary, leaves, and right boundary, enabling a linear‑time solution without extra data structures.
