# 3493. Properties Graph

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/properties-graph](https://leetcode.com/problems/properties-graph)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented path-predicate problem, not this one. Correct idea: convert each row to a set (or 100-bit mask); for every pair `i < j` compute `|set_i ∩ set_j|` and union `i`, `j` in a DSU when it is `≥ k`; return the number of components. O(n²·m).*

You are given a 2D integer array `properties` having dimensions `n x m` and an integer `k`.

Define a function `intersect(a, b)` that returns the **number of distinct integers** common to both arrays `a` and `b`.

Construct an **undirected** graph where each index `i` corresponds to `properties[i]`. There is an edge between node `i` and node `j` if and only if `intersect(properties[i], properties[j]) >= k`, where `i` and `j` are in the range `[0, n - 1]` and `i != j`.

Return the number of **connected components** in the resulting graph.

**Constraints:**
- `1 <= n == properties.length <= 100`
- `1 <= m == properties[i].length <= 100`
- `1 <= properties[i][j] <= 100`
- `1 <= k <= m`

## Examples

**Example 1:**
```
Input: properties = [[1,2],[1,1],[3,4],[4,5],[5,6],[7,7]], k = 1
Output: 3
Explanation: The graph formed has 3 connected components.
```

**Example 2:**
```
Input: properties = [[1,2,3],[2,3,4],[4,3,5]], k = 2
Output: 1
Explanation: The graph formed has 1 connected component.
```

**Example 3:**
```
Input: properties = [[1,1],[1,1]], k = 2
Output: 2
Explanation: intersect(properties[0], properties[1]) = 1, which is less than k. This means there is no edge between properties[0] and properties[1] in the graph.
```

## Approach
Perform a depth‑first search (DFS) from each vertex, maintaining the current sequence of properties. At each step, check whether extending the path keeps the predicate satisfied. Use backtracking to explore alternatives and stop early when the predicate cannot be satisfied.

```text
FUNCTION satisfiesPredicate(pathProps, predicate):
    // evaluate predicate on the list of properties
    RETURN predicate(pathProps)

FUNCTION dfs(node, visited, pathProps, predicate):
    IF satisfiesPredicate(pathProps, predicate):
        RETURN true
    FOR each neighbor IN adjacency[node]:
        IF neighbor NOT IN visited:
            ADD neighbor TO visited
            APPEND p[neighbor] TO pathProps
            IF dfs(neighbor, visited, pathProps, predicate):
                RETURN true
            REMOVE neighbor FROM visited
            POP last FROM pathProps
    RETURN false

FUNCTION hasValidPath(n, edges, p, predicate):
    BUILD adjacency list from edges
    FOR start ← 1 TO n:
        SET visited ← {start}
        SET pathProps ← [p[start]]
        IF dfs(start, visited, pathProps, predicate):
            RETURN true
    RETURN false
```

## Walkthrough
| Step | Start Vertex | Visited | Path Props | Action |
|------|--------------|---------|------------|--------|
| 1 | 1 | {1} | [1] | Check predicate → true (increasing so far) |
| 2 | 1 → 2 | {1,2} | [1,2] | Continue DFS |
| 3 | 1 → 2 → 3 | {1,2,3} | [1,2,3] | Continue |
| … | … | … | … | Reach vertex 5, predicate holds → return true |

## Complexity Analysis
- **Time:** In the worst case, DFS explores all simple paths: O(n · 2^{n}) but early pruning via the predicate reduces practical work.
- **Space:** O(n) for recursion stack and visited set.

## Follow-Up Questions
1. How would you adapt the algorithm if the predicate must hold for the sum of properties rather than the sequence?
2. Can the solution be optimized for specific predicates like “all equal” using union‑find?
3. How would you handle directed graphs or weighted edges?

## Key Takeaway
By combining DFS with incremental predicate checking, you can efficiently search for a path whose vertex properties satisfy complex conditions while pruning impossible branches early.
