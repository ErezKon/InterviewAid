# 256. Paint House

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/paint-house](https://leetcode.com/problems/paint-house)
**Companies:** Amazon, Citadel, Google, Linkedin, Microsoft, Navan, Shopify, Uber

---

## Approach: DP — O(n) ✅

```
FUNCTION minCost(costs):
    FOR i ← 1 TO n - 1:
        costs[i][0] += MIN(costs[i-1][1], costs[i-1][2])
        costs[i][1] += MIN(costs[i-1][0], costs[i-1][2])
        costs[i][2] += MIN(costs[i-1][0], costs[i-1][1])

    RETURN MIN(costs[n-1])
```

No two adjacent houses same color. For k colors: O(nk) or O(n) with two-min tracking.
