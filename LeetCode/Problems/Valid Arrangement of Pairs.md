# 2097. Valid Arrangement of Pairs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/valid-arrangement-of-pairs](https://leetcode.com/problems/valid-arrangement-of-pairs)
**Companies:** Amazon, Goldman Sachs, Google, Snapchat

---

## Approach: Eulerian Path — O(E) ✅

```
FUNCTION validArrangement(pairs):
    graph = defaultdict(list)
    inDeg = Counter(); outDeg = Counter()
    FOR [a, b] IN pairs:
        graph[a].ADD(b)
        outDeg[a] += 1; inDeg[b] += 1

    // Find start node (outDeg - inDeg == 1), or any node
    start = pairs[0][0]
    FOR node IN outDeg:
        IF outDeg[node] - inDeg[node] == 1:
            start = node; BREAK

    // Hierholzer's algorithm
    path = []; stack = [start]
    WHILE stack:
        IF graph[stack[-1]]:
            stack.PUSH(graph[stack[-1]].POP())
        ELSE:
            path.ADD(stack.POP())

    path.REVERSE()
    RETURN [[path[i], path[i+1]] for i in range(len(path)-1)]
```
