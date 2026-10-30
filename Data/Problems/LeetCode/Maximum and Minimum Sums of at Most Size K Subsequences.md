# 3428. Maximum and Minimum Sums of at Most Size K Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-and-minimum-sums-of-at-most-size-k-subsequences](https://leetcode.com/problems/maximum-and-minimum-sums-of-at-most-size-k-subsequences)
**Companies:** Amazon, Bloomberg, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + Combinatorics — O(n log n)](#approach-sort--combinatorics--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums` and a positive integer `k`. Return the sum of the **maximum** and **minimum** elements of all **subsequences** of `nums` with **at most** `k` elements.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`
- `1 <= k <= min(70, nums.length)`

---

## Key Insight

> Sort the array. For element `nums[i]` as the **maximum** of a subsequence, the other elements must come from `nums[0..i-1]`. The number of such subsequences of size ≤ k is `Σ C(i, j)` for j = 0 to min(k-1, i). Similarly handle each element as the minimum. Use precomputed factorials for fast binomial coefficients.

---

## Approach: Sort + Combinatorics — O(n log n) ✅

```text
FUNCTION maxMinSum(nums, k):
    SORT nums
    MOD ← 10^9 + 7
    precompute factorials and inverse factorials

    result ← 0
    FOR i ← 0 TO n - 1:
        // nums[i] as max: choose up to k-1 from i elements before it
        countAsMax ← SUM(C(i, j) for j = 0 to MIN(k-1, i))
        // nums[i] as min: choose up to k-1 from n-i-1 elements after it
        countAsMin ← SUM(C(n-i-1, j) for j = 0 to MIN(k-1, n-i-1))
        result ← (result + nums[i] * (countAsMax + countAsMin)) MOD MOD

    RETURN result
```

Optimize partial sums of binomial coefficients using prefix sums or recurrence.

---

## 3. Examples

**Example 1:**
```
Input: nums = [1,2,3], k = 2
Output: 24
Explanation: The subsequences of nums with at most 2 elements are:
  Subsequence
  Minimum
  Maximum
  Sum
  [1]
  1
  1
  2
  [2]
  2
  2
  4
  [3]
  3
  3
  6
  [1, 2]
  1
  2
  3
  [1, 3]
  1
  3
  4
  [2, 3]
  2
  3
  5
  Final Total
  24
The output would be 24.
```

**Example 2:**
```
Input: nums = [5,0,6], k = 1
Output: 22
Explanation: For subsequences with exactly 1 element, the minimum and maximum values are the element itself. Therefore, the total is 5 + 5 + 0 + 0 + 6 + 6 = 22.
```

**Example 3:**
```
Input: nums = [1,1,1], k = 2
Output: 12
Explanation: The subsequences [1, 1] and [1] each appear 3 times. For all of them, the minimum and maximum are both 1. Thus, the total is 12.
```

---

## 4. Walkthrough

Take Example 1 (`nums = [1,2,3]`, `k = 2`).
1. **Sort** → `[1,2,3]` (already sorted).
2. **Pre‑compute** factorials for n=3.
3. **Iterate** each index:
   - i=0, `nums[0]=1`:
     * `countAsMax = Σ C(0, j) for j≤1 → C(0,0)=1`
     * `countAsMin = Σ C(2, j) for j≤1 → C(2,0)+C(2,1)=1+2=3`
     * Contribution = 1 * (1+3) = 4
   - i=1, `nums[1]=2`:
     * `countAsMax = Σ C(1, j) → C(1,0)+C(1,1)=1+1=2`
     * `countAsMin = Σ C(1, j) → 1+1=2`
     * Contribution = 2 * (2+2) = 8
   - i=2, `nums[2]=3`:
     * `countAsMax = Σ C(2, j) → 1+2=3`
     * `countAsMin = Σ C(0, j) → 1`
     * Contribution = 3 * (3+1) = 12
4. **Sum contributions**: 4 + 8 + 12 = 24, matching the manual enumeration.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Combinatorics | **O(n log n + n·k)** (dominated by sorting; binomial sums can be reduced to O(n)) | O(n) |

---

## Key Takeaway

> By sorting, each element’s contribution as a minimum or maximum can be counted combinatorially. This transforms a seemingly exponential enumeration into a linear‑ith‑log‑n computation.
