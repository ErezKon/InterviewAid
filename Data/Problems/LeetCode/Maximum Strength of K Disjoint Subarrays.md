# 3077. Maximum Strength of K Disjoint Subarrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-strength-of-k-disjoint-subarrays](https://leetcode.com/problems/maximum-strength-of-k-disjoint-subarrays)
**Companies:** Amazon, De Shaw
---

## Problem Description
Given an integer array `nums` and an integer `k`, select exactly `k` non‑overlapping (disjoint) subarrays. The strength of a subarray is the sum of its elements. The total strength is the sum of the strengths of the chosen `k` subarrays. Return the maximum possible total strength.

## Examples
**Example 1:**
```
nums = [1,2,3,4,5], k = 2
Choose subarrays [1,2,3] (sum=6) and [4,5] (sum=9) → total = 15
```
**Example 2:**
```
nums = [5,-1,3,4,-2,6], k = 3
Optimal subarrays: [5], [3,4], [6] → total = 18
```

## Approach
Use dynamic programming where `dp[i][j]` is the maximum strength using `j` subarrays considering the first `i` elements. For each position `i`, either skip it or end a subarray at `i`. To compute the best subarray ending at `i`, maintain `bestEnd[i]` = maximum subarray sum ending at `i` (Kadane). Transition:
`dp[i][j] = MAX(dp[i-1][j], dp[t][j-1] + bestEnd[i])` where `t` is the index before the start of the current subarray.
We can compress the DP to 1‑D over `j` while iterating `i`.

```text
FUNCTION MaxStrength(nums, k):
    n ← LENGTH(nums)
    // bestEnd[i] = max subarray sum ending at i
    bestEnd ← ARRAY[n]
    SET cur ← nums[0]
    SET bestEnd[0] ← cur
    FOR i FROM 1 TO n-1:
        SET cur ← MAX(nums[i], cur + nums[i])
        SET bestEnd[i] ← cur
    // dpPrev[j] = best total using j subarrays up to previous index
    dpPrev ← ARRAY[k+1] filled with -INFINITY
    SET dpPrev[0] ← 0
    FOR i FROM 0 TO n-1:
        dpCurr ← COPY of dpPrev
        FOR j FROM 1 TO k:
            // take a subarray ending at i
            SET candidate ← dpPrev[j-1] + bestEnd[i]
            SET dpCurr[j] ← MAX(dpCurr[j], candidate)
        SET dpPrev ← dpCurr
    RETURN dpPrev[k]
```

## Walkthrough
For `nums = [5,-1,3,4,-2,6]`, `k = 3`:
1. Compute `bestEnd`: [5,4,7,11,9,15]
2. DP iterates, updating best totals for 1,2,3 subarrays.
3. Final `dpPrev[3] = 18`.

## Complexity Analysis
- Time: `O(n·k)` – each element updates `k` states.
- Space: `O(k)` – only two rows of DP are kept.

## Follow-Up Questions
1. How would you modify the algorithm to also return the actual subarrays chosen?
2. Can the solution be improved for very large `k` (e.g., `k ≈ n/2`) using divide‑and‑conquer DP optimization?
3. What changes are needed if subarrays must have length at least `L`?

## Key Takeaway
Dynamic programming with a running best‑ending‑here subarray value lets you efficiently combine disjoint subarray choices for maximal total strength.
