# 3738. Longest Non-Decreasing Subarray After Replacing at Most One Element

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-non-decreasing-subarray-after-replacing-at-most-one-element](https://leetcode.com/problems/longest-non-decreasing-subarray-after-replacing-at-most-one-element)
**Companies:** Google

---

## 1. Problem Description

You are given an integer array `nums`.

You are allowed to replace **at most** one element in the array with any other integer value of your choice.

Return the length of the **longest non-decreasing subarray** that can be obtained after performing at most one replacement.

An array is said to be **non-decreasing** if each element is greater than or equal to its previous one (if it exists).

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## 2. Approach: DP with Change Budget — O(n) ✅

```
// dp0[i] = longest non-decreasing subarray ending at i with 0 changes
// dp1[i] = longest non-decreasing subarray ending at i with ≤1 change
// Transition: if nums[i] >= nums[i-1], extend both
//             else use the one change to bridge
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,1,2]
Output: 4
Explanation: Replacing nums[3] = 1 with 3 gives the array [1, 2, 3, 3, 2].
The longest non-decreasing subarray is [1, 2, 3, 3], which has a length of 4.
```

**Example 2:**
```
Input: nums = [2,2,2,2,2]
Output: 5
Explanation: All elements in nums are equal, so it is already non-decreasing and the entire nums forms a subarray of length 5.
```

## Walkthrough

Consider the first example `[1,3,2,4,5]`.
| Index | Value | dp0 | dp1 | Reason |
|-------|-------|-----|-----|--------|
| 0 | 1 | 1 | 1 | Start of array |
| 1 | 3 | 2 | 2 | 3 ≥ 1, extend both |
| 2 | 2 | 1 | 3 | 2 < 3, dp0 resets, dp1 uses one change to bridge |
| 3 | 4 | 2 | 4 | 4 ≥ 2 (changed), extend dp1 |
| 4 | 5 | 3 | 5 | 5 ≥ 4, extend dp1 to length 5 |
The maximum dp1 value is 5.

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only constant‑size variables are stored.

## Follow-Up Questions
- How would the solution change if up to *k* replacements were allowed?
- Can this be extended to handle non‑contiguous subarrays?
- What if the array contains negative numbers and large ranges?

## Key Takeaway

> Track two states: length with 0 replacements and with 1 replacement. When the non-decreasing property breaks, the 1‑change state can bridge one violation.