# 107. Binary Tree Level Order Traversal II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-level-order-traversal-ii](https://leetcode.com/problems/binary-tree-level-order-traversal-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Problem Description
Given the `root` of a binary tree, return *the bottom-up level order traversal of its nodes' values*. (i.e., from left to right, level by level from leaf to root).

**Constraints:**
- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 ≤ Node.val ≤ 1000`

## Examples
```
Example 1:
  Input: root = [3,9,20,null,null,15,7]
  Output: [[15,7],[9,20],[3]]

Example 2:
  Input: root = [1]
  Output: [[1]]

Example 3:
  Input: root = []
  Output: []
```

## Approach
Perform a standard breadth‑first search (BFS) to collect nodes level by level, then reverse the list of levels.

### Pseudocode
```text
FUNCTION levelOrderBottom(root):
    IF root == null:
        RETURN []
    SET queue ← [root]
    SET levels ← []
    WHILE queue NOT EMPTY:
        SET levelSize ← LENGTH(queue)
        SET current ← []
        FOR i FROM 1 TO levelSize:
            SET node ← DEQUEUE(queue)
            APPEND node.val TO current
            IF node.left != null:
                ENQUEUE(node.left, queue)
            IF node.right != null:
                ENQUEUE(node.right, queue)
        APPEND current TO levels
    REVERSE levels
    RETURN levels
```

## Walkthrough
For `[3,9,20,null,null,15,7]`:
1. Queue `[3]` → level `[3]`.
2. Queue `[9,20]` → level `[9,20]`.
3. Queue `[15,7]` → level `[15,7]`.
4. Collected levels `[[3],[9,20],[15,7]]`; reverse → `[[15,7],[9,20],[3]]`.

## Complexity Analysis
- **Time:** `O(n)` – each node enqueued and dequeued once.
- **Space:** `O(n)` – queue holds at most one level of nodes; result stores all nodes.

## Follow‑Up Questions
1. How would you output the levels in **top‑down** order without reversing?
2. Can you solve it using a **deque** to prepend each level during BFS?
3. How would you modify the algorithm for a **N‑ary tree**?

## Key Takeaway
A simple BFS collects levels in natural order; reversing the list yields bottom‑up traversal.
