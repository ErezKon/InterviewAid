# 958. Check Completeness of a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-completeness-of-a-binary-tree](https://leetcode.com/problems/check-completeness-of-a-binary-tree)
**Companies:** Amazon, Google, Lyft, Meta, Microsoft

---

## Problem Description
Given the root of a binary tree, determine whether it is a **complete binary tree**. A complete binary tree is defined as a binary tree in which every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.

## Examples
**Example 1:**
```
Input: root = [1,2,3,4,5,6]
Output: true
Explanation: All levels are fully filled except the last, which is filled from the left.
```
**Example 2:**
```
Input: root = [1,2,3,4,5,null,7]
Output: false
Explanation: The node with value 7 appears to the right of a missing node, violating completeness.
```

## Approach
Perform a breadth‑first search (BFS). Enqueue nodes level by level. Once a `null` child is encountered, all subsequent nodes in the queue must also be `null`; otherwise the tree is not complete.

```text
FUNCTION IsCompleteTree(root):
    IF root == null:
        RETURN true
    SET queue ← new FIFO queue
    ENQUEUE(queue, root)
    SET seenNull ← false
    WHILE queue NOT EMPTY:
        SET node ← DEQUEUE(queue)
        IF node == null:
            SET seenNull ← true
        ELSE:
            IF seenNull:
                RETURN false
            ENQUEUE(queue, node.left)
            ENQUEUE(queue, node.right)
    RETURN true
```

## Walkthrough
| Step | Dequeued Node | Action | seenNull |
|------|---------------|--------|----------|
| 1 | root (1) | enqueue left(2), right(3) | false |
| 2 | 2 | enqueue left(4), right(5) | false |
| 3 | 3 | enqueue left(6), right(null) | false |
| 4 | 4 | enqueue left(null), right(null) | false |
| 5 | 5 | enqueue left(null), right(null) | false |
| 6 | 6 | enqueue left(null), right(null) | false |
| 7 | null | set seenNull true |
| 8‑… | all remaining nodes are null | no violation |
The algorithm returns `true`.

## Complexity Analysis
- **Time:** O(n) – each node is visited once.
- **Space:** O(n) – the queue may hold up to one level of nodes.

## Follow‑Up Questions
1. How would you modify the algorithm to work with a tree stored as an array (heap representation)?
2. Can you determine completeness using only depth‑first traversal?
3. What is the relationship between a complete binary tree and a binary heap?

## Key Takeaway
A BFS that flags the first `null` child and then ensures no later non‑null nodes appear perfectly captures the definition of a complete binary tree.
