# 2538. Difference Between Maximum and Minimum Price Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/difference-between-maximum-and-minimum-price-sum](https://leetcode.com/problems/difference-between-maximum-and-minimum-price-sum)
**Companies:** Directi, Medianet

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Rerooting / DFS](#approach-rerooting--dfs)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an undirected tree with `n` nodes rooted at node `0`, with edges and a `price` array where `price[i]` is the cost of node `i`.

A **path's price** is the sum of prices of all nodes on that path. For each node, the **max price path** starting from it is the costliest root-to-leaf or root-to-any-node path, and the **min price path** is just the node itself (a single node path = its own price).

Return the maximum `maxPricePath - minPricePath` over all nodes. Since the min price path from any node is just `price[node]`, this reduces to: find the path starting at some node with the maximum sum, minus that starting node's price. Equivalently, find the **longest weighted path in the tree minus one endpoint**.

**Constraints:**
- `1 <= n <= 10^5`
- `edges.length == n - 1`
- `1 <= price[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input: n=4, edges=[[0,1],[1,2],[1,3]], price=[1,4,2,3]
        0(1)
        |
        1(4)
       / \
      2(2) 3(3)

Output: 6
Explanation: Max cost path = 0→1→3 (sum=1+4+3=8), minus endpoint 0's price (1) = 7?
  Actually: for node 1, max path sum going through children = 4+max(2,3)+1 = 8.
  The answer is the max (path sum - one endpoint) = 6.
```

---

## Key Insight

> The answer equals the **maximum path sum in the tree minus the smallest endpoint**. For any path in a tree, removing one endpoint gives the largest difference. This is equivalent to finding, for each node, the maximum "one-sided" path (not counting the node itself), which is the classic rerooting DP pattern.

More precisely: for every node `u`, compute the longest path starting from `u` going into its subtree. The answer = max over all nodes of (longest path through `u` using two directions - price[u]).

---

## Approach: Rerooting / DFS ✅

1. Root the tree at node 0.
2. First DFS: compute `down[u]` = max sum path going downward from `u` (including `u`).
3. Second DFS (reroot): compute `up[u]` = max sum path going upward from `u` through its parent.
4. For each node `u`, the longest path through `u` = `down[u] + up[u] - price[u]` (or the max two children sums). The answer = max over all `u` of (longest path through `u` - price[u]).

```
FUNCTION maxOutput(n, edges, price):
    // Build adjacency list
    tree ← adjacency list from edges
    
    // DFS 1: compute maxDown[u] = max path sum going into subtree of u
    maxDown = array[n]
    FUNCTION dfs1(u, parent):
        maxDown[u] = price[u]
        FOR v IN tree[u]:
            IF v ≠ parent THEN
                dfs1(v, u)
                maxDown[u] = MAX(maxDown[u], price[u] + maxDown[v])
    dfs1(0, -1)
    
    // DFS 2: reroot to compute answer
    answer ← 0
    FUNCTION dfs2(u, parent, upMax):
        // top2 = two largest maxDown among children
        top1, top2 ← 0, 0
        FOR v IN tree[u]:
            IF v ≠ parent AND maxDown[v] > top1 THEN
                top2 ← top1; top1 ← maxDown[v]
            ELSE IF maxDown[v] > top2 THEN
                top2 ← maxDown[v]
        
        // Best path through u, excluding u's price at one end
        answer = MAX(answer, top1 + upMax)    // path = up...u...down, remove u
        answer = MAX(answer, top1 + top2)     // path = down1...u...down2, remove u
        
        FOR v IN tree[u]:
            IF v ≠ parent THEN
                childUp = price[u] + MAX(upMax, (top1 if maxDown[v]≠top1 else top2))
                dfs2(v, u, childUp)
    
    dfs2(0, -1, 0)
    RETURN answer
END FUNCTION
```

---

## Walkthrough

The key idea is that for each node, we find the longest path passing through it and subtract the price of the cheaper endpoint. The rerooting technique avoids running a separate DFS from every node.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Two DFS passes |
| **Space** | O(n) | Tree storage + recursion stack |

---

## Follow-Up Questions

**Q1: Why rerooting instead of brute-force DFS from each node?**
> Brute-force is O(n²). Rerooting computes all-nodes information in O(n) by combining downward and upward paths.

**Q2: How is this related to tree diameter?**
> Tree diameter finds the longest unweighted path. This problem finds the longest weighted path minus one endpoint — same structural DFS but with weighted sums and an optimization twist.

**Q3: Could you use two BFS passes (like tree diameter)?**
> Not directly, because we need to subtract the minimum endpoint, which changes the optimization target. The rerooting DP is more appropriate.

---

## Key Takeaway

> **"Max path minus one endpoint" on a tree is solved by rerooting DP — compute downward max paths, then propagate upward information in a second DFS to evaluate every node as a potential endpoint efficiently in O(n).**
