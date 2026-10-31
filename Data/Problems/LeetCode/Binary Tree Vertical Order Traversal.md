# 314. Binary Tree Vertical Order Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-vertical-order-traversal](https://leetcode.com/problems/binary-tree-vertical-order-traversal)
**Companies:** Amazon, Anduril, Apple, Bloomberg, Doordash, Google, Meta, Microsoft, Snapchat

---

## Problem Description
Given the `root` of a binary tree, return ***the vertical order traversal** of its nodes' values*. (i.e., from top to bottom, column by column).

If two nodes are in the same row and column, the order should be from **left to right**.

**Constraints:**
- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 ≤ Node.val ≤ 100`

## Examples
```
Example 1:
  Input: root = [3,9,20,null,null,15,7]
  Output: [[9],[3,15],[20],[7]]

Example 2:
  Input: root = [3,9,8,4,0,1,7]
  Output: [[4],[9],[3,0,1],[8],[7]]

Example 3:
  Input: root = [1,2,3,4,10,9,11,null,5,null,null,null,null,null,null,null,6]
  Output: [[4],[2,5],[1,10,9,6],[3],[11]]
```

## Approach
Perform BFS while tracking each node's column index. Use a map from column to list of node values. Enqueue children with column-1 (left) and column+1 (right). After traversal, output the lists sorted by column.

```text
FUNCTION verticalOrder(root):
    IF root == null: RETURN []
    columnMap ← MAP from int TO list
    queue ← [(root, 0)]  // node with its column index
    WHILE queue IS NOT EMPTY:
        (node, col) ← DEQUEUE(queue)
        APPEND node.val TO columnMap[col]
        IF node.left != null: ENQUEUE(queue, (node.left, col - 1))
        IF node.right != null: ENQUEUE(queue, (node.right, col + 1))
    sortedColumns ← SORTED KEYS of columnMap ASCENDING
    RETURN [columnMap[c] FOR c IN sortedColumns]
```

## Walkthrough
For tree `[[3,9,20,null,null,15,7]]`:
1. Start with `(3,0)` → map `{0:[3]}`.
2. Enqueue left `(9,-1)` and right `(20,1)`.
3. Dequeue `(9,-1)` → map `{-1:[9],0:[3]}`.
4. Dequeue `(20,1)` → map `{... ,1:[20]}` and enqueue its children `(15,0)` and `(7,2)`.
5. Process `(15,0)` → map `0:[3,15]`.
6. Process `(7,2)` → map `2:[7]`.
7. Sorted columns -1,0,1,2 produce `[[9],[3,15],[20],[7]]`.

## Complexity Analysis
- Time: O(n) – each node visited once.
- Space: O(n) – queue and column map store up to n nodes.

## Follow-Up Questions
- How would you modify the algorithm to return nodes in top-to-bottom, left-to-right order within each column?
- Can you solve the problem using DFS with a hashmap and then sorting?
- How does the solution change if you need to output columns as a single flattened list?

## Key Takeaway
BFS with column tracking naturally groups nodes by vertical columns while preserving top-to-bottom order, enabling an O(n) vertical order traversal.
