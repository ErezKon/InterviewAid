# 3738. Longest Non-Decreasing Subarray After Replacing at Most One Element

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-non-decreasing-subarray-after-replacing-at-most-one-element](https://leetcode.com/problems/longest-non-decreasing-subarray-after-replacing-at-most-one-element)
**Companies:** Google

---

## 1. Problem Description

Find the longest non-decreasing contiguous subarray after replacing at most one element with any value.

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
Input: nums = [1,3,2,4,5]
Output: 5
Explanation: Replace the third element (2) with 3 to get [1,3,3,4,5], which is non-decreasing.
```

**Example 2:**
```
Input: nums = [5,4,3,2,1]
Output: 2
Explanation: Only one replacement is allowed, so the best we can do is a subarray of length 2.
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