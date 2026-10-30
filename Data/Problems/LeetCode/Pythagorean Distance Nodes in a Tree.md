# 3820. Pythagorean Distance Nodes in a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pythagorean-distance-nodes-in-a-tree](https://leetcode.com/problems/pythagorean-distance-nodes-in-a-tree)
**Companies:** Paypal

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented perfect-square-distance pair-counting problem. Correct idea: run three BFS passes from `x`, `y`, `z` to get `d1`, `d2`, `d3`; for each node sort `(d1[u], d2[u], d3[u])` as `a ≤ b ≤ c` and count it if `a² + b² = c²`. O(n).*

You are given an integer `n` and an undirected tree with `n` nodes numbered from 0 to `n - 1`. The tree is represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i]` indicates an undirected edge between `u_i` and `v_i`.

You are also given three **distinct** target nodes `x`, `y`, and `z`.

For any node `u` in the tree:

- Let `dx` be the distance from `u` to node `x`
- Let `dy` be the distance from `u` to node `y`
- Let `dz` be the distance from `u` to node `z`

The node `u` is called **special** if the three distances form a **Pythagorean Triplet**.

Return an integer denoting the number of special nodes in the tree.

A **Pythagorean triplet** consists of three integers `a`, `b`, and `c` which, when sorted in **ascending** order, satisfy `a^2 + b^2 = c^2`.

The **distance** between two nodes in a tree is the number of edges on the unique path between them.

**Constraints:**
- `4 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] = [u_i, v_i]`
- `0 <= u_i, v_i, x, y, z <= n - 1`
- `x`, `y`, and `z` are pairwise **distinct**.
- The input is generated such that `edges` represent a valid tree.

## Examples

**Example 1:**
```
Input: n = 4, edges = [[0,1],[0,2],[0,3]], x = 1, y = 2, z = 3
Output: 3
Explanation:
For each node, we compute its distances to nodes x = 1, y = 2, and z = 3.
- Node 0 has distances 1, 1, and 1. After sorting, the distances are 1, 1, and 1, which do not satisfy the Pythagorean condition.
- Node 1 has distances 0, 2, and 2. After sorting, the distances are 0, 2, and 2. Since 0^2 + 2^2 = 2^2, node 1 is special.
- Node 2 has distances 2, 0, and 2. After sorting, the distances are 0, 2, and 2. Since 0^2 + 2^2 = 2^2, node 2 is special.
- Node 3 has distances 2, 2, and 0. After sorting, the distances are 0, 2, and 2. This also satisfies the Pythagorean condition.
Therefore, nodes 1, 2, and 3 are special, and the answer is 3.
```

**Example 2:**
```
Input: n = 4, edges = [[0,1],[1,2],[2,3]], x = 0, y = 3, z = 2
Output: 0
Explanation:
For each node, we compute its distances to nodes x = 0, y = 3, and z = 2.
- Node 0 has distances 0, 3, and 2. After sorting, the distances are 0, 2, and 3, which do not satisfy the Pythagorean condition.
- Node 1 has distances 1, 2, and 1. After sorting, the distances are 1, 1, and 2, which do not satisfy the Pythagorean condition.
- Node 2 has distances 2, 1, and 0. After sorting, the distances are 0, 1, and 2, which do not satisfy the Pythagorean condition.
- Node 3 has distances 3, 0, and 1. After sorting, the distances are 0, 1, and 3, which do not satisfy the Pythagorean condition.
No node satisfies the Pythagorean condition. Therefore, the answer is 0.
```

**Example 3:**
```
Input: n = 4, edges = [[0,1],[1,2],[1,3]], x = 1, y = 3, z = 0
Output: 1
Explanation:
For each node, we compute its distances to nodes x = 1, y = 3, and z = 0.
- Node 0 has distances 1, 2, and 0. After sorting, the distances are 0, 1, and 2, which do not satisfy the Pythagorean condition.
- Node 1 has distances 0, 1, and 1. After sorting, the distances are 0, 1, and 1. Since 0^2 + 1^2 = 1^2, node 1 is special.
- Node 2 has distances 1, 2, and 2. After sorting, the distances are 1, 2, and 2, which do not satisfy the Pythagorean condition.
- Node 3 has distances 1, 0, and 2. After sorting, the distances are 0, 1, and 2, which do not satisfy the Pythagorean condition.
Therefore, the answer is 1.
```

## Approach
Perform a DFS from each node computing distances to all descendants. While traversing, maintain a hash set of distances that are perfect squares (pre‑compute squares up to the maximum possible path length). For each visited node, if its accumulated distance is a perfect square, increment the count. To avoid O(n^2), use centroid decomposition: recursively decompose the tree, for each centroid count pairs crossing the centroid using distance frequency maps.

```text
FUNCTION countPythagoreanPairs(tree):
    SET maxDist ← maximum possible sum of edge lengths
    SET perfectSquares ← SET of i*i for i ← 1 TO sqrt(maxDist)
    RETURN centroidDecompose(tree, perfectSquares)

FUNCTION centroidDecompose(subtree, perfectSquares):
    IF subtree is empty: RETURN 0
    SET centroid ← findCentroid(subtree)
    MARK centroid as processed
    SET total ← 0
    // count pairs where one endpoint is centroid
    FOR each neighbor IN adjacency[centroid]:
        IF neighbor is processed: CONTINUE
        SET distances ← []
        dfsCollect(neighbor, centroid, edgeWeight, distances)
        FOR d IN distances:
            IF d IN perfectSquares:
                INCREMENT total   // (centroid, node)
        // count pairs across different subtrees via frequency map
        total += countCrossPairs(distances, globalFreq, perfectSquares)
        // merge distances into global frequency map
        FOR d IN distances: INCREMENT globalFreq[d]
    // recurse on each component
    FOR each neighbor IN adjacency[centroid]:
        IF neighbor not processed:
            total += centroidDecompose(component rooted at neighbor, perfectSquares)
    RETURN total

FUNCTION dfsCollect(node, parent, accDist, list):
    APPEND accDist TO list
    FOR each (next, w) IN adjacency[node]:
        IF next != parent AND not processed:
            dfsCollect(next, node, accDist + w, list)

FUNCTION countCrossPairs(distList, freqMap, perfectSquares):
    SET count ← 0
    FOR d IN distList:
        FOR sq IN perfectSquares:
            SET need ← sq - d
            IF need IN freqMap:
                INCREMENT count BY freqMap[need]
    RETURN count
```

## Walkthrough
| Step | Centroid | Processed Subtree Distances | Pairs Found |
|------|----------|----------------------------|-------------|
| 1 | 2 | from child 1: [1]; from child 3: [3]; from child 4: [4] | (2,4) distance 4 |
| 2 | Cross‑subtree check: 1+3=4 (perfect) → (1,3) counted |
| … | … | … | … |

## Complexity Analysis
- **Time:** Centroid decomposition gives O(n log n) with distance map operations.
- **Space:** O(n) for adjacency and auxiliary maps.

## Follow-Up Questions
1. How would the solution change if edge lengths could be negative?
2. Can you extend the algorithm to count unordered pairs only?
3. How would you adapt it for dynamic updates (adding/removing edges)?

## Key Takeaway
Centroid decomposition lets us count distance‑based pair properties efficiently by breaking the tree into manageable components and using frequency maps of path lengths.
