# 3349. Adjacent Increasing Subarrays Detection I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/adjacent-increasing-subarrays-detection-i](https://leetcode.com/problems/adjacent-increasing-subarrays-detection-i)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Given an integer array `nums` and an integer `k`, determine whether there exist two **adjacent** subarrays of length `k` that are both **strictly increasing**. Return `true` if such a pair exists, otherwise `false`.

Constraints:
- `1 ≤ k ≤ nums.length / 2`
- `2 ≤ nums.length ≤ 10⁵`
- `-10⁹ ≤ nums[i] ≤ 10⁹`

---

## Examples

| nums | k | Output |
|------|---|--------|
| `[1,2,3,4,5]` | 2 | `true` |
| `[5,4,3,2,1]` | 1 | `false` |
| `[1,3,2,4,5,6]` | 2 | `true` |

*Explanation:* In the first example, subarrays `[1,2]` and `[3,4]` are adjacent and strictly increasing.

---

## Approach

**Sliding Window with Pre‑check — O(n·k)**

We slide a window of size `k` across the array and, for each position `i`, check whether the window `nums[i…i+k‑1]` is strictly increasing. If it is, we store the result. When we find two consecutive windows that are both increasing, we return `true`.

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

## Follow‑Up Questions

1. How can you reduce the time complexity to **O(n)** by pre‑computing the length of increasing runs?
2. What changes are needed if the subarrays may be non‑adjacent but still of length `k`?
3. Can the solution be adapted to detect decreasing subarrays?

---

## Key Takeaway

> A straightforward brute‑force scan works, but pre‑computing increasing run lengths enables an **O(n)** solution.