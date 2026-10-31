# 872. Leaf-Similar Trees

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/leaf-similar-trees](https://leetcode.com/problems/leaf-similar-trees)
**Companies:** Amazon, Google, Meta, Microsoft, Oracle, Snowflake

---

## Problem Description

Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a **leaf value sequence***.*

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/16/tree.png)

For example, in the given tree above, the leaf value sequence is `(6, 7, 4, 9, 8)`.

Two binary trees are considered *leaf-similar* if their leaf value sequence is the same.

Return `true` if and only if the two given trees with head nodes `root1` and `root2` are leaf-similar.

**Constraints:**
- The number of nodes in each tree will be in the range `[1, 200]`.
- Both of the given trees will have values in the range `[0, 200]`.

## Examples

**Example 1:**
```
Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
Output: true
```

**Example 2:**
```
Input: root1 = [1,2,3], root2 = [1,3,2]
Output: false
```

## Approach

**Depth-First Search (DFS)** – Collect leaves of each tree in order, then compare the two lists.

```text
FUNCTION leafSimilar(root1, root2):
    RETURN getLeaves(root1) == getLeaves(root2)

FUNCTION getLeaves(node):
    IF node == null: RETURN []
    IF node.left == null AND node.right == null:
        RETURN [node.val]
    RETURN getLeaves(node.left) + getLeaves(node.right)
```

## Walkthrough

For the first example:
1. Traverse `root1` DFS left-to-right, collecting leaves: `6, 7, 4, 9`.
2. Traverse `root2` similarly, also obtaining `6, 7, 4, 9`.
3. Compare the two sequences – they match, so return `true`.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n₁ + n₂) | O(h₁ + h₂) |

`n₁, n₂` are node counts; `h₁, h₂` are tree heights (recursion stack).

## Follow-Up Questions

* How would you solve this iteratively using a stack?
* Can you modify the algorithm to handle very large trees without storing the full leaf sequences?
* What changes are needed if the trees are not binary?

## Key Takeaway

> DFS collects leaves in left-to-right order. Comparing the two leaf sequences determines leaf similarity.
