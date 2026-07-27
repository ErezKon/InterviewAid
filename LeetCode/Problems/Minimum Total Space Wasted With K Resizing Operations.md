# 1959. Minimum Total Space Wasted With K Resizing Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-total-space-wasted-with-k-resizing-operations](https://leetcode.com/problems/minimum-total-space-wasted-with-k-resizing-operations)
**Companies:** Medianet

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n² · k)](#3-approach-dp--on²--k)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given array `nums` (space needed at each time step), allocate a container that can be resized at most `k` times. The container size between resizes = max in that segment. Wasted space = container size - actual need per step. Return **minimum** total wasted space.

**Constraints:**
- `1 <= nums.length <= 200`
- `0 <= k <= nums.length - 1`

---

## 2. Key Insight

> Split the array into `k + 1` contiguous segments. For each segment, container = max value in segment, waste = `max * length - sum`. DP: `dp[i][j]` = min waste for first `i` elements using `j` resizes.

---

## 3. Approach: DP — O(n² · k) ✅

```
FUNCTION minSpaceWastedKResizing(nums, k):
    n = len(nums)
    // Precompute waste(l, r) for each segment [l, r]
    dp = (n+1) × (k+2) of infinity
    dp[0][0] = 0

    FOR i ← 1 TO n:
        FOR j ← 0 TO MIN(i-1, k):
            maxVal = 0; total = 0
            FOR l ← i DOWN TO 1:
                maxVal = MAX(maxVal, nums[l-1])
                total += nums[l-1]
                waste = maxVal * (i - l + 1) - total
                dp[i][j+1] = MIN(dp[i][j+1], dp[l-1][j] + waste)

    RETURN MIN(dp[n][j] for j in range(k+2))
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n² · k) |
| **Space** | O(n · k) |

---

## 5. Key Takeaway

> **Partition DP with segment cost** — split into k+1 segments, where each segment's cost = `max * length - sum`. Classic "minimum cost partition" pattern.
