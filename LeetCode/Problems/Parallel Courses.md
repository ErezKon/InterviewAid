# 1136. Parallel Courses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/parallel-courses](https://leetcode.com/problems/parallel-courses)
**Companies:** Amazon, Google, Meta, Netflix, Snowflake, Tiktok, Uber

---

## Approach: Topological Sort (BFS) — O(V+E) ✅

```
FUNCTION minimumSemesters(n, relations):
    graph = adjacency list
    inDegree = [0] * (n + 1)
    FOR [prev, next] IN relations:
        graph[prev].ADD(next)
        inDegree[next] += 1

    queue = [i for i if inDegree[i] == 0]
    semesters = 0
    studied = 0

    WHILE queue:
        semesters += 1
        nextQueue = []
        FOR node IN queue:
            studied += 1
            FOR neighbor IN graph[node]:
                inDegree[neighbor] -= 1
                IF inDegree[neighbor] == 0:
                    nextQueue.ADD(neighbor)
        queue = nextQueue

    RETURN semesters IF studied == n ELSE -1
```

BFS level = semester. If not all courses studied → cycle exists.
