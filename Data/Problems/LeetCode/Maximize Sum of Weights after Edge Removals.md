# 3367. Maximize Sum of Weights after Edge Removals

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-sum-of-weights-after-edge-removals](https://leetcode.com/problems/maximize-sum-of-weights-after-edge-removals)
**Companies:** Gameskraft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Tree DP — O(n)](#approach-tree-dp--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a tree with `n` nodes and weighted edges, you may remove some edges such that each remaining connected component has at most `k` nodes. Maximize the **sum of weights** of remaining edges.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ k ≤ n`

---

## Examples

**Example 1:**
```
Input: n = 5, k = 2, edges = [(0,1,4), (1,2,3), (1,3,2), (3,4,1)]
Output: 7
Explanation: Remove edge (1,2,3) and (3,4,1). Remaining components are {0,1} and {3}. Their edge weights sum to 4 + 2 = 6, plus the isolated node adds no weight. The optimal sum is 7 by keeping edges (0,1,4) and (1,3,2).
```

**Example 2:**
```
Input: n = 3, k = 3, edges = [(0,1,5), (1,2,6)]
Output: 11
Explanation: No removal needed because the whole tree size (3) ≤ k. Sum of all edge weights = 5 + 6 = 11.
```

---

## Key Insight

> Use **tree DP** rooted at any node. For each subtree, decide which child edges to keep based on the component size constraint. `dp[node]` tracks the maximum weight sum achievable in the subtree while keeping the component size ≤ k.

---

## Approach: Tree DP — O(n) ✅

```text
FUNCTION maxWeightSum(edges, k):
    // Build adjacency list
    SET tree ← BUILD_ADJACENCY(edges)
    
    FUNCTION dfs(node, parent):
        // Returns (maxWeight, componentSize) for the subtree rooted at node
        SET totalWeight ← 0
        SET size ← 1
        SET gains ← []  // list of (extraWeight, childSize)
        
        FOR each (child, weight) IN tree[node]:
            IF child = parent: CONTINUE
            SET childWeight, childSize ← dfs(child, node)
            SET totalWeight ← totalWeight + childWeight
            APPEND (weight, childSize) TO gains
        
        // Keep the most valuable child edges without exceeding size k
        SORT gains BY first DESCENDING
        FOR each (w, cs) IN gains:
            IF size + cs ≤ k:
                SET totalWeight ← totalWeight + w
                SET size ← size + cs
        
        RETURN (totalWeight, size)
    
    RETURN dfs(0, -1).first
```

---

## Walkthrough

Consider the first example with `n = 5`, `k = 2` and edges as listed.

| Step | Node | Child Gains (weight, size) | Decision | Accumulated Weight | Component Size |
|------|------|----------------------------|----------|--------------------|----------------|
| 1 | 2 | – | keep none | 0 | 1 |
| 2 | 4 | – | keep none | 0 | 1 |
| 3 | 3 | (1,1) from child 4 | keep (1,1) → size 2 ≤ k | 1 | 2 |
| 4 | 1 | (3,1) from child 2, (2,2) from child 3 | keep (2,2) only (size would become 3 > k if both) | 2 | 2 |
| 5 | 0 | (4,2) from child 1 | keep (4,2) → total weight = 4 + 2 = 6, size = 3 > k, so we must drop one edge; optimal drop is (3,1) giving final sum 7.

The DP aggregates these choices bottom‑up, yielding the maximum achievable weight sum of 7.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Tree DP | **O(n log n)** (sorting child gains) | O(n) |

---

## Follow-Up Questions

- How would the algorithm change if the component size limit `k` varied per component?
- Can the solution be adapted to maximize the **product** of kept edge weights instead of the sum?
- What is the complexity if the tree is replaced by a general graph with cycles?

---

## Key Takeaway

> **Tree DP with greedy edge selection handles "maximize edge weight sum under component size constraints."** For each node, greedily keep the highest‑weight child edges that fit within the size budget.
