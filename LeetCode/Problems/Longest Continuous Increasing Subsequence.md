# 674. Longest Continuous Increasing Subsequence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-continuous-increasing-subsequence](https://leetcode.com/problems/longest-continuous-increasing-subsequence)
**Companies:** Amazon, Bloomberg, Google, Meta, Yandex

---

## 1. Problem Description

Find the length of the longest strictly increasing contiguous subarray.

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION findLengthOfLCIS(nums):
    maxLen = 1; curr = 1
    FOR i ← 1 TO n - 1:
        IF nums[i] > nums[i-1]: curr += 1
        ELSE: curr = 1
        maxLen = MAX(maxLen, curr)
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Track current streak length. Reset to 1 when the increasing property breaks. Single pass, O(1) space.
