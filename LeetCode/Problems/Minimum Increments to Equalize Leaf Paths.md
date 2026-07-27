# 3593. Minimum Increments to Equalize Leaf Paths

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-increments-to-equalize-leaf-paths](https://leetcode.com/problems/minimum-increments-to-equalize-leaf-paths)
**Companies:** Google, Microsoft

---

## Problem Description

Given a binary tree with edge weights, you can **increment** any edge weight. Return the **minimum total increments** so that all root-to-leaf paths have the same total weight.

## Key Insight

> DFS bottom-up: at each node, find the maximum path sum among its children's subtrees. Increment the shorter paths to match the longest. The cost = sum of differences.

## Approach: DFS Bottom-Up — O(n) ✅

```
FUNCTION minIncrements(root):
    totalCost ← 0

    FUNCTION dfs(node):
        IF node is leaf: RETURN 0
        leftMax ← dfs(left) + leftEdgeWeight
        rightMax ← dfs(right) + rightEdgeWeight
        totalCost += ABS(leftMax - rightMax)
        RETURN MAX(leftMax, rightMax)

    dfs(root)
    RETURN totalCost
```

| Time | Space |
|------|-------|
| O(n) | O(h) — recursion depth |

## Key Takeaway

> To equalize all root-to-leaf paths with only increments, **pad shorter paths at each internal node** — the cost at each node is the difference between its children's max path sums.
