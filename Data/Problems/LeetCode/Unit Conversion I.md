# 3528. Unit Conversion I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unit-conversion-i](https://leetcode.com/problems/unit-conversion-i)
**Companies:** Adobe

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below solve an Evaluate-Division-style query problem. Correct idea: the conversions form a tree rooted at unit 0; DFS/BFS from 0 (explicit stack to avoid deep recursion), setting `ans[t] = ans[s] · w mod 10⁹+7` for each edge `s → t` with factor `w`. O(n).*

There are `n` types of units indexed from `0` to `n - 1`. You are given a 2D integer array `conversions` of length `n - 1`, where `conversions[i] = [sourceUnit_i, targetUnit_i, conversionFactor_i]`. This indicates that a single unit of type `sourceUnit_i` is equivalent to `conversionFactor_i` units of type `targetUnit_i`.

Return an array `baseUnitConversion` of length `n`, where `baseUnitConversion[i]` is the number of units of type `i` equivalent to a single unit of type 0. Since the answer may be large, return each `baseUnitConversion[i]` **modulo** `10^9 + 7`.

**Constraints:**
- `2 <= n <= 10^5`
- `conversions.length == n - 1`
- `0 <= sourceUnit_i, targetUnit_i < n`
- `1 <= conversionFactor_i <= 10^9`
- It is guaranteed that unit 0 can be converted into any other unit through a **unique** combination of conversions without using any conversions in the opposite direction.

## Examples

**Example 1:**
```
Input: conversions = [[0,1,2],[1,2,3]]
Output: [1,2,6]
Explanation:
- Convert a single unit of type 0 into 2 units of type 1 using conversions[0].
- Convert a single unit of type 0 into 6 units of type 2 using conversions[0], then conversions[1].
```

**Example 2:**
```
Input: conversions = [[0,1,2],[0,2,3],[1,3,4],[1,4,5],[2,5,2],[4,6,3],[5,7,4]]
Output: [1,2,3,8,10,6,30,24]
Explanation:
- Convert a single unit of type 0 into 2 units of type 1 using conversions[0].
- Convert a single unit of type 0 into 3 units of type 2 using conversions[1].
- Convert a single unit of type 0 into 8 units of type 3 using conversions[0], then conversions[2].
- Convert a single unit of type 0 into 10 units of type 4 using conversions[0], then conversions[3].
- Convert a single unit of type 0 into 6 units of type 5 using conversions[1], then conversions[4].
- Convert a single unit of type 0 into 30 units of type 6 using conversions[0], conversions[3], then conversions[5].
- Convert a single unit of type 0 into 24 units of type 7 using conversions[1], conversions[4], then conversions[6].
```

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
