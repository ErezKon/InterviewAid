# 3538. Merge Operations for Minimum Travel Time

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/merge-operations-for-minimum-travel-time](https://leetcode.com/problems/merge-operations-for-minimum-travel-time)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given positions and speeds for segments of a path, you can perform at most `k` merge operations. Each merge combines two adjacent segments into one (summing their speeds). The travel time for a segment is `distance / speed`. Minimize the **total travel time** after at most `k` merges.

**Constraints:**
- `2 ≤ n ≤ 1000`
- `0 ≤ k ≤ n - 2`

---

## Examples

**Example 1:**
```
Input:  positions = [0,2,5], speeds = [1,2], k = 1
Output: Merge segments to minimize total time.
```

---

## Key Insight

> This is an **interval DP** problem. Merging two adjacent speed segments changes the effective speed over that combined distance. Use DP where `dp[i][j]` = minimum travel time for the first `i` segments using `j` merges.

---

## Approach

```
FUNCTION minTravelTime(positions, speeds, k):
    n ← LEN(speeds)
    // Precompute prefix sums of speeds for merged segment speed
    // dp[i][j] = min travel time for first i segments with j merges used
    
    dp ← 2D ARRAY[n+1][k+1] filled with INFINITY
    dp[0][0] ← 0
    
    FOR i ← 1 TO n DO
        FOR merges ← 0 TO MIN(k, i-1) DO
            // Try merging last 'len' segments into one (uses len-1 merges)
            FOR len ← 1 TO i DO
                usedMerges ← merges - (len - 1)
                IF usedMerges < 0 THEN CONTINUE
                dist ← positions[i] - positions[i - len]
                combinedSpeed ← SUM(speeds[i-len .. i-1])
                time ← dist / combinedSpeed
                dp[i][merges] ← MIN(dp[i][merges], dp[i-len][usedMerges] + time)
    
    RETURN MIN(dp[n][0..k])
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Interval DP | **O(n² · k)** | **O(n · k)** |

---

## Follow-Up Questions

1. **Why DP over greedy?** Merging segments has non-local effects — the optimal merge depends on surrounding segments.
2. **Can we use fewer merges for a better result?** Sometimes yes — that's why we take the minimum over all `dp[n][0..k]`.
3. **What if merges can be non-adjacent?** The problem constrains merges to adjacent segments, keeping it solvable with interval DP.

---

## Key Takeaway

> **Interval DP with merge counting** — when operations combine adjacent elements and affect aggregate properties (like speed), use DP tracking position and operations used.

---
