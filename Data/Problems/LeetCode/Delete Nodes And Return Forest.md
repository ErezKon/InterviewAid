# 1110. Delete Nodes And Return Forest

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-nodes-and-return-forest](https://leetcode.com/problems/delete-nodes-and-return-forest)
**Companies:** Amazon, Google, Meta, Pinterest

---

## Problem Description

Given a binary tree and a list of node values to delete, remove those nodes and return a list of the roots of the resulting forest (the remaining disconnected trees).

## Examples

| Input Tree | to_delete | Output Forest |
|------------|-----------|---------------|
| `[1,2,3,4,5,6,7]` | `[3,5]` | `[[1,2,4],[6],[7]]` |
| `[1,2,null,3]` | `[2]` | `[[1],[3]]` |

*Explanation:* Deleting node `3` detaches its children `6` and `7` as new roots. Deleting node `5` detaches its child `4` as a new root.

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

- How would you modify the algorithm to return the forest in level‑order traversal format?
- Can the solution be implemented iteratively using a stack?
- What changes are needed if the tree is represented as parent pointers instead of child pointers?

---

## Key Takeaway

> **When a node is deleted, its children become new roots. Passing an `isRoot` flag during DFS lets you collect those roots while performing a post‑order traversal.**