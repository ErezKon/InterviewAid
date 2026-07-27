# 2976. Minimum Cost to Convert String I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-convert-string-i](https://leetcode.com/problems/minimum-cost-to-convert-string-i)
**Companies:** Amazon, Atlassian, Google, Microsoft

---

## Key Insight

> Build a 26×26 shortest path matrix between all letters using **Floyd-Warshall**. Then for each position where `source[i] ≠ target[i]`, add the shortest conversion cost.

---

## Approach: Floyd-Warshall + Greedy — O(26³ + n) ✅

```
FUNCTION minimumCost(source, target, original, changed, cost):
    // Build shortest path between all 26 letters
    dist ← 26×26 of INFINITY
    FOR i DO dist[i][i] ← 0
    FOR i ← 0 TO LEN(original) - 1 DO
        u ← ORD(original[i]) - ORD('a')
        v ← ORD(changed[i]) - ORD('a')
        dist[u][v] ← MIN(dist[u][v], cost[i])

    // Floyd-Warshall
    FOR k, i, j DO
        dist[i][j] ← MIN(dist[i][j], dist[i][k] + dist[k][j])

    total ← 0
    FOR i ← 0 TO LEN(source) - 1 DO
        IF source[i] ≠ target[i] THEN
            d ← dist[ORD(source[i]) - ORD('a')][ORD(target[i]) - ORD('a')]
            IF d = INFINITY THEN RETURN -1
            total ← total + d

    RETURN total
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Floyd-Warshall + scan | **O(26³ + n)** | **O(26²)** |

---

## Key Takeaway

> **All-pairs shortest path on 26 letters** — Floyd-Warshall on a tiny graph (26 nodes) gives O(1) per character lookup. Clean separation of graph preprocessing and string processing.

---
