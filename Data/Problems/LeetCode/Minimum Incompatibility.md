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

```text
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

## Examples

| nums | k | Output |
|------|---|--------|
| [1,2,1,4] | 2 | 4 |
| [1,2,3,4,5,6] | 3 | 3 |
| [5,3,3,2,6,1,1,4] | 4 | 7 |

*Explanation*: In the first example, groups can be `[1,2]` and `[1,4]` with incompatibilities `1` and `3`, total `4`.

## Walkthrough

**Example 1** (`nums = [1,2,1,4]`, `k = 2`)

| Step | Mask (binary) | Chosen Group | Group Cost | DP State (`dp[mask]`) |
|------|---------------|--------------|------------|----------------------|
| 1 | 0000 | – | – | dp[0] = 0 |
| 2 | 0011 (indices 0,1) | `[1,2]` | 1 | dp[0011] = 1 |
| 3 | 1100 (indices 2,3) | `[1,4]` | 3 | dp[1111] = dp[0011] + 3 = 4 |

The final mask `1111` covers all elements with total incompatibility `4`.

## Complexity Analysis

- **Time**: O(3^n) – enumerating all subsets of size `k` and DP over masks.
- **Space**: O(2^n) – DP table storing minimum incompatibility for each mask.

## Follow-Up Questions

- How would you adapt the solution if groups could have variable sizes?
- Can you design an approximation algorithm for larger `n` where exact DP is infeasible?
- How does the problem change if the incompatibility metric is defined as sum of absolute differences instead of max‑min?

## Key Takeaway

> Partition problems with small `n` → **bitmask DP** over subsets. Precompute valid group costs, then find the minimum cost complete partition.
