# 1548. The Most Similar Path in a Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-most-similar-path-in-a-graph](https://leetcode.com/problems/the-most-similar-path-in-a-graph)
**Companies:** Google

---

## Problem Description
Given a directed graph where each edge has a string label, a `source` node, a `destination` node, and a list of `targetPath` strings, find a path from `source` to `destination` whose concatenated edge labels have the smallest edit distance to `targetPath`. Return the sequence of node IDs representing that path. If multiple paths have the same minimal distance, return any one.

## Examples
**Example 1:**
```
n = 5
edges = [[0,1,"a"],[1,2,"b"],[0,3,"c"],[3,2,"d"]]
source = 0
destination = 2
targetPath = ["a","b"]
Output = [0,1,2]
```
The path 0→1→2 matches the target labels exactly, giving distance 0.

**Example 2:**
```
n = 4
edges = [[0,1,"x"],[1,2,"y"],[2,3,"z"]]
source = 0
destination = 3
targetPath = ["a","b","c"]
Output = [0,1,2,3]
```
The only possible path has labels ["x","y","z"], which has edit distance 3 to the target.

## Approach
Treat each node as a state and perform a BFS/DFS while maintaining the edit‑distance DP table for the prefix of `targetPath` matched so far. For each traversed edge, update the DP using the classic Levenshtein recurrence (insert, delete, replace). Keep the minimal distance when reaching `destination`.

```text
FUNCTION mostSimilarPath(n, edges, source, destination, targetPath):
    // Build adjacency list with labels
    adj ← MAP FROM node TO LIST OF (neighbor, label)
    FOR (u,v,label) IN edges:
        APPEND (v,label) TO adj[u]

    m ← LENGTH(targetPath)
    // DP table: distance[node][i] = min edit distance to match first i labels ending at node
    distance ← 2D ARRAY n × (m+1) FILLED WITH INF
    SET distance[source][0] ← 0
    queue ← LIST()
    ENQUEUE(queue, (source,0))

    WHILE queue IS NOT EMPTY:
        (node,i) ← DEQUEUE(queue)
        IF node = destination AND i = m: RETURN reconstructPath(node,i)
        FOR (nbr, lbl) IN adj[node]:
            // Compute edit distance for extending with lbl
            newDist ← distance[node][i] + editCost(lbl, targetPath[i])
            IF newDist < distance[nbr][i+1]:
                SET distance[nbr][i+1] ← newDist
                ENQUEUE(queue, (nbr,i+1))
    RETURN bestPathFound()

FUNCTION editCost(label, target):
    IF label = target: RETURN 0 ELSE RETURN 1   // replace cost; insert/delete handled by DP transitions
```
The DP updates consider insertions, deletions, and replacements to compute Levenshtein distance.

## Walkthrough
| Step | Node | i (matched labels) | Action |
|------|------|--------------------|--------|
| 1 | 0 | 0 | Start at source with distance 0 |
| 2 | 0→1 (label "a") | 1 | Match first target label, cost 0 |
| 3 | 1→2 (label "b") | 2 | Match second label, total distance 0, reach destination |
| … | … | … | If exact match not possible, DP explores alternatives and records minimal edit distance.

## Complexity Analysis
- **Time:** O((n + e)·m) where `e` is number of edges and `m` is length of `targetPath`, due to DP updates per edge per prefix.
- **Space:** O(n·m) for the distance table.

## Follow-Up Questions
1. How would you adapt the algorithm to return the path with the smallest *weighted* edit distance if each edit operation has a different cost?
2. Can the solution be optimized using A* search with a heuristic based on remaining unmatched target labels?
3. How would you handle cycles in the graph to avoid infinite exploration while still finding the optimal path?

## Key Takeaway
Combine graph traversal with Levenshtein‑style DP to track edit distance while extending paths, yielding the most similar path to a target label sequence.
