# 797. All Paths From Source to Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-paths-from-source-to-target](https://leetcode.com/problems/all-paths-from-source-to-target)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Netflix

---

## Problem Description
Given a directed acyclic graph (DAG) represented as an adjacency list `graph`, return all possible paths from node `0` (source) to node `n-1` (target). Each path should be a list of node indices.

## Examples
**Example 1**
Input: `graph = [[1,2],[3],[3],[]]`
Output: `[[0,1,3],[0,2,3]]`
Explanation: Two paths exist: 0→1→3 and 0→2→3.

**Example 2**
Input: `graph = [[4,3,1],[3,2,4],[3],[4],[]]`
Output: `[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]`

## Approach
**Algorithm:** Depth‑First Search (DFS) with backtracking.
1. Start DFS from node `0` with a path list containing `[0]`.
2. If the current node equals `n‑1`, add a copy of the path to the result.
3. Otherwise, for each neighbor, append the neighbor to the path, recurse, then pop it (backtrack).
4. Since the graph is a DAG, no visited set is required.

## Walkthrough
| Step | Current node | Path so far | Action |
|------|--------------|------------|--------|
| 1 | 0 | [0] | Explore neighbors 1,2,4 |
| 2 | 1 | [0,1] | Explore neighbor 3 |
| 3 | 3 | [0,1,3] | Explore neighbor 4 → add `[0,1,3,4]` to result |
| 4 | Backtrack to 0, explore neighbor 2 → ... |
| … | | | |

## Complexity Analysis
- **Time:** O(V + E + P·L) where `P` is the number of paths and `L` is average path length (each edge is traversed in each path).
- **Space:** O(L) recursion stack plus O(P·L) for storing results.

## Follow‑Up Questions
1. How would you modify the algorithm to return paths in lexicographic order?
2. Can you implement an iterative version using a stack?
3. What changes are needed if the graph may contain cycles?

## Key Takeaway
DFS with backtracking naturally enumerates all source‑to‑target paths in a DAG by exploring each branch and recording complete paths.

---

```text
FUNCTION allPathsSourceTarget(graph):
    result ← []
    n ← len(graph)

    FUNCTION dfs(node, path):
        IF node = n - 1:
            APPEND COPY(path) TO result
            RETURN
        FOR neighbor IN graph[node]:
            APPEND neighbor TO path
            dfs(neighbor, path)
            POP path

    dfs(0, [0])
    RETURN result
```