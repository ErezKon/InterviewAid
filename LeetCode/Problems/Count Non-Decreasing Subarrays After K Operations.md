# 3420. Count Non-Decreasing Subarrays After K Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-non-decreasing-subarrays-after-k-operations](https://leetcode.com/problems/count-non-decreasing-subarrays-after-k-operations)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Given an array `nums` and integer `k`, you can perform at most `k` operations where each operation increments one element by 1. Count the number of subarrays that can be made non-decreasing.

---

## 2. Key Insight

> Sliding window: for a window `[l, r]`, the cost to make it non-decreasing is the total "lift" needed. Use a monotonic stack to track the cost efficiently. Expand right, shrink left when cost exceeds `k`.

---

## 3. Approach: Sliding Window + Monotonic Stack — O(n) ✅

```
FUNCTION countNonDecreasingSubarrays(nums, k):
    // Use sliding window [l, r]
    // Track cost = sum of (target[i] - nums[i]) for each position
    // When cost > k, shrink from left
    // Each valid window [l, r] contributes (r - l + 1) subarrays ending at r
    
    count = 0
    l = 0
    cost = 0
    stack = []  // monotonic stack to track "raising" costs
    
    FOR r FROM 0 TO n-1:
        // Process nums[r], update cost using stack
        WHILE stack AND nums[stack[-1]] > nums[r]:
            // raising elements at stack positions to current level costs more
            ...
        count += r - l + 1
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Sliding window + monotonic stack for "make subarray non-decreasing with limited operations." The stack efficiently tracks how much cost each segment needs to be raised.
