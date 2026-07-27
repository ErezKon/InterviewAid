# 1066. Campus Bikes II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/campus-bikes-ii](https://leetcode.com/problems/campus-bikes-ii)
**Companies:** Google

---

## 1. Problem Description

Given `n` workers and `m` bikes, find the assignment that minimizes the **total** Manhattan distance. Each worker gets exactly one bike.

---

## 2. Key Insight

> This is a minimum-cost assignment problem. With n ≤ 10, use **DP with bitmask** over bike assignments: `dp[mask]` = min cost to assign bikes (represented by mask) to the first `popcount(mask)` workers.

---

## 3. Approach: Bitmask DP — O(n × 2^m) ✅

```
FUNCTION assignBikes(workers, bikes):
    n, m = len(workers), len(bikes)
    dp = {0: 0}    // bitmask of used bikes → min cost
    
    FOR i ← 0 TO n-1:    // assign bike to worker i
        newDp = {}
        FOR mask, cost IN dp:
            FOR j ← 0 TO m-1:
                IF mask & (1 << j): CONTINUE
                newMask = mask | (1 << j)
                newCost = cost + manhattan(workers[i], bikes[j])
                newDp[newMask] = MIN(newDp.get(newMask, INF), newCost)
        dp = newDp
    
    RETURN MIN(dp.values())
```

| Time | Space |
|------|-------|
| O(n × 2^m) | O(2^m) |

---

## Key Takeaway

> Assignment problems with small n/m use bitmask DP. The mask tracks which bikes are taken, and we assign one bike per worker sequentially. For larger inputs, use the Hungarian algorithm (O(n³)).
