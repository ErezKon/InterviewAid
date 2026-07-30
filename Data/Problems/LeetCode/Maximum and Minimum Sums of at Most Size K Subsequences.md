# 3428. Maximum and Minimum Sums of at Most Size K Subsequences

**Difficulty:** 🟡 Medium
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

Given an array `nums` and integer `k`, compute the sum over all subsequences of size ≤ k of `(max(subseq) + min(subseq))`. Return the result modulo 10⁹+7.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ k ≤ n`

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
Output: 16
Explanation:
Subsequences of size ≤2:
- Size 1: [1], [2], [3] → (1+1)+(2+2)+(3+3)=12
- Size 2: [1,2], [1,3], [2,3]
  * max+min for [1,2] = 2+1 = 3
  * max+min for [1,3] = 3+1 = 4
  * max+min for [2,3] = 3+2 = 5
  Sum = 3+4+5 = 12
Total = 12 + 12 = 24 → modulo 1e9+7 = 24
```

**Example 2:**
```
Input: nums = [5,1,2], k = 3
Output: 30
Explanation:
All subsequences (size ≤3) and their max+min:
[5]=10, [1]=2, [2]=4,
[5,1]=6, [5,2]=7, [1,2]=3,
[5,1,2]=7
Sum = 10+2+4+6+7+3+7 = 39 → 39 mod 1e9+7 = 39
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
