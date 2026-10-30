# 2378. Choose Edges to Maximize Score in a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/choose-edges-to-maximize-score-in-a-tree](https://leetcode.com/problems/choose-edges-to-maximize-score-in-a-tree)
**Companies:** Sprinklr

---

## 1. Problem Description

You are given a **weighted** tree consisting of `n` nodes numbered from `0` to `n - 1`.

The tree is **rooted** at node `0` and represented with a **2D** array `edges` of size `n` where `edges[i] = [par_i, weight_i]` indicates that node `par_i` is the **parent** of node `i`, and the edge between them has a weight equal to `weight_i`. Since the root does **not** have a parent, you have `edges[0] = [-1, -1]`.

Choose some edges from the tree such that no two chosen edges are **adjacent** and the **sum** of the weights of the chosen edges is maximized.

Return *the **maximum** sum of the chosen edges*.

**Note:**
- You are allowed to **not** choose any edges in the tree, the sum of weights in this case will be `0`.
- Two edges `Edge1` and `Edge2` in the tree are **adjacent** if they have a **common** node. In other words, they are adjacent if `Edge1` connects nodes `a` and `b` and `Edge2` connects nodes `b` and `c`.

**Constraints:**
- `n == edges.length`
- `1 <= n <= 10^5`
- `edges[i].length == 2`
- `par_0 == weight_0 == -1`
- `0 <= par_i <= n - 1` for all `i >= 1`.
- `par_i != i`
- `-10^6 <= weight_i <= 10^6` for all `i >= 1`.
- `edges` represents a valid tree.

---

## 2. Key Insight

> Tree DP: for each node, track two states — `dp[node][0]` = max score if the edge from parent to node is **not** selected, `dp[node][1]` = max score if it **is** selected.

---

## 3. Approach: Tree DP — O(n) ✅

```text
FUNCTION maxScore(edges):
    // Build adjacency list with weights
    build adjacency list
    
    FUNCTION dfs(node):
        // sum of best scores from children when edge to child is NOT picked
        sumNotPicked ← 0
        FOR each child, weight IN children[node]:
            childNot, childYes ← dfs(child)
            sumNotPicked ← sumNotPicked + childNot
        
        // If edge from parent to this node is NOT picked, we may pick at most one child edge
        notPicked ← sumNotPicked
        bestGain ← 0
        FOR each child, weight IN children[node]:
            childNot, childYes ← dfs(child)
            gain ← weight + childYes - childNot   // gain if we pick this child edge
            bestGain ← MAX(bestGain, gain)
        notPicked ← notPicked + bestGain
        
        // If edge from parent to this node IS picked, cannot pick any child edge
        picked ← sumNotPicked
        
        RETURN (notPicked, picked)
    
    RETURN dfs(root)[0]
```

---

## 4. Examples

```
Example 1:
  Input: edges = [[-1,-1],[0,5],[0,10],[2,6],[2,4]]
  Output: 11
  Explanation: Choose the edges 0–1 (weight 5) and 2–3 (weight 6). The total score is 5 + 6 = 11.
  It can be shown that no better score can be obtained.
```

```
Example 2:
  Input: edges = [[-1,-1],[0,5],[0,-6],[0,7]]
  Output: 7
  Explanation: We choose the edge with weight 7.
  Note that we cannot choose more than one edge because all edges are adjacent to each other.
```

---

## 5. Walkthrough

Consider Example 1.
| Step | Node | Action | dp[node][0] | dp[node][1] |
|------|------|--------|------------|------------|
| 1 | 4 | Leaf → no children | 0 | 0 |
| 2 | 5 | Leaf → no children | 0 | 0 |
| 3 | 2 | Children 4 (w=4) & 5 (w=2) | notPicked = 0 + max(4+0-0, 2+0-0) = 4 | picked = 0 |
| 4 | 3 | Leaf → no children | 0 | 0 |
| 5 | 1 (root) | Children 2 (w=5) & 3 (w=3) | notPicked = (dp[2][0]) + max(5+dp[2][1]-dp[2][0], 3+dp[3][1]-dp[3][0]) = 4 + max(5+0-4, 3+0-0) = 4 + 5 = 9 | picked = dp[2][0] + dp[3][0] = 4 + 0 = 4 |
The answer is dp[1][0] = 9.

---

## 6. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) where n is the number of nodes | O(n) for recursion stack and dp tables |

---

## Key Takeaway

> Tree matching DP: each node decides whether to include the edge to its parent. If not included, it can greedily pick the best child edge. Classic "pick/skip" tree DP pattern.
