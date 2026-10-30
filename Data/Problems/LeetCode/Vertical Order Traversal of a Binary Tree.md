# 987. Vertical Order Traversal of a Binary Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree)
**Companies:** Amazon, Bitgo, Bloomberg, Deliveroo, Doordash, Google, Meta, Microsoft, Oracle, Roku, Salesforce, Samsung, Tiktok, Uber

---

## Problem Description

Given the `root` of a binary tree, calculate the **vertical order traversal** of the binary tree.

For each node at position `(row, col)`, its left and right children will be at positions `(row + 1, col - 1)` and `(row + 1, col + 1)` respectively. The root of the tree is at `(0, 0)`.

The **vertical order traversal** of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.

Return *the **vertical order traversal** of the binary tree*.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 1000]`.
- `0 <= Node.val <= 1000`

## Examples

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
Explanation:
Column -1: Only node 9 is in this column.
Column 0: Nodes 3 and 15 are in this column in that order from top to bottom.
Column 1: Only node 20 is in this column.
Column 2: Only node 7 is in this column.
```

**Example 2:**
```
Input: root = [1,2,3,4,5,6,7]
Output: [[4],[2],[1,5,6],[3],[7]]
Explanation:
Column -2: Only node 4 is in this column.
Column -1: Only node 2 is in this column.
Column 0: Nodes 1, 5, and 6 are in this column.
          1 is at the top, so it comes first.
          5 and 6 are at the same position (2, 0), so we order them by their value, 5 before 6.
Column 1: Only node 3 is in this column.
Column 2: Only node 7 is in this column.
```

**Example 3:**
```
Input: root = [1,2,3,4,6,5,7]
Output: [[4],[2],[1,5,6],[3],[7]]
Explanation:
This case is the exact same as example 2, but with nodes 5 and 6 swapped.
Note that the solution remains the same since 5 and 6 are in the same location and should be ordered by their values.
```

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
