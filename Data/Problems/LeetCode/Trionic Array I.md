# 3637. Trionic Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/trionic-array-i](https://leetcode.com/problems/trionic-array-i)
**Companies:** Amazon, Google, Infosys, Meta

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

You are given an integer array `nums` of length `n`.

An array is **trionic** if there exist indices `0 < p < q < n − 1` such that:

- `nums[0...p]` is **strictly** increasing,
- `nums[p...q]` is **strictly** decreasing,
- `nums[q...n − 1]` is **strictly** increasing.

Return `true` if `nums` is trionic, otherwise return `false`.

**Constraints:**
- `3 <= n <= 100`
- `-1000 <= nums[i] <= 1000`

## Examples

**Example 1:**
```
Input: nums = [1,3,5,4,2,6]
Output: true
Explanation: Pick p = 2, q = 4:
- nums[0...2] = [1, 3, 5] is strictly increasing (1 < 3 < 5).
- nums[2...4] = [5, 4, 2] is strictly decreasing (5 > 4 > 2).
- nums[4...5] = [2, 6] is strictly increasing (2 < 6).
```

**Example 2:**
```
Input: nums = [2,1,3]
Output: false
Explanation: There is no way to pick p and q to form the required three segments.
```

## Approach
Walk the array once, greedily consuming each of the three monotone phases:

1. Advance index `i` while `nums[i] < nums[i+1]`. The stopping point is `p`; it must satisfy `p > 0` (the first rise needs at least one step).
2. From `p`, advance while `nums[i] > nums[i+1]`. The stopping point is `q`; it must satisfy `q > p` and `q < n − 1` (the fall needs a step, and something must remain for the last rise).
3. From `q`, advance while `nums[i] < nums[i+1]`. The array is trionic exactly when this reaches `n − 1`.

Greedy maximal phases are safe: since phases alternate direction, `p` must be the end of the maximal initial rise and `q` the end of the maximal fall that follows it. Equal adjacent values stop every phase and make the answer `false`.

**Pseudocode**
```text
FUNCTION isTrionic(nums):
    n ← LENGTH(nums)
    i ← 0
    WHILE i + 1 < n AND nums[i] < nums[i+1]
        i ← i + 1
    IF i = 0
        RETURN false              // no first rise
    p ← i
    WHILE i + 1 < n AND nums[i] > nums[i+1]
        i ← i + 1
    IF i = p OR i = n - 1
        RETURN false              // no fall, or nothing left for the last rise
    WHILE i + 1 < n AND nums[i] < nums[i+1]
        i ← i + 1
    RETURN i = n - 1
```

## Walkthrough
Example 1: `nums = [1,3,5,4,2,6]`, `n = 6`.
1. Rise: 1 < 3 < 5, then 5 > 4 stops → `p = 2` (> 0, ok).
2. Fall: 5 > 4 > 2, then 2 < 6 stops → `q = 4` (> p and < 5, ok).
3. Rise: 2 < 6 → `i = 5 = n − 1`.
4. Reached the end → return **true**, matching the expected output.

(Example 2, `[2,1,3]`: the first rise stops at `i = 0` → `false`.)

## Complexity Analysis
- Time: O(n) — each index is visited once.
- Space: O(1).

## Follow-Up Questions
1. How would you find the maximum-sum trionic **subarray** (Trionic Array II)?
2. How would you generalize to check for `k` alternating monotone phases?
3. How would you count the number of trionic subarrays?

## Key Takeaway
Validating a fixed monotone "shape" is a single greedy pass: consume each maximal phase in turn and check that every phase is non-empty and the scan ends exactly at the last index.
