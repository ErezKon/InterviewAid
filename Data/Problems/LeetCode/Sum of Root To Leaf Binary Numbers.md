# 1022. Sum of Root To Leaf Binary Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers](https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers)
**Companies:** Amazon, Bloomberg, Google, Lime, Meta, Microsoft

---

## Problem Description

You are given the `root` of a binary tree where each node has a value `0` or `1`. Each root-to-leaf path represents a binary number starting with the most significant bit.

- For example, if the path is `0 -> 1 -> 1 -> 0 -> 1`, then this could represent `01101` in binary, which is `13`.

For all leaves in the tree, consider the numbers represented by the path from the root to that leaf. Return *the sum of these numbers*.

The test cases are generated so that the answer fits in a **32-bits** integer.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 1000]`.
- `Node.val` is `0` or `1`.

## Examples

**Example 1:**
```
Input: root = [1,0,1,0,1,0,1]
Output: 22
Explanation: (100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22
```

**Example 2:**
```
Input: root = [0]
Output: 0
```

## Approach
Perform a DFS, carrying the current accumulated value `val`. At each node, left-shift `val` by one bit and add the node's value. When a leaf is reached, add `val` to the total.

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
| 3 | left-left (0) leaf | 100 (4) → add 4 |
| 4 | left-right (1) leaf | 101 (5) → add 5 |
| 5 | right child (1) | 11 | continue |
| 6 | right-left (1) leaf | 110 (6) → add 6 |
| 7 | right-right (1) leaf | 111 (7) → add 7 |
Total = 22.

## Complexity Analysis
Time: O(n) where n is number of nodes.
Space: O(h) recursion stack, h = tree height.

## Follow-Up Questions
- How would you solve it iteratively using a stack?
- What if node values could be any digit (0-9) and you interpret the path as a base-10 number?
- Can you compute the sum modulo 10^9+7 for very large trees?

## Key Takeaway
Accumulating the binary value along the DFS path and adding it at leaves yields a simple linear-time solution.
