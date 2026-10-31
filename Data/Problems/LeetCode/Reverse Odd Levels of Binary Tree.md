# 2415. Reverse Odd Levels of Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reverse-odd-levels-of-binary-tree](https://leetcode.com/problems/reverse-odd-levels-of-binary-tree)
**Companies:** Amazon, Google, Josh Technology, Jpmorgan

---

## Problem Description

Given the `root` of a **perfect** binary tree, reverse the node values at each **odd** level of the tree.

- For example, suppose the node values at level 3 are `[2,1,3,4,7,11,29,18]`, then it should become `[18,29,11,7,4,3,1,2]`.

Return *the root of the reversed tree*.

A binary tree is **perfect** if all parent nodes have two children and all leaves are on the same level.

The **level** of a node is the number of edges along the path between it and the root node.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 2^14]`.
- `0 <= Node.val <= 10^5`
- `root` is a **perfect** binary tree.

---

## Examples

**Example 1:**
```
Input: root = [2,3,5,8,13,21,34]
Output: [2,5,3,8,13,21,34]
Explanation: The tree has only one odd level.
The nodes at level 1 are 3, 5 respectively, which are reversed and become 5, 3.
```

**Example 2:**
```
Input: root = [7,13,11]
Output: [7,11,13]
Explanation: The nodes at level 1 are 13, 11, which are reversed and become 11, 13.
```

**Example 3:**
```
Input: root = [0,1,2,0,0,0,0,1,1,1,1,2,2,2,2]
Output: [0,2,1,0,0,0,0,2,2,2,2,1,1,1,1]
Explanation: The odd levels have non-zero values.
The nodes at level 1 were 1, 2, and are 2, 1 after the reversal.
The nodes at level 3 were 1, 1, 1, 1, 2, 2, 2, 2, and are 2, 2, 2, 2, 1, 1, 1, 1 after the reversal.
```

---

## Approach

```
FUNCTION reverseOddLevels(root):
    queue ← [root]
    level ← 0
    WHILE queue IS NOT EMPTY:
        IF level MOD 2 == 1:
            vals ← [node.val FOR node IN queue]
            FOR i FROM 0 TO LENGTH(queue) - 1:
                queue[i].val ← vals[LENGTH(queue) - 1 - i]
        nextQueue ← []
        FOR node IN queue:
            IF node.left IS NOT NULL:
                APPEND node.left TO nextQueue
            IF node.right IS NOT NULL:
                APPEND node.right TO nextQueue
        queue ← nextQueue
        level ← level + 1
    RETURN root
```

---

## Walkthrough

Consider the tree `[2,3,5,8,13,21,34]`:
| Level | Nodes before | Action |
|-------|--------------|--------|
| 0 | 2 | No change |
| 1 | 3, 5 | Reverse → 5, 3 |
| 2 | 8,13,21,34 | No change |
Resulting tree values become `[2,5,3,8,13,21,34]`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — visit every node once |
| Space  | O(n) — queue holds up to n/2 nodes at the widest level |

---

## Follow-Up Questions

1. How would you solve the problem using a recursive DFS that swaps mirrored nodes?
2. How would the solution change for a non-perfect binary tree?
3. Can you perform the reversal in-place without extra storage for the level values?

---

## Key Takeaway

> For perfect binary trees, BFS gives direct access to all nodes at each level — swapping values (rather than restructuring pointers) simplifies level-based transformations.
