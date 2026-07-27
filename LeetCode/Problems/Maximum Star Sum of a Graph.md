# 2497. Maximum Star Sum of a Graph

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-star-sum-of-a-graph](https://leetcode.com/problems/maximum-star-sum-of-a-graph)
**Companies:** Akuna Capital, Amazon, Google

---

```
FUNCTION maxStarSum(vals, edges, k):
    neighbors = defaultdict(list)
    FOR [u, v] IN edges:
        IF vals[v] > 0: neighbors[u].ADD(vals[v])
        IF vals[u] > 0: neighbors[v].ADD(vals[u])

    maxSum = -infinity
    FOR node ← 0 TO n - 1:
        topK = sorted(neighbors[node], reverse=True)[:k]
        maxSum = MAX(maxSum, vals[node] + SUM(topK))

    RETURN maxSum
```
