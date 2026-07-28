# 3528. Unit Conversion I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unit-conversion-i](https://leetcode.com/problems/unit-conversion-i)
**Companies:** Adobe
---

## Problem Description
Given a list of conversion equations between pairs of units (e.g., "km" to "m" with factor 1000) and queries asking for the conversion factor between two units, compute the factor for each query. If conversion is impossible, return -1.0.

## Examples
- Input: equations = [["km","m"],["m","cm"]], values = [1000.0,100.0], queries = [["km","cm"],["cm","km"]]
  Output: [100000.0,0.00001]
- Input: equations = [["kg","g"]], values = [1000.0], queries = [["g","kg"],["kg","lb"]]
  Output: [0.001,-1.0]

## Approach
**Algorithm:** Build a graph where units are nodes and conversion factors are edge weights. Use DFS/BFS to find a path between query units, multiplying edge weights along the path.

**Pseudocode:**
```text
FUNCTION buildGraph(equations, values):
    SET graph ← EMPTY MAP
    FOR i FROM 0 TO LENGTH(equations)-1:
        SET u ← equations[i][0]
        SET v ← equations[i][1]
        SET factor ← values[i]
        ADD (v, factor) TO graph[u]
        ADD (u, 1/factor) TO graph[v]
    RETURN graph

FUNCTION queryFactor(graph, src, dst):
    IF src NOT IN graph OR dst NOT IN graph:
        RETURN -1.0
    IF src == dst:
        RETURN 1.0
    SET visited ← EMPTY SET
    SET stack ← [(src, 1.0)]
    WHILE stack NOT EMPTY:
        SET (node, prod) ← POP(stack)
        IF node == dst:
            RETURN prod
        ADD node TO visited
        FOR (neighbor, weight) IN graph[node]:
            IF neighbor NOT IN visited:
                PUSH(stack, (neighbor, prod * weight))
    RETURN -1.0

FUNCTION calcEquation(equations, values, queries):
    SET graph ← buildGraph(equations, values)
    SET results ← EMPTY LIST
    FOR (src, dst) IN queries:
        APPEND queryFactor(graph, src, dst) TO results
    RETURN results
```

## Walkthrough
| Step | Edge Added | Graph Snapshot |
|------|------------|----------------|
| 1 | km → m (1000) & m → km (0.001) | km:{(m,1000)} m:{(km,0.001)} |
| 2 | m → cm (100) & cm → m (0.01) | m:{(km,0.001),(cm,100)} cm:{(m,0.01)} |
Query "km"→"cm": path km→m→cm, product 1000*100 = 100000.

## Complexity Analysis
- Building graph: O(E) time, O(E) space where E is number of equations.
- Each query DFS/BFS: O(V+E) in worst case, V = number of units.

## Follow‑Up Questions
1. How would you handle updates to the conversion list dynamically?
2. Can you improve query time using Union‑Find with weight ratios?
3. How would you detect contradictory conversion equations?

## Key Takeaway
Model unit conversions as a weighted graph; a simple graph traversal yields conversion factors between any two connected units.
