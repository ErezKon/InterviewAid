# 637. Average of Levels in Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/average-of-levels-in-binary-tree](https://leetcode.com/problems/average-of-levels-in-binary-tree)
**Companies:** Amazon, Google, Meta, Microsoft
---

## Problem Description

Given the `root` of a binary tree, return *the average value of the nodes on each level in the form of an array*. Answers within `10^-5` of the actual answer will be accepted.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-2^31 <= Node.val <= 2^31 - 1`

## Examples

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: [3.00000,14.50000,11.00000]
Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
Hence return [3, 14.5, 11].
```

**Example 2:**
```
Input: root = [3,9,20,15,7]
Output: [3.00000,14.50000,11.00000]
```

## Approach
Perform a breadth-first search (BFS). For each level, sum node values and divide by the number of nodes.

```text
FUNCTION averageOfLevels(root):
    IF root IS NULL: RETURN []
    SET result ← []
    SET queue ← [root]
    WHILE queue NOT EMPTY:
        SET levelSum ← 0
        SET levelCount ← LEN(queue)
        FOR i ← 0 TO levelCount - 1:
            SET node ← queue[0]
            REMOVE FIRST FROM queue
            SET levelSum ← levelSum + node.val
            IF node.left IS NOT NULL: APPEND node.left TO queue
            IF node.right IS NOT NULL: APPEND node.right TO queue
        APPEND levelSum / levelCount TO result
    RETURN result
```

## Walkthrough
For the tree `[3,9,20,null,null,15,7]`:
1. Queue starts `[3]` → sum=3, count=1 → avg=3.0.
2. Queue becomes `[9,20]` → sum=29, count=2 → avg=14.5.
3. Queue becomes `[15,7]` → sum=22, count=2 → avg=11.0.
Result `[3.0,14.5,11.0]`.

## Complexity Analysis
- **Time:** O(n) where n is number of nodes (each visited once).
- **Space:** O(w) where w is the maximum width of the tree (queue size).

## Follow-Up Questions
1. How would you compute the averages without using extra space for the queue (e.g., using recursion)?
2. Can you modify the algorithm to return the median of each level instead of the average?
3. What if the tree is extremely deep—how does recursion depth affect the solution?

## Key Takeaway
A level-order BFS naturally groups nodes by depth, allowing straightforward computation of per-level averages.
