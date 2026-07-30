# 298. Binary Tree Longest Consecutive Sequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-longest-consecutive-sequence](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence)
**Companies:** Amazon, Google, Meta, Tiktok

---

## Problem Description
Given the `root` of a binary tree, find the length of the longest **downward** path where each child node’s value is exactly one greater than its parent’s value. The path must move from parent to child only.

## Examples
| Tree (level order) | Output | Explanation |
|--------------------|--------|-------------|
| `[1,2,3,4,null,null,5]` | 3 | Path `1‑2‑3` (or `1‑2‑4`) length 3.
| `[2,null,3,4,null,5]` | 4 | Path `2‑3‑4‑5` length 4.
| `[]` | 0 | Empty tree has length 0.

## Approach
Perform a **DFS** that carries the current consecutive length from the parent. If the current node continues the sequence (`node.val == parent.val + 1`), increment the length; otherwise reset to 1. Update a global maximum at each node.

### Pseudocode
```text
FUNCTION longestConsecutive(root):
    SET maxLen ← 0
    CALL dfs(root, null, 0)
    RETURN maxLen

FUNCTION dfs(node, parent, length):
    IF node == null:
        RETURN
    IF parent != null AND node.val == parent.val + 1:
        SET length ← length + 1
    ELSE:
        SET length ← 1
    SET maxLen ← MAX(maxLen, length)
    CALL dfs(node.left, node, length)
    CALL dfs(node.right, node, length)
```

## Walkthrough
For `[1,2,3,4]`:
1. Root `1` starts length 1 → `maxLen=1`.
2. Child `2` continues (`2==1+1`) → length 2, `maxLen=2`.
3. Child `3` continues → length 3, `maxLen=3`.
4. Child `4` continues → length 4, `maxLen=4`.
Result = 4.

## Complexity Analysis
- **Time:** `O(n)` – each node visited once.
- **Space:** `O(h)` – recursion stack, where `h` is tree height (worst‑case `O(n)`).

## Follow‑Up Questions
1. How would you handle paths that may go **upwards** as well as downwards?
2. Can you adapt the solution for an **N‑ary tree**?
3. What changes are needed to return the actual node sequence, not just its length?

## Key Takeaway
A simple DFS that propagates the current consecutive length from parent to child efficiently finds the longest downward consecutive sequence.
