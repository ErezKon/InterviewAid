# 2771. Longest Non-decreasing Subarray From Two Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-non-decreasing-subarray-from-two-arrays](https://leetcode.com/problems/longest-non-decreasing-subarray-from-two-arrays)
**Companies:** Amazon, Google, Meesho, Polar, Squarepoint Capital

---

## 1. Problem Description

Given two arrays of equal length, at each index choose one value. Find the longest non-decreasing contiguous subarray achievable.

---

## 2. Approach: DP with Two States — O(n) ✅

```
FUNCTION maxNonDecreasingLength(nums1, nums2):
    n = len(nums1)
    dp1 = dp2 = 1    // ending with nums1[i] or nums2[i]
    maxLen = 1

    FOR i ← 1 TO n - 1:
        newDp1 = newDp2 = 1
        IF nums1[i] >= nums1[i-1]: newDp1 = MAX(newDp1, dp1 + 1)
        IF nums1[i] >= nums2[i-1]: newDp1 = MAX(newDp1, dp2 + 1)
        IF nums2[i] >= nums1[i-1]: newDp2 = MAX(newDp2, dp1 + 1)
        IF nums2[i] >= nums2[i-1]: newDp2 = MAX(newDp2, dp2 + 1)
        dp1, dp2 = newDp1, newDp2
        maxLen = MAX(maxLen, dp1, dp2)

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> At each position, two choices → two DP states. Each state tracks the longest non-decreasing subarray ending at `i` using `nums1[i]` or `nums2[i]`. Check all 4 transitions.
