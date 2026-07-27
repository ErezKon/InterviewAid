# 797. All Paths From Source to Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-paths-from-source-to-target](https://leetcode.com/problems/all-paths-from-source-to-target)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Netflix

---

```
FUNCTION allPathsSourceTarget(graph):
    result = []

    FUNCTION dfs(node, path):
        IF node == len(graph) - 1:
            result.ADD(copy of path)
            RETURN
        FOR neighbor IN graph[node]:
            path.ADD(neighbor)
            dfs(neighbor, path)
            path.POP()

    dfs(0, [0])
    RETURN result
```

DAG → no cycles → no visited set needed. Backtracking DFS.
