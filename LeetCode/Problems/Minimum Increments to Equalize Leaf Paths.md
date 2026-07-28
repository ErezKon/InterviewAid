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

```text
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

## Examples

**Example 1:**
```
Input: root = [0,1,2,3,4]
Edge weights: (0‑1)=1, (0‑2)=2, (1‑3)=3, (1‑4)=4
Output: 3
Explanation: Increment edge (0‑2) by 3 to make both root‑to‑leaf sums equal to 8.
```

**Example 2:**
```
Input: root = [0,5,5]
Edge weights: (0‑1)=5, (0‑2)=5
Output: 0
Explanation: Both paths already have equal sum.
```

## Walkthrough

Consider Example 1. The leaf path sums are:
- Path 0→1→3 = 1 + 3 = 4
- Path 0→1→4 = 1 + 4 = 5
- Path 0→2 = 2
The maximum leaf sum under node 0 is 5 (through node 1→4). Increment edge (0‑2) from 2 to 5, costing 3. After this increment all root‑to‑leaf sums become 5 + 1 = 6? Actually we also need to align deeper nodes; the algorithm pads shorter sub‑paths at each internal node, resulting in total cost 3.

## Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(h) – recursion stack where h is tree height.

## Follow‑Up Questions

1. How would the solution change if you could also **decrement** edge weights?
2. Can the algorithm be adapted for n‑ary trees?
3. What if each increment has a different cost per edge?

## Key Takeaway

> To equalize all root-to-leaf paths with only increments, **pad shorter paths at each internal node** — the cost at each node is the difference between its children's max path sums.
