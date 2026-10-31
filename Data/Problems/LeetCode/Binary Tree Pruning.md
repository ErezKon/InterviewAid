# 814. Binary Tree Pruning

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-pruning](https://leetcode.com/problems/binary-tree-pruning)
**Companies:** Amazon, Hulu, Meta, Microsoft

---

## Problem Description
Given the `root` of a binary tree, return *the same tree where every subtree (of the given tree) not containing a* `1` *has been removed*.

A subtree of a node `node` is `node` plus every node that is a descendant of `node`.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 200]`.
- `Node.val` is either `0` or `1`.

## Examples
```
Example 1:
  Input: root = [1,null,0,0,1]
  Output: [1,null,0,null,1]
  Explanation: Only the red nodes satisfy the property "every subtree not containing a 1".
  The diagram on the right represents the answer.

Example 2:
  Input: root = [1,0,1,0,0,0,1]
  Output: [1,null,1,null,1]

Example 3:
  Input: root = [1,1,0,1,1,0,1,0]
  Output: [1,1,0,1,1,null,1]
```

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
- Space: O(h) – recursion stack height `h` (worst-case O(n)).

## Follow-Up Questions
- How would you implement the pruning iteratively using a stack?
- Can you modify the algorithm to return the number of nodes removed?
- How does the solution change if node values are arbitrary integers and you prune subtrees with sum `0`?

## Key Takeaway
A postorder DFS allows you to decide whether to keep a node after its children have been processed, enabling efficient pruning of subtrees that lack a required value.
