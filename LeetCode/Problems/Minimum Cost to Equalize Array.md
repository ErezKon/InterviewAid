# 3139. Minimum Cost to Equalize Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-equalize-array](https://leetcode.com/problems/minimum-cost-to-equalize-array)
**Companies:** Amazon, Microsoft

---

## Key Insight

> Two operations: increment one element (cost `c1`) or increment two different elements (cost `c2`). If `c2 ≥ 2*c1`, always use single increments. Otherwise, pair up increments where possible. The bottleneck is when one element needs far more increments than the rest — it may force unpaired operations.

---

## Approach: Math + Case Analysis ✅

```
FUNCTION minCostToEqualizeArray(nums, cost1, cost2):
    MOD ← 10⁹ + 7
    maxVal ← MAX(nums)
    n ← LEN(nums)
    totalDiff ← n * maxVal - SUM(nums)
    maxDiff ← maxVal - MIN(nums)
    
    IF cost2 ≥ 2 * cost1 THEN
        RETURN (totalDiff * cost1) % MOD
    
    // Try target values from maxVal upward
    // Pair increments optimally
    best ← INFINITY
    FOR target ← maxVal TO 2*maxVal DO
        total ← target * n - SUM(nums)
        maxD ← target - MIN(nums)
        pairs ← MIN(total / 2, total - maxD)
        singles ← total - 2 * pairs
        best ← MIN(best, pairs * cost2 + singles * cost1)
    
    RETURN best % MOD
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Case analysis | **O(n + maxVal)** | **O(1)** |

---

## Key Takeaway

> **Pairing increments** — when `c2 < 2*c1`, pair as many increments as possible. The dominant element may force unpaired operations, so sometimes raising the target beyond max helps.

---
