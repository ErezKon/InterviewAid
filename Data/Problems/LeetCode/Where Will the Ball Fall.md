# 1706. Where Will the Ball Fall

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/where-will-the-ball-fall](https://leetcode.com/problems/where-will-the-ball-fall)
**Companies:** Google
---

## Problem Description
You are given a binary tree where each node has a value `0` (left) or `1` (right). Starting from the root, a ball drops down the tree: at each node it moves to the left child if the node’s value is `0`, otherwise to the right child. Return the value of the leaf node where the ball stops.

## Examples
- Input: `[0,0,1,null,0,0,1]` (tree representation) → Output: leaf value `0`.
- Input: `[1,0,1,1,0,null,0]` → Output: leaf value `1`.

## Approach
Traverse the tree from the root following the direction indicated by each node’s value until a leaf is reached.

```text
FUNCTION findBallLeaf(root):
    SET node ← root
    WHILE node.left ≠ null OR node.right ≠ null:
        IF node.val = 0:
            SET node ← node.left
        ELSE:
            SET node ← node.right
    RETURN node.val
```

## Walkthrough
| Current node value | Move to |
|--------------------|---------|
| 0 (root)           | left child |
| 1                  | right child |
| …                  | … |
Continue until a leaf is reached; return its value.

## Complexity Analysis
- Time: O(h) where h is the height of the tree (≤ number of nodes).
- Space: O(1) extra space.

## Follow‑Up Questions
- How would you handle a tree where nodes can have both left and right children regardless of value?
- What if the ball could bounce back on certain nodes?
- Can you compute the path taken as a binary string?

## Key Takeaway
A simple deterministic traversal following node values yields the final leaf in linear time relative to tree height.
