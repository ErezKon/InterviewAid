# 2050. Parallel Courses III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/parallel-courses-iii](https://leetcode.com/problems/parallel-courses-iii)
**Companies:** Acko, Amazon, Citadel, Google, Microsoft, Snowflake, Stripe, Tiktok, Two Sigma

---

## Approach: Topological Sort + DP — O(V+E) ✅

```
FUNCTION minimumTime(n, relations, time):
    graph = adjacency list
    inDegree = [0] * (n + 1)
    FOR [prev, next] IN relations:
        graph[prev].ADD(next)
        inDegree[next] += 1

    dist = [0] * (n + 1)
    queue = []
    FOR i ← 1 TO n:
        dist[i] = time[i - 1]
        IF inDegree[i] == 0:
            queue.ENQUEUE(i)

    WHILE queue:
        u = queue.DEQUEUE()
        FOR v IN graph[u]:
            dist[v] = MAX(dist[v], dist[u] + time[v - 1])
            inDegree[v] -= 1
            IF inDegree[v] == 0:
                queue.ENQUEUE(v)

    RETURN MAX(dist)
```

Longest path in DAG = critical path. Topological order ensures prerequisites are processed first.
