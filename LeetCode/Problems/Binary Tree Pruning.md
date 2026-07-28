# 814. Binary Tree Pruning

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-pruning](https://leetcode.com/problems/binary-tree-pruning)
**Companies:** Amazon, Hulu, Meta, Microsoft

---

## Problem Description
Given the root of a binary tree where each node's value is either `0` or `1`, prune (remove) every subtree that does not contain a `1`. Return the pruned tree's root. The tree may contain up to `10^4` nodes.

## Examples
| Input Tree | Output Tree | Explanation |
|------------|-------------|-------------|
| `[[1,0,1],[0,0,0],[0,0,1]]` | `[[1,null,1],[null,null,1]]` | Subtrees rooted at the left child of the root and its descendants contain only `0`s and are removed. |
| `[]` | `[]` | Empty tree remains empty. |

## Approach
Perform a postorder DFS. Recursively prune left and right subtrees first, then decide whether to keep the current node: keep it if its value is `1` or if any child remains.

```text
FUNCTION pruneTree(node):
    IF node == null: RETURN null
    node.left ← pruneTree(node.left)
    node.right ← pruneTree(node.right)
    IF node.val == 0 AND node.left == null AND node.right == null:
        RETURN null
    RETURN node
```

## Walkthrough
For the tree `[[1,0,1],[0,0,0],[0,0,1]]`:
1. Recurse to left subtree `0` → both children become null → node removed.
2. Recurse to right subtree `1` → its right child `1` is kept, left child `0` removed.
3. Root `1` keeps both left (null) and right (pruned) children, resulting in `[[1,null,1],[null,null,1]]`.

## Complexity Analysis
- Time: O(n) – each node visited once.
- Space: O(h) – recursion stack height `h` (worst‑case O(n)).

## Follow-Up Questions
- How would you implement the pruning iteratively using a stack?
- Can you modify the algorithm to return the number of nodes removed?
- How does the solution change if node values are arbitrary integers and you prune subtrees with sum `0`?

## Key Takeaway
A postorder DFS allows you to decide whether to keep a node after its children have been processed, enabling efficient pruning of subtrees that lack a required value.
