# 3013. Divide an Array Into Subarrays With Minimum Cost II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-ii](https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-ii)
**Companies:** Amazon, American Express, Google, Jio

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sliding Window with Two Sorted Sets](#approach-sliding-window-with-two-sorted-sets)
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

```
// Sliding window with two sorted sets (low/high) to maintain k-1 smallest
// in a window of size dist+1
// Total cost = nums[0] + sum of k-1 smallest in sliding window

FUNCTION minimumCost(nums, k, dist):
    // Window: nums[1..1+dist]
    // Maintain SortedList split into low (k-1 smallest) and high (rest)
    // lowSum tracks sum of low set
    
    // As window slides right:
    //   1. Remove outgoing element from low or high
    //   2. Add incoming element to low or high
    //   3. Rebalance so |low| = k-1
    //   4. Track minimum lowSum
    
    answer ← nums[0] + min(lowSum across all windows)
    RETURN answer
END FUNCTION
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n log n) | Each element inserted/removed from sorted set in O(log n) |
| **Space** | O(n) | Sorted sets |

---

## Key Takeaway

> **Maintaining the k smallest elements in a sliding window = two sorted containers (low/high) with rebalancing. This pattern appears in many "minimum cost k-split" problems.**
