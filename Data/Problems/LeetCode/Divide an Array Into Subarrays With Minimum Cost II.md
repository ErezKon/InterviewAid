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

You are given a **0-indexed** array of integers `nums` of length `n`, and two **positive** integers `k` and `dist`.

The **cost** of an array is the value of its **first** element. For example, the cost of `[1,2,3]` is `1` while the cost of `[3,4,1]` is `3`.

You need to divide `nums` into `k` **disjoint contiguous **subarrays, such that the difference between the starting index of the **second** subarray and the starting index of the `kth` subarray should be **less than or equal to** `dist`. In other words, if you divide `nums` into the subarrays `nums[0..(i_1 - 1)], nums[i_1..(i_2 - 1)], ..., nums[i_k-1..(n - 1)]`, then `i_k-1 - i_1 <= dist`.

Return *the **minimum** possible sum of the cost of these* *subarrays*.

**Constraints:**
- `3 <= n <= 10^5`
- `1 <= nums[i] <= 10^9`
- `3 <= k <= n`
- `k - 2 <= dist <= n - 2`

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

**Example 1:**
```
Input: nums = [1,3,2,6,4,2], k = 3, dist = 3
Output: 5
Explanation: The best possible way to divide nums into 3 subarrays is: [1,3], [2,6,4], and [2]. This choice is valid because i_k-1 - i_1 is 5 - 2 = 3 which is equal to dist. The total cost is nums[0] + nums[2] + nums[5] which is 1 + 2 + 2 = 5.
It can be shown that there is no possible way to divide nums into 3 subarrays at a cost lower than 5.
```

**Example 2:**
```
Input: nums = [10,1,2,2,2,1], k = 4, dist = 3
Output: 15
Explanation: The best possible way to divide nums into 4 subarrays is: [10], [1], [2], and [2,2,1]. This choice is valid because i_k-1 - i_1 is 3 - 1 = 2 which is less than dist. The total cost is nums[0] + nums[1] + nums[2] + nums[3] which is 10 + 1 + 2 + 2 = 15.
The division [10], [1], [2,2,2], and [1] is not valid, because the difference between i_k-1 and i_1 is 5 - 1 = 4, which is greater than dist.
It can be shown that there is no possible way to divide nums into 4 subarrays at a cost lower than 15.
```

**Example 3:**
```
Input: nums = [10,8,18,9], k = 3, dist = 1
Output: 36
Explanation: The best possible way to divide nums into 3 subarrays is: [10], [8], and [18,9]. This choice is valid because i_k-1 - i_1 is 2 - 1 = 1 which is equal to dist.The total cost is nums[0] + nums[1] + nums[2] which is 10 + 8 + 18 = 36.
The division [10], [8,18], and [9] is not valid, because the difference between i_k-1 and i_1 is 3 - 1 = 2, which is greater than dist.
It can be shown that there is no possible way to divide nums into 3 subarrays at a cost lower than 36.
```

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