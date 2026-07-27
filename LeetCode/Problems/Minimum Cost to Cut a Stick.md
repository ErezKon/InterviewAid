# 1547. Minimum Cost to Cut a Stick

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-cut-a-stick](https://leetcode.com/problems/minimum-cost-to-cut-a-stick)
**Companies:** Amazon, Bloomberg, Cyware, Google, Line, Meta, Microsoft, Oracle

---

## Key Insight

> **Interval DP** — add boundaries 0 and n to the cuts array. `dp[i][j]` = min cost to cut the segment between `cuts[i]` and `cuts[j]`. Each cut at position `k` costs the segment length `cuts[j] - cuts[i]` plus the cost of the two resulting pieces.

---

## Approach: Interval DP — O(m³) ✅

```
FUNCTION minCost(n, cuts):
    cuts ← SORT([0] + cuts + [n])
    m ← LEN(cuts)
    dp ← m × m matrix of INFINITY
    FOR i DO dp[i][i+1] ← 0

    FOR length ← 2 TO m - 1 DO
        FOR i ← 0 TO m - length - 1 DO
            j ← i + length
            FOR k ← i + 1 TO j - 1 DO
                dp[i][j] ← MIN(dp[i][j], dp[i][k] + dp[k][j] + cuts[j] - cuts[i])

    RETURN dp[0][m - 1]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Interval DP | **O(m³)** | **O(m²)** |

Where m = number of cuts + 2.

---

## Key Takeaway

> **Classic interval DP** — same pattern as matrix chain multiplication. The cost of each cut equals the segment length. Try all possible first cuts and take the minimum.

---
