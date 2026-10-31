# 1708. Largest Subarray Length K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-subarray-length-k](https://leetcode.com/problems/largest-subarray-length-k)
**Companies:** Google

---

## 1. Problem Description

An array `A` is larger than some array `B` if for the first index `i` where `A[i] != B[i]`, `A[i] > B[i]`.

For example, consider `0`-indexing:
- `[1,3,2,4] > [1,2,2,4]`, since at index `1`, `3 > 2`.
- `[1,4,4,4] < [2,1,1,1]`, since at index `0`, `1 < 2`.

A subarray is a contiguous subsequence of the array.

Given an integer array `nums` of **distinct** integers, return the **largest** subarray of `nums` of length `k`.

**Constraints:**
- `1 <= k <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- All the integers of `nums` are **unique**.

**Follow up:** What if the integers in `nums` are not distinct?

---

## 2. Examples

```
Example 1:
  Input: nums = [1,4,5,2,3], k = 3
  Output: [5,2,3]
  Explanation: The subarrays of size 3 are: [1,4,5], [4,5,2], and [5,2,3].
  Of these, [5,2,3] is the largest.
```

```
Example 2:
  Input: nums = [1,4,5,2,3], k = 4
  Output: [4,5,2,3]
  Explanation: The subarrays of size 4 are: [1,4,5,2], and [4,5,2,3].
  Of these, [4,5,2,3] is the largest.
```

```
Example 3:
  Input: nums = [1,4,5,2,3], k = 1
  Output: [5]
```

---

## 3. Approach: Find Max Start — O(n) ✅

Since all elements are distinct, the lexicographically largest subarray starts at the maximum element among valid starting positions.

```text
FUNCTION largestSubarray(nums, k):
    maxIdx ← 0
    FOR i ← 1 TO LENGTH(nums) - k:
        IF nums[i] > nums[maxIdx]:
            maxIdx ← i
    RETURN SLICE(nums, maxIdx, maxIdx + k)
```

---

## 4. Walkthrough

| Step | i (current index) | maxIdx | Reason |
|------|-------------------|--------|--------|
| Init | - | 0 | Start with first possible start |
| i=1 | 1 | 0 → 1 | nums[1]=5 > nums[0]=3 |
| i=2 | 2 | 1 | nums[2]=2 < nums[1]=5 |
| i=3 | 3 | 3 | nums[3]=6 > nums[1]=5 |
| i=4 | 4 | 3 | i exceeds n-k (5-3=2), stop |

Resulting subarray = SLICE(nums, 3, 6) = [6,4].

---

## 5. Complexity Analysis

| Time Complexity | O(n) – single pass to find max start |
| Space Complexity | O(k) – space for the returned subarray (output) |

---

## 6. Follow-Up Questions

- How would the solution change if the array could contain duplicate values?
- Can you extend the approach to return the *k* largest lexicographic subarrays?
- What if the subarray length `k` is not fixed but needs to be maximized under a sum constraint?

---

## Key Takeaway

> With distinct elements, lexicographic order is determined by the first element. Find the max among positions `[0, n-k]` and return the subarray starting there.
