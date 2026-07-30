# 549. Binary Tree Longest Consecutive Sequence II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii)
**Companies:** Google, Meta, Uber

---

## Problem Description
Given the `root` of a binary tree, find the length of the longest path where each pair of adjacent nodes in the path has values that differ by exactly 1. The path may go **upwards or downwards** (i.e., it can change direction at a node) but must be contiguous.

## Examples
| Tree (level order) | Output | Explanation |
|--------------------|--------|-------------|
| `[2,1,3]` | 3 | Path `1‑2‑3` (increasing then decreasing) length 3.
| `[1,null,2,null,3]` | 3 | Straight increasing chain `1‑2‑3`.
| `[1,2,3,4,null,null,5]` | 4 | Longest consecutive path `4‑3‑2‑1` (decreasing).

## Approach
Use a post‑order **DFS** that returns for each node a pair `(inc, dec)`:
- `inc` = length of longest increasing consecutive sequence starting at this node.
- `dec` = length of longest decreasing consecutive sequence starting at this node.
For each child, update `inc`/`dec` if the child value is `node.val + 1` or `node.val - 1`. The longest path through the current node is `inc + dec - 1`. Keep a global maximum.

### Pseudocode
```text
FUNCTION longestConsecutive(root):
    SET maxLen ← 0
    CALL dfs(root)
    RETURN maxLen

FUNCTION dfs(node):
    IF node == null:
        RETURN (0, 0)  // (inc, dec)
    SET inc ← 1
    SET dec ← 1
    FOR child IN [node.left, node.right]:
        IF child != null:
            SET (cInc, cDec) ← dfs(child)
            IF child.val == node.val + 1:
                SET inc ← MAX(inc, cInc + 1)
            IF child.val == node.val - 1:
                SET dec ← MAX(dec, cDec + 1)
    SET maxLen ← MAX(maxLen, inc + dec - 1)
    RETURN (inc, dec)
```

## Walkthrough
Consider the tree `[2,1,3]`:
1. Leaf `1` returns `(1,1)`; leaf `3` returns `(1,1)`.
2. At node `2`, child `1` is `val‑1`, so `dec = max(1, 1+1)=2`.
3. Child `3` is `val+1`, so `inc = max(1, 1+1)=2`.
4. Path length through `2` = `inc + dec - 1 = 2+2-1 = 3`. Update `maxLen` to 3.
5. Return `(2,2)` upward; final answer 3.

## Complexity Analysis
- **Time:** `O(n)` – each node visited once.
- **Space:** `O(h)` – recursion stack, where `h` is tree height (worst‑case `O(n)`).

## Follow‑Up Questions
1. How would you adapt the algorithm for an **N‑ary tree**?
2. Can you compute the longest consecutive path **iteratively** using an explicit stack?
3. What changes are needed if the path must be strictly **downward** (no direction change)?

## Key Takeaway
A DFS that returns increasing and decreasing consecutive lengths for each subtree lets you combine them at each node to obtain the overall longest consecutive path.
