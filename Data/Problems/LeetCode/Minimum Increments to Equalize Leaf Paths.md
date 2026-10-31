# 3593. Minimum Increments to Equalize Leaf Paths

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-increments-to-equalize-leaf-paths](https://leetcode.com/problems/minimum-increments-to-equalize-leaf-paths)
**Companies:** Google, Microsoft

---

## Problem Description

> *Note: the Approach below sums edge-weight differences in a binary tree. Officially the costs are on nodes and you minimize the **number of nodes** whose cost is increased. Correct idea: a DFS returns each subtree's max path sum. At every node, each child whose max is below the largest child max needs one increase (`ans += 1`).*

You are given an integer `n` and an undirected tree rooted at node 0 with `n` nodes numbered from 0 to `n - 1`. This is represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i]` indicates an edge from node `u_i` to `v_i` .

Each node `i` has an associated cost given by `cost[i]`, representing the cost to traverse that node.

The **score** of a path is defined as the sum of the costs of all nodes along the path.

Your goal is to make the scores of all **root-to-leaf** paths **equal** by **increasing** the cost of any number of nodes by **any non-negative** amount.

Return the **minimum** number of nodes whose cost must be increased to make all root-to-leaf path scores equal.

**Constraints:**
- `2 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] == [u_i, v_i]`
- `0 <= u_i, v_i < n`
- `cost.length == n`
- `1 <= cost[i] <= 10^9`
- The input is generated such that `edges` represents a valid tree.

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
Input: n = 3, edges = [[0,1],[0,2]], cost = [2,1,3]
Output: 1
Explanation: There are two root-to-leaf paths:
- Path 0 → 1 has a score of 2 + 1 = 3.
- Path 0 → 2 has a score of 2 + 3 = 5.
To make all root-to-leaf path scores equal to 5, increase the cost of node 1 by 2.
Only one node is increased, so the output is 1.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1],[1,2]], cost = [5,1,4]
Output: 0
Explanation: There is only one root-to-leaf path:
- Path 0 → 1 → 2 has a score of 5 + 1 + 4 = 10.
Since only one root-to-leaf path exists, all path costs are trivially equal, and the output is 0.
```

**Example 3:**
```
Input: n = 5, edges = [[0,4],[0,1],[1,2],[1,3]], cost = [3,4,1,1,7]
Output: 1
Explanation: There are three root-to-leaf paths:
- Path 0 → 4 has a score of 3 + 7 = 10.
- Path 0 → 1 → 2 has a score of 3 + 4 + 1 = 8.
- Path 0 → 1 → 3 has a score of 3 + 4 + 1 = 8.
To make all root-to-leaf path scores equal to 10, increase the cost of node 1 by 2. Thus, the output is 1.
```

## Walkthrough

Consider Example 1. The leaf path sums are:
- Path 0→1→3 = 1 + 3 = 4
- Path 0→1→4 = 1 + 4 = 5
- Path 0→2 = 2
The maximum leaf sum under node 0 is 5 (through node 1→4). Increment edge (0-2) from 2 to 5, costing 3. After this increment all root-to-leaf sums become 5 + 1 = 6? Actually we also need to align deeper nodes; the algorithm pads shorter sub-paths at each internal node, resulting in total cost 3.

## Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(h) – recursion stack where h is tree height.

## Follow-Up Questions

1. How would the solution change if you could also **decrement** edge weights?
2. Can the algorithm be adapted for n-ary trees?
3. What if each increment has a different cost per edge?

## Key Takeaway

> To equalize all root-to-leaf paths with only increments, **pad shorter paths at each internal node** — the cost at each node is the difference between its children's max path sums.
