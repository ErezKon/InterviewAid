# 2972. Count the Number of Incremovable Subarrays II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-ii](https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-ii)
**Companies:** Apple, De Shaw, Ibm

---

## Problem Description

You are given a **0-indexed** array of **positive** integers `nums`.

A subarray of `nums` is called **incremovable** if `nums` becomes **strictly increasing** on removing the subarray. For example, the subarray `[3, 4]` is an incremovable subarray of `[5, 3, 4, 6, 7]` because removing this subarray changes the array `[5, 3, 4, 6, 7]` to `[5, 6, 7]` which is strictly increasing.

Return *the total number of **incremovable** subarrays of* `nums`.

**Note** that an empty array is considered strictly increasing.

A **subarray** is a contiguous non-empty sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## Examples

```
Example 1:
  Input: nums = [1,2,3,4]
  Output: 10
  Explanation: The 10 incremovable subarrays are: [1], [2], [3], [4], [1,2], [2,3], [3,4], [1,2,3], [2,3,4], and [1,2,3,4], because on removing any one of these subarrays nums becomes strictly increasing. Note that you cannot select an empty subarray.
```

```
Example 2:
  Input: nums = [6,5,7,8]
  Output: 7
  Explanation: The 7 incremovable subarrays are: [5], [6], [5,7], [6,5], [5,7,8], [6,5,7] and [6,5,7,8].
  It can be shown that there are only 7 incremovable subarrays in nums.
```

```
Example 3:
  Input: nums = [8,7,6,6]
  Output: 3
  Explanation: The 3 incremovable subarrays are: [8,7,6], [7,6,6], and [8,7,6,6]. Note that [8,7] is not an incremovable subarray because after removing [8,7] nums becomes [6,6], which is sorted in ascending order but not strictly increasing.
```

---

## Walkthrough

The solution finds the longest increasing prefix and suffix, then uses two pointers to count valid removals.
1. Identify `left` – the last index of the maximal increasing prefix.
2. Identify `right` – the first index of the maximal increasing suffix.
3. If the whole array is already increasing, answer is n·(n+1)/2 (all subarrays).
4. Initialize result with removals that delete the prefix entirely.
5. Move pointer `i` over the prefix and advance `right` until `nums[i] < nums[right]`.
6. For each `i`, add the number of valid suffix starts (`n - right + 1`).
This counts every subarray whose removal connects a valid prefix to a valid suffix.

---

## Approach

```
FUNCTION incremovableSubarrayCount(nums):
    n = LENGTH(nums)
    // Find longest increasing prefix
    left = 0
    WHILE left < n-1 AND nums[left] < nums[left+1]: left ← left + 1
    IF left == n-1: RETURN n * (n + 1) / 2

    // Find longest increasing suffix
    right = n-1
    WHILE right > 0 AND nums[right-1] < nums[right]: right ← right - 1

    result = (n - right + 1)  // remove prefix entirely
    i = 0
    WHILE i ≤ left DO
        WHILE right < n AND nums[i] ≥ nums[right]: right ← right + 1
        result ← result + (n - right + 1)
        i ← i + 1
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you adapt the algorithm for the “non‑decreasing” version of the problem?
2. Can the approach be extended to handle duplicate values in the array?
3. What changes are needed if we must also output the actual subarrays, not just the count?

---

## Key Takeaway

> **Incremovable subarrays: find the increasing prefix and suffix, then two‑pointer to count valid connections. The key constraint is `prefix_last < suffix_first` after removal.**