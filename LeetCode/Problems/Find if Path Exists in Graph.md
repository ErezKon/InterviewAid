# 1971. Find if Path Exists in Graph

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-if-path-exists-in-graph](https://leetcode.com/problems/find-if-path-exists-in-graph)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION validPath(n, edges, source, destination):
    uf = UnionFind(n)
    FOR [u, v] IN edges: uf.union(u, v)
    RETURN uf.find(source) == uf.find(destination)
```
