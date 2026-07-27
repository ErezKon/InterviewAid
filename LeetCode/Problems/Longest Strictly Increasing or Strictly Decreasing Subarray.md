# 3105. Longest Strictly Increasing or Strictly Decreasing Subarray

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray](https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray)
**Companies:** Amazon, Bloomberg, Google, Larsen Toubro, Meta, Microsoft, Yandex

---

## 1. Problem Description

Find the length of the longest contiguous subarray that is either strictly increasing or strictly decreasing.

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION longestMonotonicSubarray(nums):
    inc = dec = 1; maxLen = 1
    FOR i ← 1 TO n - 1:
        IF nums[i] > nums[i-1]: inc += 1; dec = 1
        ELSE IF nums[i] < nums[i-1]: dec += 1; inc = 1
        ELSE: inc = dec = 1
        maxLen = MAX(maxLen, inc, dec)
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Track two counters (increasing and decreasing streaks) simultaneously. Reset both on equality, reset the other on direction change.
