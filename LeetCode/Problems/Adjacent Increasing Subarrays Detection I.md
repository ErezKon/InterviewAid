# 3349. Adjacent Increasing Subarrays Detection I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/adjacent-increasing-subarrays-detection-i](https://leetcode.com/problems/adjacent-increasing-subarrays-detection-i)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## 1. Problem Description

Given an array `nums` and integer `k`, determine if there exist two **adjacent** subarrays of length `k` that are both **strictly increasing**.

---

## 2. Approach: Brute Force — O(n·k) ✅

```
FUNCTION hasIncreasingSubarrays(nums, k):
    FOR i ← 0 TO len(nums) - 2*k:
        IF isIncreasing(nums[i:i+k]) AND isIncreasing(nums[i+k:i+2*k]):
            RETURN true
    RETURN false
```

For the easy version, brute-force checking each window pair is sufficient. See **Adjacent Increasing Subarrays Detection II** for the O(n) optimization using precomputed increasing-run lengths.

| Time | Space |
|------|-------|
| O(n·k) | O(1) |

---

## Key Takeaway

> Check all pairs of adjacent k-length windows. Can be optimized to O(n) by precomputing increasing-run lengths — see the follow-up problem.
