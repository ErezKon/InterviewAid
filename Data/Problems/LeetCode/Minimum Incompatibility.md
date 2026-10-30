# 1681. Minimum Incompatibility

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-incompatibility](https://leetcode.com/problems/minimum-incompatibility)
**Companies:** Microsoft

---

## Problem Description

You are given an integer array `nums` and an integer `k`. You are asked to distribute this array into `k` subsets of **equal size** such that there are no two equal elements in the same subset.

A subset's **incompatibility** is the difference between the maximum and minimum elements in that array.

Return *the **minimum possible sum of incompatibilities** of the *`k` *subsets after distributing the array optimally, or return *`-1`* if it is not possible.*

A subset is a group integers that appear in the array with no particular order.

**Constraints:**
- `1 <= k <= nums.length <= 16`
- `nums.length` is divisible by `k`
- `1 <= nums[i] <= nums.length`

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

**Example 1:**
```
Input: nums = [1,2,1,4], k = 2
Output: 4
Explanation: The optimal distribution of subsets is [1,2] and [1,4].
The incompatibility is (2-1) + (4-1) = 4.
Note that [1,1] and [2,4] would result in a smaller sum, but the first subset contains 2 equal elements.
```

**Example 2:**
```
Input: nums = [6,3,8,1,3,1,2,2], k = 4
Output: 6
Explanation: The optimal distribution of subsets is [1,2], [2,3], [6,8], and [1,3].
The incompatibility is (2-1) + (3-2) + (8-6) + (3-1) = 6.
```

**Example 3:**
```
Input: nums = [5,3,3,6,3,3], k = 3
Output: -1
Explanation: It is impossible to distribute nums into 3 subsets where no two elements are equal in the same subset.
```

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
