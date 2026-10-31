# 3640. Trionic Array II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/trionic-array-ii](https://leetcode.com/problems/trionic-array-ii)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

You are given an integer array `nums` of length `n`.

A **trionic subarray** is a contiguous subarray `nums[l...r]` (with `0 <= l < r < n`) for which there exist indices `l < p < q < r` such that:

- `nums[l...p]` is **strictly** increasing,
- `nums[p...q]` is **strictly** decreasing,
- `nums[q...r]` is **strictly** increasing.

Return the **maximum** sum of any trionic subarray in `nums`.

**Constraints:**
- `4 <= n = nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- It is guaranteed that at least one trionic subarray exists.

## Examples

**Example 1:**
```
Input: nums = [0,-2,-1,-3,0,2,-1]
Output: -4
Explanation: Pick l = 1, p = 2, q = 3, r = 5:
- nums[l...p] = nums[1...2] = [-2, -1] is strictly increasing (-2 < -1).
- nums[p...q] = nums[2...3] = [-1, -3] is strictly decreasing (-1 > -3)
- nums[q...r] = nums[3...5] = [-3, 0, 2] is strictly increasing (-3 < 0 < 2).
- Sum = (-2) + (-1) + (-3) + 0 + 2 = -4.
```

**Example 2:**
```
Input: nums = [1,4,2,7]
Output: 14
Explanation: Pick l = 0, p = 1, q = 2, r = 3:
- nums[l...p] = nums[0...1] = [1, 4] is strictly increasing (1 < 4).
- nums[p...q] = nums[1...2] = [4, 2] is strictly decreasing (4 > 2).
- nums[q...r] = nums[2...3] = [2, 7] is strictly increasing (2 < 7).
- Sum = 1 + 4 + 2 + 7 = 14.
```

## Approach
Use a left-to-right **state-machine DP** over subarrays ending at index `i`. Each phase must contain at least one strict step, so we keep three running maxima:

- `inc1` — best sum of a subarray ending at `i` that is strictly increasing with length ≥ 2 (phase 1 done, `l < p`).
- `dec` — best sum ending at `i` of the form "increasing (≥ 1 step) then strictly decreasing (≥ 1 step)" (phases 1–2, `p < q`).
- `inc2` — best sum ending at `i` of a full trionic subarray (phases 1–3, `q < r`).

Transitions depend only on how `nums[i-1]` compares with `nums[i]`:

- `nums[i-1] < nums[i]`: `inc1 = max(inc1, nums[i-1]) + nums[i]` (extend, or start fresh at `i-1`); `inc2 = max(inc2, dec) + nums[i]` (extend the last rise, or begin it from the valley); `dec = −∞`.
- `nums[i-1] > nums[i]`: `dec = max(dec, inc1) + nums[i]` (extend the fall, or begin it from the peak); `inc1 = inc2 = −∞`.
- Equal: every state breaks → all `−∞`.

The answer is the maximum `inc2` seen. Taking `max` with "start fresh" automatically discards negative prefixes of the first rise, so values down to −10^9 are handled correctly (use 64-bit sums).

**Pseudocode**
```text
FUNCTION maxSumTrionic(nums):
    n ← LENGTH(nums)
    inc1 ← -INF; dec ← -INF; inc2 ← -INF; ans ← -INF
    FOR i ← 1 TO n-1
        prev ← nums[i-1]; x ← nums[i]
        IF prev < x
            newInc1 ← MAX(inc1, prev) + x
            newInc2 ← MAX(inc2, dec) + x
            newDec ← -INF
        ELSE IF prev > x
            newDec ← MAX(dec, inc1) + x
            newInc1 ← -INF; newInc2 ← -INF
        ELSE
            newInc1 ← -INF; newDec ← -INF; newInc2 ← -INF
        inc1 ← newInc1; dec ← newDec; inc2 ← newInc2
        ans ← MAX(ans, inc2)
    RETURN ans
```

## Walkthrough
Example 1: `nums = [0,-2,-1,-3,0,2,-1]` (`-` means −∞):

| i | nums[i-1] → nums[i] | inc1 | dec | inc2 | ans |
|---|---------------------|------|-----|------|-----|
| 1 | 0 → -2 (down) | - | max(-, -) + (-2) = - | - | - |
| 2 | -2 → -1 (up) | max(-, -2) + (-1) = -3 | - | - | - |
| 3 | -1 → -3 (down) | - | max(-, -3) + (-3) = -6 | - | - |
| 4 | -3 → 0 (up) | max(-, -3) + 0 = -3 | - | max(-, -6) + 0 = -6 | -6 |
| 5 | 0 → 2 (up) | max(-3, 0) + 2 = 2 | - | max(-6, -) + 2 = -4 | -4 |
| 6 | 2 → -1 (down) | - | max(-, 2) + (-1) = 1 | - | -4 |

Result = **-4** (subarray `[-2,-1,-3,0,2]`), matching the expected output.

## Complexity Analysis
- Time: O(n) — a single pass with O(1) work per index.
- Space: O(1) — only three state variables.

## Follow-Up Questions
1. How would you also return the indices `l, p, q, r` of the optimal subarray?
2. How does the DP generalize to a pattern with `k` alternating monotone phases?
3. An alternative solution decomposes the array into maximal rise–fall–rise pieces and extends with best prefix/suffix sums; how do the two compare?

## Key Takeaway
Shape-constrained maximum-sum subarray problems map naturally to a small state machine: one DP value per phase, with "extend" vs. "start the next phase here" transitions, giving O(n) time and O(1) space.
