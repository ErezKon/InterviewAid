# 1022. Sum of Root To Leaf Binary Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers](https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers)
**Companies:** Amazon, Bloomberg, Google, Lime, Meta, Microsoft

---

## Problem Description
Given the root of a binary tree where each node value is either `0` or `1`, each root‑to‑leaf path represents a binary number. Compute the sum of these numbers interpreted in decimal.

## Examples
**Example 1:**
Input: root = [1,0,1,0,1,0,1]
Output: 22
Explanation: Paths are 101 (5), 100 (4), 111 (7), 110 (6); sum = 5+4+7+6 = 22.

**Example 2:**
Input: root = [0]
Output: 0
Explanation: Single node representing binary 0.

## Approach
Perform a DFS, carrying the current accumulated value `val`. At each node, left‑shift `val` by one bit and add the node's value. When a leaf is reached, add `val` to the total.

```text
FUNCTION sumRootToLeaf(root):
    SET total ← 0
    FUNCTION dfs(node, val):
        IF node == null: RETURN
        SET val ← (val << 1) OR node.val
        IF node.left == null AND node.right == null:
            SET total ← total + val
            RETURN
        dfs(node.left, val)
        dfs(node.right, val)
    dfs(root, 0)
    RETURN total
```

## Walkthrough
| Step | Node | val (binary) | Action |
|------|------|--------------|--------|
| 1 | root (1) | 1 | recurse left/right |
| 2 | left child (0) | 10 | continue |
| 3 | left‑left (0) leaf | 100 (4) → add 4 |
| 4 | left‑right (1) leaf | 101 (5) → add 5 |
| 5 | right child (1) | 11 | continue |
| 6 | right‑left (1) leaf | 110 (6) → add 6 |
| 7 | right‑right (1) leaf | 111 (7) → add 7 |
Total = 22.

## Complexity Analysis
Time: O(n) where n is number of nodes.
Space: O(h) recursion stack, h = tree height.

## Follow‑Up Questions
- How would you solve it iteratively using a stack?
- What if node values could be any digit (0‑9) and you interpret the path as a base‑10 number?
- Can you compute the sum modulo 10^9+7 for very large trees?

## Key Takeaway
Accumulating the binary value along the DFS path and adding it at leaves yields a simple linear‑time solution.
