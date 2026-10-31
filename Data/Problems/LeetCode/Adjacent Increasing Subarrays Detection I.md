# 3349. Adjacent Increasing Subarrays Detection I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/adjacent-increasing-subarrays-detection-i](https://leetcode.com/problems/adjacent-increasing-subarrays-detection-i)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Given an array `nums` of `n` integers and an integer `k`, determine whether there exist **two** **adjacent** subarrays of length `k` such that both subarrays are **strictly** **increasing**. Specifically, check if there are **two** subarrays starting at indices `a` and `b` (`a < b`), where:

- Both subarrays `nums[a..a + k - 1]` and `nums[b..b + k - 1]` are **strictly increasing**.
- The subarrays must be **adjacent**, meaning `b = a + k`.

Return `true` if it is *possible* to find **two** such subarrays, and `false` otherwise.

**Constraints:**
- `2 ≤ nums.length ≤ 100`
- `1 < 2 * k ≤ nums.length`
- `-1000 ≤ nums[i] ≤ 1000`

---

## Examples

```
Example 1:
  Input: nums = [2,5,7,8,9,2,3,4,3,1], k = 3
  Output: true
  Explanation:
  - The subarray starting at index 2 is [7, 8, 9], which is strictly increasing.
  - The subarray starting at index 5 is [2, 3, 4], which is also strictly increasing.
  - These two subarrays are adjacent, so the result is true.
```
```
Example 2:
  Input: nums = [1,2,3,4,4,4,4,5,6,7], k = 5
  Output: false
```

---

## Approach

**Sliding Window with Pre-check — O(n·k)**

We slide a window of size `k` across the array and, for each position `i`, check whether the window `nums[i…i+k-1]` is strictly increasing. If it is, we store the result. When we find two consecutive windows that are both increasing, we return `true`.

```text
FUNCTION hasIncreasingSubarrays(nums, k):
    FOR i ← 0 TO len(nums) - 2*k:
        IF isIncreasing(nums[i : i+k]) AND isIncreasing(nums[i+k : i+2*k]):
            RETURN true
    RETURN false

FUNCTION isIncreasing(sub):
    FOR j ← 1 TO len(sub)-1:
        IF sub[j] ≤ sub[j-1]:
            RETURN false
    RETURN true
```

---

## Walkthrough

Consider `nums = [1,3,2,4,5,6]` and `k = 2`.

1. `i = 0`: windows `[1,3]` (increasing) and `[2,4]` (not increasing) → continue.
2. `i = 1`: windows `[3,2]` (not increasing) → continue.
3. `i = 2`: windows `[2,4]` (increasing) and `[5,6]` (increasing) → both conditions satisfied, return `true`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n·k) | O(1) |

---

## Follow-Up Questions

1. How can you reduce the time complexity to **O(n)** by pre-computing the length of increasing runs?
2. What changes are needed if the subarrays may be non-adjacent but still of length `k`?
3. Can the solution be adapted to detect decreasing subarrays?

---

## Key Takeaway

> A straightforward brute-force scan works, but pre-computing increasing run lengths enables an **O(n)** solution.