# 3828. Final Element After Subarray Deletions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/final-element-after-subarray-deletions](https://leetcode.com/problems/final-element-after-subarray-deletions)
**Companies:** Amazon

---

## Problem Description

Given an array `nums`, repeatedly delete contiguous subarrays of equal elements until one element remains. Return that element, or `-1` if the array becomes empty.

---

## Key Insight

> The element with the **highest frequency** survives if its count is strictly greater than half of the array's total length. This is essentially a majority element check — if no element has a dominant count, return `-1`.

---

## Approach: Frequency Count — O(n) ✅

```
FUNCTION finalElement(nums):
    freq = Counter(nums)
    maxVal = max element by frequency
    maxCount = freq[maxVal]
    totalOther = len(nums) - maxCount
    IF maxCount > totalOther:
        RETURN maxVal
    RETURN -1
```

---

## Key Takeaway

> **The surviving element must appear more times than all others combined. Count frequencies and check if the most frequent element dominates.**
