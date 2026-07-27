# 3367. Maximize Sum of Weights after Edge Removals

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-sum-of-weights-after-edge-removals](https://leetcode.com/problems/maximize-sum-of-weights-after-edge-removals)
**Companies:** Gameskraft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Tree DP — O(n)](#approach-tree-dp--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a tree with `n` nodes and weighted edges, you may remove some edges such that each remaining connected component has at most `k` nodes. Maximize the **sum of weights** of remaining edges.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ k ≤ n`

---

## Key Insight

> Use **tree DP** rooted at any node. For each subtree, decide which child edges to keep based on the component size constraint. `dp[node]` tracks the maximum weight sum achievable in the subtree while keeping the component size ≤ k.

---

## Approach: Tree DP — O(n) ✅

```
FUNCTION maxWeightSum(edges, k):
    tree = BUILD_ADJACENCY(edges)
    
    FUNCTION dfs(node, parent):
        // Returns (maxWeight, componentSize)
        totalWeight = 0; size = 1
        gains = []    // (extra weight from keeping edge, child subtree size)
        
        FOR (child, weight) IN tree[node]:
            IF child == parent: CONTINUE
            childWeight, childSize = dfs(child, node)
            totalWeight += childWeight
            // Gain from keeping this edge vs cutting it
            gains.APPEND((weight, childSize))
        
        // Greedily keep edges that add weight without exceeding size k
        SORT gains by weight DESC
        FOR (w, cs) IN gains:
            IF size + cs <= k:
                totalWeight += w; size += cs
        
        RETURN (totalWeight, size)
    
    RETURN dfs(0, -1)[0]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Tree DP | **O(n log n)** | O(n) |

---

## Key Takeaway

> **Tree DP with greedy edge selection handles "maximize edge weight sum under component size constraints."** For each node, greedily keep the highest-weight child edges that fit within the size budget.
