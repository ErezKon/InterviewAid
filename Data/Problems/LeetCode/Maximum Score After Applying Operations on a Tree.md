# 2925. Maximum Score After Applying Operations on a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-score-after-applying-operations-on-a-tree](https://leetcode.com/problems/maximum-score-after-applying-operations-on-a-tree)
**Companies:** Google

---

## Problem Description

> *Note: the Approach below (leaf-merging heap) solves an invented problem. Officially you collect node values but every root-to-leaf path must keep a non-zero node. Correct idea: `answer = Σ values − cost(0)`, where `cost(v) = values[v]` for a leaf and `min(values[v], Σ cost(child))` otherwise (one DFS).*

There is an undirected tree with `n` nodes labeled from 0 to `n - 1`, and rooted at node 0. You are given a 2D integer array `edges` of length `n - 1`, where `edges[i] = [a_i, b_i]` indicates that there is an edge between nodes `a_i` and `b_i` in the tree.

You are also given a **0-indexed** integer array `values` of length `n`, where `values[i]` is the **value** associated with the `i^th` node.

You start with a score of 0. In one operation, you choose a node `i`, **add** `values[i]` to your score, and then **set** `values[i]` to 0. All three steps happen together as a single operation.

A tree is **healthy** if, for **every** leaf node, the sum of the **current** values on the path from the root to that leaf is **not equal** to 0.

Return the **maximum score** you can obtain by performing this operation on the tree any number of times, so that the tree remains **healthy** at the end.

**Constraints:**
- `2 <= n <= 2 * 10^4`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`
- `values.length == n`
- `1 <= values[i] <= 10^9`
- The input is generated such that `edges` represents a valid tree.

## Examples

**Example 1:**
```
Input: edges = [[0,1],[0,2],[0,3],[2,4],[4,5]], values = [5,2,5,2,1,1]
Output: 11
Explanation: We apply the operation to nodes 1, 2, 3, 4, and 5, so the values become [5,0,0,0,0,0]. The leaves are nodes 1, 3, and 5.
- The sum of values on the path from 0 to 1 is equal to 5.
- The sum of values on the path from 0 to 3 is equal to 5.
- The sum of values on the path from 0 to 5 is equal to 5.
Every leaf has a non-zero path sum, so the tree is healthy. The score is the sum of the original values of the chosen nodes: 2 + 5 + 2 + 1 + 1 = 11.
It can be shown that 11 is the maximum score obtainable by performing any number of operations on the tree.
```

**Example 2:**
```
Input: edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], values = [20,10,9,7,4,3,5]
Output: 40
Explanation: We apply the operation to nodes 0, 2, 3, and 4, so the values become [0,10,0,0,0,3,5]. The leaves are nodes 3, 4, 5, and 6.
- The sum of values on the path from 0 to 3 is equal to 10.
- The sum of values on the path from 0 to 4 is equal to 10.
- The sum of values on the path from 0 to 5 is equal to 3.
- The sum of values on the path from 0 to 6 is equal to 5.
Every leaf has a non-zero path sum, so the tree is healthy. The score is the sum of the original values of the chosen nodes: 20 + 9 + 7 + 4 = 40.
It can be shown that 40 is the maximum score obtainable by performing any number of operations on the tree.
```

## Approach
**Greedy on leaf values – treat the tree as a forest of sub-trees**
The optimal strategy is to always merge the smallest (or most negative) leaf value with its neighbor first, because its contribution is multiplied only once. Use a min-heap of leaf values and repeatedly pop the smallest leaf, add `leaf * neighbor` to score, update neighbor's value, and adjust degrees.

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
1. Leaves: node 0 (1) and node 2 (3). Heap pops leaf 0 (value 1).
2. Neighbor is 1 (value 2): score += 1*2 = 2; update node 1 value → 3; degrees: node 0 removed, node 1 becomes leaf.
3. Heap now has leaf 2 (3) and leaf 1 (3). Pop leaf 2 (3), neighbor 1 (3): score += 3*3 = 9; total = 11.
Result matches optimal.

## Complexity Analysis
- **Time:** O(n log n) – each node enters the heap at most once.
- **Space:** O(n) – adjacency list, degree array, heap.

## Follow-Up Questions
1. How would the algorithm change if merging adds `val[u] + val[v]` to the score instead of the product?
2. Can you solve the problem in O(n) using a topological-like leaf-pruning without a heap?
3. What if the tree is rooted and you may only merge a child into its parent?

## Key Takeaway
Processing leaves from smallest to largest ensures each node’s value is multiplied the minimal number of times, yielding a greedy O(n log n) solution for maximizing the total product score.
