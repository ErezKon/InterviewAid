# 2925. Maximum Score After Applying Operations on a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-score-after-applying-operations-on-a-tree](https://leetcode.com/problems/maximum-score-after-applying-operations-on-a-tree)
**Companies:** Google

---

## Problem Description
Given a tree with `n` nodes (rooted arbitrarily) where each node `i` has an integer value `val[i]`. You may perform the following operation any number of times: select an edge `(u, v)`, remove it, and add `val[u] * val[v]` to your score, then merge the two components by treating one node as the new root (its value becomes `val[u] + val[v]`). The operation continues until only one node remains. Return the maximum possible total score.

Constraints: `2 ≤ n ≤ 10^5`; `-10^4 ≤ val[i] ≤ 10^4`; the tree is given as an edge list.

## Examples
| vals | edges | Output | Explanation |
|------|-------|--------|-------------|
| [1,2,3] | [[0,1],[1,2]] | 11 | Merge (1,2): score+=2*3=6, new val=5; then merge (0,5): score+=1*5=5; total=11 |
| [4, -2, 1] | [[0,1],[0,2]] | 2 | Best order merges negative with positive first to minimize loss.

## Approach
**Greedy on leaf values – treat the tree as a forest of sub‑trees**
The optimal strategy is to always merge the smallest (or most negative) leaf value with its neighbor first, because its contribution is multiplied only once. Use a min‑heap of leaf values and repeatedly pop the smallest leaf, add `leaf * neighbor` to score, update neighbor's value, and adjust degrees.

### Pseudocode
```text
FUNCTION maxScoreTree(vals, edges):
    n ← LENGTH(vals)
    CREATE adjacency list adj from edges
    CREATE degree[0..n-1] ← number of neighbors for each node
    CREATE minHeap heap
    FOR i ← 0 TO n-1:
        IF degree[i] = 1: // leaf
            heap.PUSH((vals[i], i))
    SET score ← 0
    WHILE heap.SIZE > 1:
        SET (leafVal, leaf) ← heap.POP()
        // find its only neighbor
        FOR nb IN adj[leaf]:
            IF degree[nb] > 0:
                SET neighbor ← nb
                BREAK
        SET score ← score + leafVal * vals[neighbor]
        // merge leaf into neighbor
        SET vals[neighbor] ← vals[neighbor] + leafVal
        SET degree[leaf] ← 0
        SET degree[neighbor] ← degree[neighbor] - 1
        IF degree[neighbor] = 1:
            heap.PUSH((vals[neighbor], neighbor))
    RETURN score
```

## Walkthrough
For `vals = [1,2,3]` and edges `[[0,1],[1,2]]`:
1. Leaves: node 0 (1) and node 2 (3). Heap pops leaf 0 (value 1).
2. Neighbor is 1 (value 2): score += 1*2 = 2; update node 1 value → 3; degrees: node 0 removed, node 1 becomes leaf.
3. Heap now has leaf 2 (3) and leaf 1 (3). Pop leaf 2 (3), neighbor 1 (3): score += 3*3 = 9; total = 11.
Result matches optimal.

## Complexity Analysis
- **Time:** O(n log n) – each node enters the heap at most once.
- **Space:** O(n) – adjacency list, degree array, heap.

## Follow‑Up Questions
1. How would the algorithm change if merging adds `val[u] + val[v]` to the score instead of the product?
2. Can you solve the problem in O(n) using a topological‑like leaf‑pruning without a heap?
3. What if the tree is rooted and you may only merge a child into its parent?

## Key Takeaway
Processing leaves from smallest to largest ensures each node’s value is multiplied the minimal number of times, yielding a greedy O(n log n) solution for maximizing the total product score.
