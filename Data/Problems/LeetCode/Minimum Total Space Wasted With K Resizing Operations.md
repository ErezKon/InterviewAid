# 1959. Minimum Total Space Wasted With K Resizing Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-total-space-wasted-with-k-resizing-operations](https://leetcode.com/problems/minimum-total-space-wasted-with-k-resizing-operations)
**Companies:** Medianet

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n² · k)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are currently designing a dynamic array. You are given a **0-indexed** integer array `nums`, where `nums[i]` is the number of elements that will be in the array at time `i`. In addition, you are given an integer `k`, the **maximum** number of times you can **resize** the array (to** any** size).

The size of the array at time `t`, `size_t`, must be at least `nums[t]` because there needs to be enough space in the array to hold all the elements. The **space wasted** at time `t` is defined as `size_t - nums[t]`, and the **total** space wasted is the **sum** of the space wasted across every time `t` where `0 <= t < nums.length`.

Return *the **minimum** **total space wasted** if you can resize the array at most* `k` *times*.

**Note:** The array can have **any size** at the start and does** not **count towards the number of resizing operations.

**Constraints:**
- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 10^6`
- `0 <= k <= nums.length - 1`

---

## 2. Key Insight

> Split the array into `k + 1` contiguous segments. For each segment, container = max value in segment, waste = `max * length - sum`. DP: `dp[i][j]` = min waste for first `i` elements using `j` resizes.

---

## 3. Approach: DP — O(n² · k) ✅

```text
FUNCTION minSpaceWastedKResizing(nums, k):
    n ← LENGTH(nums)
    // Pre-compute waste for every segment [l, r]
    SET waste[l][r] ← 0 FOR all l ≤ r
    FOR l ← 0 TO n-1:
        SET maxVal ← 0; total ← 0
        FOR r ← l TO n-1:
            SET maxVal ← MAX(maxVal, nums[r])
            SET total ← total + nums[r]
            SET waste[l][r] ← maxVal * (r - l + 1) - total
    // dp[i][j] = min waste for first i elements with j resizes (j+1 segments)
    SET dp ← MATRIX(n+1, k+2) FILLED WITH INF
    dp[0][0] ← 0
    FOR i ← 1 TO n:
        FOR j ← 0 TO MIN(i-1, k):
            FOR l ← 0 TO i-1:
                SET candidate ← dp[l][j] + waste[l][i-1]
                dp[i][j+1] ← MIN(dp[i][j+1], candidate)
    RETURN MIN(dp[n][j] FOR j ← 1 TO k+2)
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [10,20], k = 0
Output: 10
Explanation: size = [20,20].
We can set the initial size to be 20.
The total wasted space is (20 - 10) + (20 - 20) = 10.
```

**Example 2:**
```
Input: nums = [10,20,30], k = 1
Output: 10
Explanation: size = [20,20,30].
We can set the initial size to be 20 and resize to 30 at time 2.
The total wasted space is (20 - 10) + (20 - 20) + (30 - 30) = 10.
```

**Example 3:**
```
Input: nums = [10,20,15,30,20], k = 2
Output: 15
Explanation: size = [10,20,20,30,30].
We can set the initial size to 10, resize to 20 at time 1, and resize to 30 at time 3.
The total wasted space is (10 - 10) + (20 - 20) + (20 - 15) + (30 - 30) + (30 - 20) = 15.
```

---

## 5. Walkthrough

Consider `nums = [10,5,15,20]`, `k = 2`.

| Step | Chosen Split Points | Segments | Segment Max | Segment Waste |
|------|---------------------|----------|-------------|---------------|
| 1 | after index 1 and 2 | `[10,5]`, `[15]`, `[20]` | 10, 15, 20 | `(10*2-15)=5`, `0`, `0` |
| 2 | Total waste = 5 |

The DP computes `waste[l][r]` for all possible segments, then builds up the optimal combination of at most `k+1 = 3` segments, selecting the split that yields the smallest sum of segment wastes.

---

## 6. Follow-Up Questions

1. How would the solution change if the container could be resized **any number of times** but each resize incurs a fixed cost?
2. Can the DP be optimized to O(n·k) using monotonic queues or convex hull tricks?
3. How would you adapt the algorithm for a **streaming** scenario where `nums` arrives online?

---

## 7. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²·k) — pre-compute waste O(n²), DP O(n²·k) |
| **Space** | O(n² + n·k) — waste table and DP matrix |

---

## 8. Key Takeaway

> **Partition DP**: break the array into at most `k+1` segments, compute segment cost (max·len-sum), and use DP to choose optimal splits.
