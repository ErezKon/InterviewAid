# 655. Print Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/print-binary-tree](https://leetcode.com/problems/print-binary-tree)
**Companies:** Amazon, Google, Meta, Microsoft, Poynt

---

## Problem Description
Given the root of a binary tree, return a 2D list of strings representing the formatted layout of the tree. The layout follows these rules:
- The height of the tree determines the number of rows (`height + 1`).
- The number of columns is `2^(height + 1) - 1`.
- Each node's value is placed at the middle of its allocated sub‑range, and empty cells contain an empty string.
- The tree is printed level by level from top to bottom.

## Examples
**Example 1**
```
Input: root = [1,2,3,null,4]
Output:
[["", "", "", "1", "", "", ""],
 ["", "2", "", "", "", "3", ""],
 ["", "", "4", "", "", "", ""]]
```
The root `1` is centered, its left child `2` occupies the left half, and so on.

**Example 2**
```
Input: root = [1,2]
Output:
[["", "", "1", "", ""],
 ["", "2", "", "", ""]]
```
A tree with only a left child still respects the column width rule.

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
