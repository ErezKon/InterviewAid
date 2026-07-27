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

```
FUNCTION maxScore(edges):
    build adjacency list with weights
    
    FUNCTION dfs(node):
        sumNotPicked = 0    // none of node's edges to children are picked
        FOR child, weight IN children[node]:
            childNot, childYes = dfs(child)
            sumNotPicked += childNot
        
        // dp[node][0]: edge to parent NOT picked → can pick best child edge
        notPicked = sumNotPicked
        bestGain = 0
        FOR child, weight IN children[node]:
            childNot, childYes = ...
            gain = weight + childYes - childNot  // if we pick this child edge
            bestGain = MAX(bestGain, gain)
        notPicked += bestGain
        
        // dp[node][1]: edge to parent IS picked → can't pick any child edge
        picked = sumNotPicked
        
        RETURN (notPicked, picked)
    
    RETURN dfs(root)[0]
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Tree matching DP: each node decides whether to include the edge to its parent. If not included, it can greedily pick the best child edge. Classic "pick/skip" tree DP pattern.
