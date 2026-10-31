# 1110. Delete Nodes And Return Forest

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-nodes-and-return-forest](https://leetcode.com/problems/delete-nodes-and-return-forest)
**Companies:** Amazon, Google, Meta, Pinterest

---

## Problem Description

Given the `root` of a binary tree, each node in the tree has a distinct value.

After deleting all nodes with a value in `to_delete`, we are left with a forest (a disjoint union of trees).

Return the roots of the trees in the remaining forest. You may return the result in any order.

**Constraints:**

- The number of nodes in the given tree is at most `1000`.
- Each node has a distinct value between `1` and `1000`.
- `to_delete.length <= 1000`
- `to_delete` contains distinct values between `1` and `1000`.

## Examples

```
Example 1:
  Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
  Output: [[1,2,null,4],[6],[7]]
  Explanation: Deleting node 3 detaches its children 6 and 7 as new roots.
  Deleting node 5 simply removes it from under node 2, leaving 1 -> 2 -> 4.
```

```
Example 2:
  Input: root = [1,2,4,null,3], to_delete = [3]
  Output: [[1,2,4]]
```

## Approach

```
FUNCTION delNodes(root, to_delete):
    toDeleteSet ← SET(to_delete)
    forest ← []

    FUNCTION dfs(node, isRoot):
        IF node == null: RETURN null
        deleted ← node.val IN toDeleteSet
        IF isRoot AND NOT deleted:
            forest.APPEND(node)
        node.left ← dfs(node.left, deleted)
        node.right ← dfs(node.right, deleted)
        RETURN null IF deleted ELSE node

    dfs(root, true)
    RETURN forest
```

## Walkthrough

Consider tree `[1,2,3,4,5,6,7]` with `to_delete = [3,5]`.
1. Start at root `1` (isRoot true, not deleted) → added to forest.
2. Recurse left to `2` (isRoot false). `2` not deleted, recurse its children.
3. Left child `4` (isRoot false) not deleted → stays under `2`.
4. Right child `5` (isRoot false) is deleted → its child `4` becomes a new root and is added to forest.
5. Recurse right to `3` (isRoot false) deleted → its children `6` and `7` become new roots and are added to forest.
6. Final forest roots: `1` (with left child `2`), `6`, `7`.

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n is number of nodes |
| **Space** | O(n) for `toDeleteSet` + recursion stack |

## Follow-Up Questions

- How would you modify the algorithm to return the forest in level-order traversal format?
- Can the solution be implemented iteratively using a stack?
- What changes are needed if the tree is represented as parent pointers instead of child pointers?

---

## Key Takeaway

> **When a node is deleted, its children become new roots. Passing an `isRoot` flag during DFS lets you collect those roots while performing a post-order traversal.**