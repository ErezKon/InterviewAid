# 298. Binary Tree Longest Consecutive Sequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-longest-consecutive-sequence](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence)
**Companies:** Amazon, Google, Meta, Tiktok

---

## Problem Description
Given the `root` of a binary tree, return *the length of the longest **consecutive sequence path***.

A **consecutive sequence path** is a path where the values **increase by one** along the path.

Note that the path can start **at any node** in the tree, and you cannot go from a node to its parent in the path.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 3 * 10⁴]`.
- `-3 * 10⁴ ≤ Node.val ≤ 3 * 10⁴`

## Examples
```
Example 1:
  Input: root = [1,null,3,2,4,null,null,null,5]
  Output: 3
  Explanation: Longest consecutive sequence path is 3-4-5, so return 3.

Example 2:
  Input: root = [2,null,3,2,null,1]
  Output: 2
  Explanation: Longest consecutive sequence path is 2-3, not 3-2-1, so return 2.
```

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
