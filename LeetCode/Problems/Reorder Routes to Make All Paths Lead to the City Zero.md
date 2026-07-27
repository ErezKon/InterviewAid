# 1466. Reorder Routes to Make All Paths Lead to the City Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero)
**Companies:** Amazon, Google, Meta, Microsoft, Tiktok

---

```
FUNCTION minReorder(n, connections):
    graph = defaultdict(list)
    FOR [a, b] IN connections:
        graph[a].ADD((b, 1))     // original direction: needs flip
        graph[b].ADD((a, 0))     // reverse: already correct

    count = 0
    visited = set([0])
    queue = [0]

    WHILE queue:
        node = queue.DEQUEUE()
        FOR (neighbor, cost) IN graph[node]:
            IF neighbor NOT IN visited:
                visited.ADD(neighbor)
                count += cost
                queue.ENQUEUE(neighbor)

    RETURN count
```

BFS from 0. Count edges pointing away from 0 (need reversal).
