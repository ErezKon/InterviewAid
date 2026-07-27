# 1681. Minimum Incompatibility

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-incompatibility](https://leetcode.com/problems/minimum-incompatibility)
**Companies:** Microsoft

---

## Problem Description

Distribute `n` integers into `n/k` groups of size `k`. Each group must have **all distinct** values. The **incompatibility** of a group = max - min. Minimize total incompatibility across all groups. Return `-1` if impossible.

## Key Insight

> Bitmask DP: enumerate all valid subsets of size `k` with distinct elements, precompute their incompatibility, then use DP on bitmasks to find the minimum cost partition.

## Approach: Bitmask DP — O(3^n) ✅

```
FUNCTION minimumIncompatibility(nums, k):
    n ← len(nums)
    groupSize ← k
    // Precompute: for each subset of size groupSize with all distinct values, store its cost
    validGroups ← {} // mask → cost

    FOR mask IN all subsets of size groupSize:
        values ← {nums[i] : bit i set in mask}
        IF len(values) == groupSize:  // all distinct
            validGroups[mask] ← MAX(values) - MIN(values)

    // DP: dp[mask] = min total incompatibility using elements in mask
    dp ← array of size 2^n, all infinity
    dp[0] ← 0

    FOR mask IN 0 TO 2^n - 1:
        IF dp[mask] == infinity: CONTINUE
        // Find next group among remaining elements (~mask)
        FOR group IN validGroups that are subsets of ~mask:
            dp[mask | group] ← MIN(dp[mask | group], dp[mask] + validGroups[group])

    RETURN dp[(1<<n)-1] IF finite ELSE -1
```

| Time | Space |
|------|-------|
| O(3^n) — subset enumeration | O(2^n) |

## Key Takeaway

> Partition problems with small `n` → **bitmask DP** over subsets. Precompute valid group costs, then find the minimum cost complete partition.
