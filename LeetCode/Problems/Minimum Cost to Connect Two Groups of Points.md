# 1595. Minimum Cost to Connect Two Groups of Points

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points](https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points)
**Companies:** Google

---

## Key Insight

> Every point in both groups must be connected. Use **bitmask DP** on the smaller group. Track which group2 points are connected. After assigning all group1 points, connect remaining group2 points at minimum individual cost.

---

## Approach: DP with Bitmask — O(m · 2ⁿ · n) ✅

```
FUNCTION connectTwoGroups(cost):
    m, n ← LEN(cost), LEN(cost[0])
    // Precompute min cost to connect each group2 point
    minCost2 ← [MIN(cost[i][j] FOR i IN 0..m-1) FOR j IN 0..n-1]

    dp ← {0: 0}    // mask of group2 points connected → min cost

    FOR i ← 0 TO m - 1 DO
        newDp ← {}
        FOR mask, c IN dp.items() DO
            FOR j ← 0 TO n - 1 DO
                newMask ← mask OR (1 << j)
                newCost ← c + cost[i][j]
                newDp[newMask] ← MIN(newDp.GET(newMask, INFINITY), newCost)
        dp ← newDp

    // Connect any remaining group2 points
    allConnected ← (1 << n) - 1
    result ← INFINITY
    FOR mask, c IN dp.items() DO
        extra ← SUM(minCost2[j] FOR j WHERE bit j NOT SET IN mask)
        result ← MIN(result, c + extra)

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Bitmask DP | **O(m · 2ⁿ · n)** | **O(2ⁿ)** |

---

## Key Takeaway

> **Bitmask DP for bipartite matching** — track which group2 points are covered. After all group1 assignments, greedily connect uncovered group2 points at their cheapest individual cost.

---
