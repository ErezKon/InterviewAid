# 1325. Delete Leaves With a Given Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-leaves-with-a-given-value](https://leetcode.com/problems/delete-leaves-with-a-given-value)
**Companies:** Amazon, Google, Josh Technology, Microsoft

---

## Problem Description

Given a binary tree `root` and an integer `target`, delete all the **leaf nodes** with value `target`.

Note that once you delete a leaf node with value `target`, if its parent node becomes a leaf node and has the value `target`, it should also be deleted (you need to continue doing that until you cannot).

**Constraints:**

- The number of nodes in the tree is in the range `[1, 3000]`.
- `1 <= Node.val, target <= 1000`

## Examples

```
Example 1:
  Input: root = [1,2,3,2,null,2,4], target = 2
  Output: [1,null,3,null,4]
  Explanation: Leaf nodes with value (target = 2) are removed.
  After removing, new nodes become leaf nodes with value (target = 2), and they are removed too.
```

```
Example 2:
  Input: root = [1,3,3,3,2], target = 3
  Output: [1,3,null,null,2]
```

```
Example 3:
  Input: root = [1,2,null,2,null,2], target = 2
  Output: [1]
  Explanation: Leaf nodes with value (target = 2) are removed at each step.
```

## Approach

```
FUNCTION removeLeafNodes(root, target):
    IF NOT root: RETURN null
    root.left = removeLeafNodes(root.left, target)
    root.right = removeLeafNodes(root.right, target)
    IF NOT root.left AND NOT root.right AND root.val == target: RETURN null
    RETURN root
```

## Walkthrough

Consider the tree `[1,2,3,2,null,2,4]` with target `2`.
1. Post-order visits left subtree `2` → its left child `2` is a leaf and matches → removed.
2. Right subtree `3` processes its left child `2` (leaf) → removed.
3. After removals, node `2` becomes a leaf with value `2` → removed.
4. Remaining nodes are `1,3,4` forming the output tree.

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(h) recursion stack |

## Follow-Up Questions

- How would you modify the algorithm to delete leaves with values in a set of targets?
- Can you solve the problem iteratively using a stack?
- What changes are needed if the tree is represented as an adjacency list?

---

## Key Takeaway

> **Post-order traversal naturally handles cascading leaf deletion: process children first, then check if the current node became a target leaf. Elegantly handles multi-level removal.**