# 2415. Reverse Odd Levels of Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reverse-odd-levels-of-binary-tree](https://leetcode.com/problems/reverse-odd-levels-of-binary-tree)
**Companies:** Amazon, Google, Josh Technology, Jpmorgan

---

## Problem Description

Given the `root` of a **perfect** binary tree, reverse the node values at each **odd** level (1, 3, 5, ...). Level 0 is the root. Return the modified tree.

**Constraints:**
- Tree is perfect (all leaves at same depth, every internal node has 2 children)
- `1 <= number of nodes <= 2^14`

---

## Examples

**Example 1:**
```
Input: root = [2,3,5,8,13,21,34]
Output: [2,5,3,8,13,21,34]
Explanation: Level 1 nodes (3,5) are swapped.
```

**Example 2:**
```
Input: root = [7,13,11,1,5,9,3]
Output: [7,11,13,1,5,9,3]
Explanation: Level 1 nodes (13,11) are swapped; level 3 nodes (1,5,9,3) are reversed.
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
2. How would the solution change for a non‑perfect binary tree?
3. Can you perform the reversal in‑place without extra storage for the level values?

---

## Key Takeaway

> For perfect binary trees, BFS gives direct access to all nodes at each level — swapping values (rather than restructuring pointers) simplifies level‑based transformations.
