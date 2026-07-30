# 257. Binary Tree Paths

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-tree-paths](https://leetcode.com/problems/binary-tree-paths)
**Companies:** Amazon, Apple, Bloomberg, Capital One, Google, Meta, Revolut

---

## Problem Description
Given the `root` of a binary tree, return all root‑to‑leaf paths as strings. Each path should list node values separated by `"->"`. A leaf is a node with no children.

## Examples
| Tree (level order) | Output |
|--------------------|--------|
| `[1,2,3,null,5]` | `["1->2->5","1->3"]` |
| `[1]` | `["1"]` |
| `[]` | `[]` |

## Approach
Use a depth‑first search (DFS) that builds the path string as it traverses. When a leaf is reached, add the accumulated path to the result list.

### Pseudocode
```text
FUNCTION binaryTreePaths(root):
    SET result ← []
    IF root == null:
        RETURN result
    CALL dfs(root, STRING(root.val))
    RETURN result

FUNCTION dfs(node, path):
    IF node.left == null AND node.right == null:
        APPEND path TO result
        RETURN
    IF node.left != null:
        CALL dfs(node.left, path + "->" + STRING(node.left.val))
    IF node.right != null:
        CALL dfs(node.right, path + "->" + STRING(node.right.val))
```

## Walkthrough
For `[1,2,3,null,5]`:
1. Start at root `1` with path `"1"`.
2. Go left to `2`, path `"1->2"`.
3. Left child null, right child `5` → path `"1->2->5"` (leaf) added.
4. Backtrack to root, go right to `3`, path `"1->3"` (leaf) added.
Result `[`"1->2->5","1->3"`]`.

## Complexity Analysis
- **Time:** `O(n)` – each node visited once.
- **Space:** `O(h)` – recursion stack, plus result list storing all leaf paths.

## Follow‑Up Questions
1. How would you generate the paths iteratively using a stack?
2. Can you output the paths in lexicographic order without sorting?
3. How would you modify the algorithm to return paths as lists of integers instead of strings?

## Key Takeaway
DFS that carries the current path string enables straightforward construction of all root‑to‑leaf paths.
