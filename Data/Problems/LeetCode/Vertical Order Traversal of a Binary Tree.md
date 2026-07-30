# 987. Vertical Order Traversal of a Binary Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree)
**Companies:** Amazon, Bitgo, Bloomberg, Deliveroo, Doordash, Google, Meta, Microsoft, Oracle, Roku, Salesforce, Samsung, Tiktok, Uber

---

## Problem Description
Given the root of a binary tree, return the vertical order traversal of its nodes' values. For each column from leftmost to rightmost, list node values from top to bottom; if multiple nodes share the same row and column, sort them by value.

## Examples
- Input: `[3,9,20,null,null,15,7]`
  Output: `[[9],[3,15],[20],[7]]`
  Explanation: Columns are -1,0,1,2.
- Input: `[1,2,3,4,5,6,7]`
  Output: `[[4],[2],[1,5,6],[3],[7]]`
  Explanation: Nodes at the same position are ordered by value.

## Approach
DFS to record each node's column and row, then sort the collected triples by column, row, and value.

```text
FUNCTION verticalTraversal(root):
    SET nodes ← []    // list of (col, row, val)
    CALL dfs(root, 0, 0, nodes)
    SORT nodes BY col ASC, row ASC, val ASC
    SET result ← []
    SET prevCol ← None
    FOR (col, row, val) IN nodes:
        IF col != prevCol:
            APPEND [] TO result
            SET prevCol ← col
        APPEND val TO result.LAST()
    RETURN result

FUNCTION dfs(node, col, row, nodes):
    IF node IS NULL: RETURN
    APPEND (col, row, node.val) TO nodes
    CALL dfs(node.left, col - 1, row + 1, nodes)
    CALL dfs(node.right, col + 1, row + 1, nodes)
```

## Walkthrough
| Step | Node | (col,row) | Action |
|------|------|-----------|--------|
| 1 | 3 | (0,0) | record (0,0,3) |
| 2 | 9 | (-1,1) | record (-1,1,9) |
| 3 | 20 | (1,1) | record (1,1,20) |
| 4 | 15 | (0,2) | record (0,2,15) |
| 5 | 7 | (2,2) | record (2,2,7) |
After sorting: (-1,1,9), (0,0,3), (0,2,15), (1,1,20), (2,2,7) → grouped into columns.

## Complexity Analysis
- Time: O(n log n) for sorting n nodes.
- Space: O(n) to store node triples.

## Follow-Up Questions
1. How would you perform the traversal using BFS with a priority queue?
2. Can you output the traversal in O(n) time using a map of columns?
3. How would you adapt the algorithm for an N‑ary tree?

## Key Takeaway
Recording each node's column and row via DFS and then sorting by (column, row, value) yields the correct vertical order traversal.
