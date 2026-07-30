# 2096. Step-By-Step Directions From a Binary Tree Node to Another

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another)
**Companies:** Amazon, Databricks, Google, Meta, Oracle, Snowflake, Tiktok

---

## Problem Description
Given the root of a binary tree and two distinct node values `startValue` and `destValue`, return a string representing the directions to move from the node with `startValue` to the node with `destValue`. The directions consist of:
- `'U'` for moving up to the parent,
- `'L'` for moving to the left child,
- `'R'` for moving to the right child.
The path must be the shortest possible.

## Examples
**Example 1:**
```
Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
Output: "UURL"
Explanation: Path is 3 → 1 (U) → 5 (U) → 2 (R) → 6 (L).
```
**Example 2:**
```
Input: root = [2,1], startValue = 2, destValue = 1
Output: "L"
```

## Approach
Find the path from the root to each of the two target nodes using DFS. The longest common prefix of these two paths corresponds to the Lowest Common Ancestor (LCA). To move from `start` to `dest`:
1. Go up (`'U'`) for each extra step beyond the LCA in the start path.
2. Append the remaining suffix of the destination path (which consists of `'L'` and `'R'`).

```text
FUNCTION getDirections(root, startValue, destValue):
    SET pathStart ← findPath(root, startValue, [])
    SET pathDest ← findPath(root, destValue, [])
    SET i ← 0
    WHILE i < LENGTH(pathStart) AND i < LENGTH(pathDest) AND pathStart[i] == pathDest[i]:
        SET i ← i + 1
    SET upMoves ← REPEAT('U', LENGTH(pathStart) - i)
    SET downMoves ← SUBLIST(pathDest, i, END)
    RETURN CONCAT(upMoves, downMoves)

FUNCTION findPath(node, target, currentPath):
    IF node IS NULL:
        RETURN NULL
    IF node.val == target:
        RETURN currentPath
    SET leftPath ← findPath(node.left, target, APPEND(currentPath, 'L'))
    IF leftPath IS NOT NULL:
        RETURN leftPath
    RETURN findPath(node.right, target, APPEND(currentPath, 'R'))
```

## Walkthrough
For the first example, `pathStart = ['L','L']` (5→1→3) and `pathDest = ['R','L']` (5→2→6). The common prefix is empty, so `i=0`. `upMoves = 'UU'` (two steps up from 3 to 5). `downMoves = 'RL'` (right then left to reach 6). Result `'UURL'`.

## Complexity Analysis
- **Time:** O(n) – each DFS visits nodes at most once.
- **Space:** O(h) recursion stack, where h is tree height.

## Follow‑Up Questions
1. How would you adapt the algorithm for a binary tree stored as an adjacency list?
2. Can you return the directions without explicitly storing the full paths (e.g., using parent pointers)?
3. What changes are needed if moves can also include diagonal steps in a grid‑like tree?

## Key Takeaway
Finding root‑to‑node paths, extracting their common prefix (LCA), and concatenating upward and downward moves yields the shortest direction string.
