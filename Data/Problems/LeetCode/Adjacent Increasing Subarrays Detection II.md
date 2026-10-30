# 3350. Adjacent Increasing Subarrays Detection II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/adjacent-increasing-subarrays-detection-ii](https://leetcode.com/problems/adjacent-increasing-subarrays-detection-ii)
**Companies:** Google

---

## Problem Description

Given an array `nums` of `n` integers, your task is to find the **maximum** value of `k` for which there exist **two** adjacent subarrays of length `k` each, such that both subarrays are **strictly** **increasing**. Specifically, check if there are **two** subarrays of length `k` starting at indices `a` and `b` (`a < b`), where:

- Both subarrays `nums[a..a + k - 1]` and `nums[b..b + k - 1]` are **strictly increasing**.
- The subarrays must be **adjacent**, meaning `b = a + k`.

Return the **maximum** *possible* value of `k`.

A **subarray** is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `2 ≤ nums.length ≤ 2 × 10⁵`
- `-10⁹ ≤ nums[i] ≤ 10⁹`

---

## Examples

```
Example 1:
  Input: nums = [2,5,7,8,9,2,3,4,3,1]
  Output: 3
  Explanation:
  - The subarray starting at index 2 is [7, 8, 9], which is strictly increasing.
  - The subarray starting at index 5 is [2, 3, 4], which is also strictly increasing.
  - These two subarrays are adjacent, and 3 is the maximum possible value of k for which two
    such adjacent strictly increasing subarrays exist.
```
```
Example 2:
  Input: nums = [1,2,3,4,4,4,4,5,6,7]
  Output: 2
  Explanation:
  - The subarray starting at index 0 is [1, 2], which is strictly increasing.
  - The subarray starting at index 2 is [3, 4], which is also strictly increasing.
  - These two subarrays are adjacent, and 2 is the maximum possible value of k for which two
    such adjacent strictly increasing subarrays exist.
```

---

## Approach

**Pre‑compute increasing run lengths — O(n)**

```text
FUNCTION maxIncreasingSubarrays(nums):
    n ← len(nums)
    inc ← ARRAY of size n filled with 1
    FOR i ← 1 TO n-1:
        IF nums[i] > nums[i-1]:
            inc[i] ← inc[i-1] + 1
    ans ← 1
    FOR i ← 0 TO n-2:
        // Two adjacent subarrays of length k ending at i and i+k
        ans ← MAX(ans, inc[i] // 2)               // both halves from one run
        IF i + 1 < n:
            ans ← MAX(ans, MIN(inc[i], inc[i+1])) // split at boundary
    RETURN ans
```

---

## Walkthrough

Consider `nums = [1,3,2,4,5,6]`.

1. Compute `inc` (increasing run length ending at each index):
   - `inc = [1,2,1,2,3,4]`.
2. Scan possible split points:
   - At `i=0`: `inc[0]=1`, `inc[1]=2` → min = 1 → ans = 1.
   - At `i=2`: `inc[2]=1`, `inc[3]=2` → min = 1.
   - At `i=3`: `inc[3]=2`, `inc[4]=3` → min = 2 → ans updates to 2.
   - At `i=4`: `inc[4]=3`, `inc[5]=4` → min = 3, but length 3 windows exceed array bounds, so ans stays 2.
3. Final answer is `2`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Follow‑Up Questions

1. How would you modify the algorithm to return the actual subarrays, not just the length?
2. Can you solve the problem with O(1) extra space?
3. What if the subarrays need to be non‑adjacent but still of equal length?

---

## Key Takeaway

> Pre‑computing increasing‑run lengths ending at each index lets you evaluate every split point in linear time, yielding the maximum possible `k` for two adjacent increasing subarrays.