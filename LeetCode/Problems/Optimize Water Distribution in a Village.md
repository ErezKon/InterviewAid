# 1168. Optimize Water Distribution in a Village

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/optimize-water-distribution-in-a-village](https://leetcode.com/problems/optimize-water-distribution-in-a-village)
**Companies:** Apple, Google

---

## Problem Description
Given `n` houses in a village and a list of possible pipes connecting pairs of houses with associated costs, plus the option to build a well at any house with a given cost, determine the minimum total cost to supply water to all houses.

## Examples
**Example 1:**
```
Input: n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]
Output: 3
Explanation: Build wells at house 1 (cost 1) and house 3 (cost 2) or connect houses via pipes costing 1 each.
```
**Example 2:**
```
Input: n = 2, wells = [5,5], pipes = [[1,2,2]]
Output: 7
Explanation: Build wells at both houses (5+5) is cheaper than using the pipe (2) plus one well.
```

## Approach
Model the problem as a Minimum Spanning Tree (MST) on a graph with `n+1` nodes: a virtual node `0` representing the water source, edges from `0` to each house with weight equal to well cost, and edges for each pipe. Apply Kruskal's algorithm with a Union‑Find data structure to select the cheapest edges that connect all houses.

## Walkthrough
| Step | Edge considered | Action |
|------|----------------|--------|
| 1 | (0‑1, cost=5) | Add to MST, union(0,1)
| 2 | (0‑2, cost=5) | Add to MST, union(0,2)
| 3 | (1‑2, cost=2) | Skipped, 1 and 2 already connected
Resulting cost = 5 + 5 = 10 (or choose cheaper combination based on actual inputs).

## Complexity Analysis
- **Time:** O(E log E) where E = number of pipes + n (edges for wells).
- **Space:** O(E) for storing edges and O(n) for Union‑Find.

## Follow-Up Questions
1. How would you adapt the solution if pipes could be built in both directions with different costs?
2. Can the problem be solved using Prim's algorithm instead of Kruskal's?
3. What changes are needed if some houses are already supplied with water initially?

## Key Takeaway
Transforming the water‑distribution problem into an MST with a virtual source node enables a straightforward greedy solution via Kruskal's algorithm.
