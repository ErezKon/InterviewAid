# 655. Print Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/print-binary-tree](https://leetcode.com/problems/print-binary-tree)
**Companies:** Amazon, Google, Meta, Microsoft, Poynt

---

## Problem Description

Given the `root` of a binary tree, construct a **0-indexed** `m x n` string matrix `res` that represents a **formatted layout** of the tree. The formatted layout matrix should be constructed using the following rules:

- The **height** of the tree is `height` and the number of rows `m` should be equal to `height + 1`.
- The number of columns `n` should be equal to `2^(height+1) - 1`.
- Place the **root node** in the **middle** of the **top row** (more formally, at location `res[0][(n-1)/2]`).
- For each node that has been placed in the matrix at position `res[r][c]`, place its **left child** at `res[r+1][c-2^(height-r-1)]` and its **right child** at `res[r+1][c+2^(height-r-1)]`.
- Continue this process until all the nodes in the tree have been placed.
- Any empty cells should contain the empty string `""`.

Return *the constructed matrix* `res`.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 2^10]`.
- `-99 <= Node.val <= 99`
- The depth of the tree will be in the range `[1, 10]`.

## Examples

**Example 1:**
```
Input: root = [1,2]
Output:
[["","1",""],
 ["2","",""]]
```

**Example 2:**
```
Input: root = [1,2,3,null,4]
Output:
[["","","","1","","",""],
 ["","2","","","","3",""],
 ["","","4","","","",""]]
```

## Approach
The algorithm consists of two phases:
1. **Compute Height** – Perform a DFS to find the maximum depth of the tree.
2. **Fill Matrix** – Initialise a matrix of size `(height+1) × (2^(height+1)-1)` with empty strings. Recursively place each node value at the midpoint of its current column range.

### Pseudocode
```text
FUNCTION printTree(root):
    SET h ← getHeight(root)
    SET rows ← h + 1
    SET cols ← 2^(h + 1) - 1
    SET result ← MATRIX(rows, cols, "")
    CALL fill(root, 0, 0, cols - 1, result)
    RETURN result

FUNCTION getHeight(node):
    IF node == null: RETURN -1
    RETURN 1 + MAX(getHeight(node.left), getHeight(node.right))

FUNCTION fill(node, row, left, right, matrix):
    IF node == null: RETURN
    SET mid ← (left + right) // 2
    SET matrix[row][mid] ← STRING(node.val)
    CALL fill(node.left, row + 1, left, mid - 1, matrix)
    CALL fill(node.right, row + 1, mid + 1, right, matrix)
```
The `fill` function uses recursion (DFS) to position each node.

## Walkthrough
Consider the tree `[1,2,3,null,4]`.
| Step | row | left | right | mid | placed value |
|------|-----|------|-------|-----|--------------|
| 1 | 0 | 0 | 6 | 3 | 1 |
| 2 | 1 | 0 | 2 | 1 | 2 |
| 3 | 1 | 4 | 6 | 5 | 3 |
| 4 | 2 | 2 | 2 | 2 | 4 |
The matrix built from these placements matches the output shown in Example 1.

## Complexity Analysis
- **Time:** `O(N)` – each node is visited once during height computation and once during filling.
- **Space:** `O(N)` – the result matrix holds `rows × cols = O(N)` strings; recursion stack depth is `O(height)`.

## Follow‑Up Questions
1. How would you modify the algorithm to print the tree in a compact format without empty columns?
2. Can you output the layout using BFS instead of recursion?
3. How would you handle very deep trees where the matrix size becomes prohibitive?

## Key Takeaway
Use the tree height to determine a fixed matrix size, then recursively place each node at the midpoint of its allocated column range to achieve a clean 2‑D representation.
