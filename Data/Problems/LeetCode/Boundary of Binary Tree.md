# 545. Boundary of Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/boundary-of-binary-tree](https://leetcode.com/problems/boundary-of-binary-tree)
**Companies:** Adobe, Amazon, Geico, Google, Meta, Microsoft, Nutanix, Oracle, Salesforce, Snowflake, Uber

---

## Problem Description
The **boundary** of a binary tree is the concatenation of the **root**, the **left boundary**, the **leaves** ordered from left-to-right, and the **reverse order** of the **right boundary**.

The **left boundary** is the set of nodes defined by the following:

- The root node's left child is in the left boundary. If the root does not have a left child, then the left boundary is **empty**.
- If a node is in the left boundary and has a left child, then the left child is in the left boundary.
- If a node is in the left boundary, has **no** left child, but has a right child, then the right child is in the left boundary.
- The leftmost leaf is **not** in the left boundary.

The **right boundary** is similar to the **left boundary**, except it is the right side of the root's right subtree. Again, the leaf is **not** part of the **right boundary**, and the **right boundary** is empty if the root does not have a right child.

The **leaves** are nodes that do not have any children. For this problem, the root is **not** a leaf.

Given the `root` of a binary tree, return *the values of its **boundary***.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10⁴]`.
- `-1000 ≤ Node.val ≤ 1000`

## Examples
```
Example 1:
  Input: root = [1,null,2,3,4]
  Output: [1,3,4,2]
  Explanation:
  - The left boundary is empty because the root does not have a left child.
  - The right boundary follows the path starting from the root's right child 2 -> 4.
    4 is a leaf, so the right boundary is [2].
  - The leaves from left to right are [3,4].
  Concatenating everything results in [1] + [] + [3,4] + [2] = [1,3,4,2].

Example 2:
  Input: root = [1,2,3,4,5,6,null,null,null,7,8,9,10]
  Output: [1,2,4,7,8,9,10,6,3]
  Explanation:
  - The left boundary follows the path starting from the root's left child 2 -> 4.
    4 is a leaf, so the left boundary is [2].
  - The right boundary follows the path starting from the root's right child 3 -> 6 -> 10.
    10 is a leaf, so the right boundary is [3,6], and in reverse order is [6,3].
  - The leaves from left to right are [4,7,8,9,10].
  Concatenating everything results in [1] + [2] + [4,7,8,9,10] + [6,3] = [1,2,4,7,8,9,10,6,3].
```

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
