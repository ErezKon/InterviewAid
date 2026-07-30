# 3254. Find the Power of K-Size Subarrays I

**Difficulty:** 🟡 Medium
**Companies:** Bloomberg, Google, Meta
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sliding Window — O(n) ✅](#4-approach-sliding-window--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)
---

## 1. Problem Description

For each window of size `k` in an integer array `nums`, return the maximum element if the window contains consecutive integers in ascending order; otherwise return `-1`.

**Constraints:**
- `1 <= k <= n <= 10⁵`
- `nums[i]` are integers.
---

## 2. Examples

| Input | Output |
|-------|--------|
| `nums = [1,2,3,5,6], k = 3` | `[3, -1, -1]` |
| `nums = [4,5,6,7], k = 2` | `[5,6,7]` |

*Explanation:* In the first example, the first window `[1,2,3]` is consecutive, max is `3`. The next windows are not consecutive, so `-1`.
---

## 3. Key Insight

> Track a running count of consecutive positions where `nums[i] == nums[i-1] + 1`. If the count ≥ `k-1`, the current window is consecutive. The maximum in such a window is the last element.
---

## 4. Approach: Sliding Window — O(n) ✅

```text
FUNCTION resultsArray(nums, k):
    result ← []
    consec ← 0
    n ← LENGTH(nums)
    FOR i ← 0 TO n - 1 DO
        IF i > 0 AND nums[i] == nums[i-1] + 1 THEN
            consec += 1
        ELSE
            consec ← 0
        IF i >= k - 1 THEN
            IF consec >= k - 1 THEN
                result.ADD(nums[i])
            ELSE
                result.ADD(-1)
    RETURN result
```
---

## 5. Walkthrough

Take `nums = [1,2,3,5,6]`, `k = 3`:
1. `i=0`: `consec=0` (no previous).
2. `i=1`: `2 == 1+1` → `consec=1`.
3. `i=2`: `3 == 2+1` → `consec=2`. Now `i >= k-1`, `consec >= 2` → add `nums[2]=3`.
4. `i=3`: `5 != 3+1` → `consec=0`. Window `[2,3,5]` not consecutive → add `-1`.
5. `i=4`: `6 == 5+1` → `consec=1`. Window `[3,5,6]` not consecutive (`consec < 2`) → add `-1`.
Result `[3, -1, -1]`.
---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) extra (output excluded) |
---

## 7. Key Takeaway

> By maintaining a streak of consecutive ascending elements, we can decide in O(1) per index whether the current `k`‑size window is valid, yielding an overall O(n) solution.
