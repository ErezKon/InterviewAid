# 965. Univalued Binary Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/univalued-binary-tree](https://leetcode.com/problems/univalued-binary-tree)
**Companies:** Box, Google, Twilio
---

## Problem Description
Given the root of a binary tree, determine whether every node in the tree has the same value. Return true if the tree is univalued, otherwise false.

## Examples
- Input: root = [1,1,1,1,1,null,1]
  Output: true // all nodes contain the value 1.
- Input: root = [2,2,2,5,2]
  Output: false // node with value 5 breaks uniformity.

## Approach
**Algorithm:** Depth‑First Search (recursive).
1. Record the value of the root.
2. Recursively verify that each child node exists and matches the root value.
3. If any mismatch is found, propagate false up the call stack.

**Pseudocode:**
```text
FUNCTION isUnivalTree(root):
    IF root IS NULL:
        RETURN TRUE
    SET target ← root.val
    RETURN dfs(root, target)

FUNCTION dfs(node, target):
    IF node IS NULL:
        RETURN TRUE
    IF node.val != target:
        RETURN FALSE
    RETURN dfs(node.left, target) AND dfs(node.right, target)
```

## Walkthrough
| Step | Node | Expected Value | Condition | Result |
|------|------|----------------|-----------|--------|
| 1 | root (1) | 1 | 1 == 1 | continue |
| 2 | left child (1) | 1 | 1 == 1 | continue |
| 3 | left‑left (1) | 1 | 1 == 1 | leaf → true |
| … | ... | ... | ... | ... |
If any node value differs, the function returns false immediately.

## Complexity Analysis
- Time: O(N) where N is the number of nodes (each visited once).
- Space: O(H) recursion stack, H = height of the tree (worst‑case O(N)).

## Follow‑Up Questions
1. How would you solve it iteratively using a stack or queue?
2. Can you extend the solution to count the number of distinct values in the tree?
3. How would you modify the algorithm to handle a large tree without recursion (tail‑call optimization or explicit stack)?

## Key Takeaway
A simple DFS that checks each node against the root value determines univalued trees in linear time.
