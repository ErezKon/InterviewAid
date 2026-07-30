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

## Examples

**Example 1:**
```
Input: nums1 = [1,3,5], nums2 = [2,4,6]
Output: 3
Explanation: Choose nums1[0]=1, nums2[1]=4, nums2[2]=6 → [1,4,6] is non‑decreasing.
```

**Example 2:**
```
Input: nums1 = [5,4,3], nums2 = [1,2,3]
Output: 2
Explanation: Best we can do is [1,2] or [3,3] of length 2.
```

## Walkthrough

Take the first example `[1,3,5]` and `[2,4,6]`.
| i | nums1[i] | nums2[i] | dp1 | dp2 | maxLen |
|---|----------|----------|-----|-----|--------|
|0|1|2|1|1|1|
|1|3|4|2 (3≥1) |2 (4≥2) |2|
|2|5|6|3 (5≥3 or 5≥4) |3 (6≥4 or 6≥5) |3|
The DP maintains the longest subarray ending at each index for both choices, yielding length 3.

## Complexity Analysis
- **Time:** O(n) – single pass over the arrays.
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
- How would the algorithm change if you could pick from *k* arrays?
- What if the subarray does not need to be contiguous?
- Can we extend this to handle decreasing subarrays as well?

## Key Takeaway

> Maintain two DP states representing the longest non‑decreasing subarray ending at the current index when choosing from the first or second array. Update both states using the four possible transitions.