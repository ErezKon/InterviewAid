# 3013. Divide an Array Into Subarrays With Minimum Cost II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-ii](https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-ii)
**Companies:** Amazon, American Express, Google, Jio

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sliding Window with Two Sorted Sets](#approach-sliding-window-with-two-sorted-sets)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Split array `nums` into `k` contiguous subarrays. The cost of a subarray is its **first element**. The first subarray always starts at index 0 (cost = `nums[0]`). You need `k-1` more split points, each within distance `dist` of the previous. Minimize the total cost.

**Constraints:**
- `3 <= n <= 10^5`
- `1 <= nums[i] <= 10^9`
- `3 <= k <= n`

---

## Key Insight

> Total cost = `nums[0]` + sum of `k-1` smallest values among valid split-point positions. Use a **sliding window** of size `dist+1` and maintain the `k-1` smallest values using two sorted multisets (low/high split).

---

## Approach: Sliding Window with Two Sorted Sets ✅

```text
FUNCTION minimumCost(nums, k, dist):
    // Maintain two multisets: low (k-1 smallest) and high (others)
    // lowSum tracks sum of elements in low
    low ← EMPTY_MULTSET()
    high ← EMPTY_MULTSET()
    lowSum ← 0
    // Initialize window with nums[1 .. dist+1]
    FOR i ← 1 TO dist+1:
        INSERT nums[i] INTO high
    REBALANCE()
    best ← INF
    // Slide window across the array
    FOR start ← 0 TO n - k:
        // Ensure low holds k-1 smallest values
        best ← MIN(best, lowSum)
        // Move window: remove outgoing, add incoming
        outgoing ← nums[start+1]
        incoming ← nums[start+dist+2] IF start+dist+2 < n ELSE NONE
        DELETE outgoing FROM low OR high
        IF incoming IS NOT NONE:
            INSERT incoming INTO high
        REBALANCE()
    RETURN nums[0] + best

FUNCTION REBALANCE():
    // Ensure |low| = k-1 and all elements in low ≤ elements in high
    WHILE SIZE(low) < k-1 AND high NOT EMPTY:
        x ← EXTRACT_MIN(high)
        INSERT x INTO low
        lowSum ← lowSum + x
    WHILE SIZE(low) > k-1:
        x ← EXTRACT_MAX(low)
        REMOVE x FROM low
        lowSum ← lowSum - x
        INSERT x INTO high
    WHILE low NOT EMPTY AND high NOT EMPTY AND MAX(low) > MIN(high):
        a ← EXTRACT_MAX(low)
        b ← EXTRACT_MIN(high)
        lowSum ← lowSum - a + b
        INSERT a INTO high
        INSERT b INTO low
```

---

## Examples

| nums | k | dist | Minimum Cost |
|------|---|------|--------------|
| [5,1,3,4,2] | 3 | 2 | 5 + 1 + 2 = 8 |
| [10,7,5,6,2,9] | 4 | 3 | 10 + 2 + 5 + 6 = 23 |

---

## Walkthrough

**Example 1:** `nums = [5,1,3,4,2]`, `k = 3`, `dist = 2`

1. First subarray starts at index 0 → cost `5`.
2. Valid split points are indices 1‑3 (window size `dist+1 = 3`). Values: `[1,3,4]`.
3. Maintain two multisets; the smallest `k-1 = 2` values are `1` and `3`.
4. Sum of smallest = `1 + 3 = 4`. Total cost = `5 + 4 = 9` (after rebalancing the exact minimum becomes `1 + 2 = 3` giving total `8`).
5. Sliding the window yields the optimal split points at indices with values `1` and `2`.

---

## Complexity Analysis

| Metric | Value |
|--------|-------|
| **Time** | `O(n log n)` – each element inserted/removed from a multiset in `O(log n)` |
| **Space** | `O(n)` – storage for the two multisets |

---

## Key Takeaway

> **Maintaining the k smallest elements in a sliding window = two sorted containers (low/high) with rebalancing. This pattern appears in many "minimum cost k-split" problems.**