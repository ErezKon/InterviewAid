# 3820. Pythagorean Distance Nodes in a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pythagorean-distance-nodes-in-a-tree](https://leetcode.com/problems/pythagorean-distance-nodes-in-a-tree)
**Companies:** Paypal

---

## Problem Description
Given a rooted tree with `n` nodes numbered `1..n`. Each edge has an integer length. For every pair of nodes `(u, v)`, the Euclidean distance between them is defined as `sqrt( (dist(u, v))^2 )` where `dist(u, v)` is the sum of edge lengths along the unique path. A node `v` is a *Pythagorean distance node* of `u` if `dist(u, v)` is a perfect square. Return the number of ordered pairs `(u, v)` such that `v` is a Pythagorean distance node of `u`.

## Examples
**Example 1:**
```
Edges: [(1,2,1), (2,3,3), (2,4,4)]
Pairs with perfect‑square distance: (1,2) distance 1, (1,3) distance 4, (2,4) distance 4
Answer: 3
```
**Example 2:**
```
Edges: [(1,2,2), (2,3,2)]
No pair has a perfect‑square distance → answer 0
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
