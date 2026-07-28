# 3493. Properties Graph

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/properties-graph](https://leetcode.com/problems/properties-graph)
**Companies:** Amazon

---

## Problem Description
You are given an undirected graph with `n` vertices numbered `1..n` and a list of edges. Each vertex `i` has an associated integer property `p[i]`. Determine whether there exists a simple path (no repeated vertices) whose vertices' properties satisfy a given predicate `P`. The predicate will be provided as a description (e.g., all properties are equal, strictly increasing, or sum to a target). Return `true` if such a path exists, otherwise `false`.

## Examples
**Example 1:**
```
 n = 5, edges = [[1,2],[2,3],[3,4],[4,5]], p = [1,2,3,4,5]
 Predicate: properties strictly increasing
```
A path `1‑2‑3‑4‑5` satisfies the predicate, so the answer is `true`.

**Example 2:**
```
 n = 4, edges = [[1,2],[2,3],[3,4]], p = [2,2,2,2]
 Predicate: all properties equal to 1
```
No vertex has property `1`; answer is `false`.

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
