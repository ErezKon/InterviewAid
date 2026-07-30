# 2411. Smallest Subarrays With Maximum Bitwise OR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-subarrays-with-maximum-bitwise-or](https://leetcode.com/problems/smallest-subarrays-with-maximum-bitwise-or)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an array `nums`, for each index `i`, find the minimum length of a subarray starting at `i` such that the bitwise OR of the subarray equals the maximum possible OR of any subarray starting at `i`.

### Examples

- **Input:** `nums = [1,0,2,1,3]` → **Output:** `[3,3,2,2,1]`
- **Input:** `nums = [1,2]` → **Output:** `[2,1]`

## Approach: Track Last Bit Positions — O(30n) ✅

**Key Insight:** Iterate from right to left, tracking the rightmost index where each bit is set. The minimum subarray length is determined by the farthest bit position needed.

```
FUNCTION smallestSubarrays(nums):
    n = len(nums)
    lastBit = [0] * 30    // last index where bit j is set
    result = [1] * n

    FOR i ← n - 1 DOWN TO 0:
        FOR bit ← 0 TO 29:
            IF nums[i] & (1 << bit):
                lastBit[bit] = i
        FOR bit ← 0 TO 29:
            result[i] = MAX(result[i], lastBit[bit] - i + 1)

    RETURN result
```

### Complexity

| | |
|---|---|
| **Time** | O(30n) ≈ O(n) |
| **Space** | O(n) |
