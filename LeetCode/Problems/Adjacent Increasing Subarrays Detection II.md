# 3350. Adjacent Increasing Subarrays Detection II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/adjacent-increasing-subarrays-detection-ii](https://leetcode.com/problems/adjacent-increasing-subarrays-detection-ii)
**Companies:** Google

---

## 1. Problem Description

Given an integer array `nums`, find the **maximum** value of `k` such that there exist two **adjacent** subarrays of length `k` that are both **strictly increasing**.

**Constraints:**
- `2 ≤ nums.length ≤ 2 × 10⁵`

---

## 2. Key Insight

> Precompute `inc[i]` = length of the strictly increasing subarray ending at index `i`. For each split point, the maximum valid `k` is `min(inc[i], inc[i + k])` where the two windows are adjacent. Binary search or linear scan for the answer.

---

## 3. Approach: Precompute Increasing Lengths — O(n) ✅

```
FUNCTION maxIncreasingSubarrays(nums):
    n = len(nums)
    inc = [1] * n
    FOR i ← 1 TO n-1:
        IF nums[i] > nums[i-1]:
            inc[i] = inc[i-1] + 1

    ans = 1
    FOR i ← 0 TO n-2:
        // Two adjacent subarrays of length k ending at i and i+k
        // Option 1: both halves from a single increasing run
        ans = MAX(ans, inc[i] // 2)
        // Option 2: split at boundary i|i+1
        IF i + 1 < n:
            ans = MAX(ans, MIN(inc[i], inc[i+1]))

    RETURN ans
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Precompute increasing-run lengths ending at each index. The answer at any split point is bounded by the minimum of the two adjacent run lengths. A clean O(n) scan avoids binary search.
