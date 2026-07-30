# 2378. Choose Edges to Maximize Score in a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/choose-edges-to-maximize-score-in-a-tree](https://leetcode.com/problems/choose-edges-to-maximize-score-in-a-tree)
**Companies:** Sprinklr

---

## 1. Problem Description

Given a rooted tree where each edge has a weight, select a subset of edges such that **no two selected edges share a node**. Maximize the total weight. This is a maximum weight matching on a tree.

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

**Example 1:**
```
Input: edges = [[1,2,5],[1,3,3],[2,4,4],[2,5,2]]
Output: 9
Explanation: Choose edges (1,2) with weight 5 and (2,4) with weight 4. No two chosen edges share a node.
```

**Example 2:**
```
Input: edges = [[1,2,1],[1,3,2],[2,4,3],[3,5,4]]
Output: 7
Explanation: Choose edges (2,4) and (3,5) for a total weight of 3+4=7.
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
