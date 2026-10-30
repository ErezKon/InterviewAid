# 1191. K-Concatenation Maximum Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-concatenation-maximum-sum](https://leetcode.com/problems/k-concatenation-maximum-sum)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Kadane's + Total Sum Analysis — O(n) ✅](#4-approach-kadanes--total-sum-analysis--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an integer array `arr` and an integer `k`, modify the array by repeating it `k` times.

For example, if `arr = [1, 2]` and `k = 3 `then the modified array will be `[1, 2, 1, 2, 1, 2]`.

Return the maximum sub-array sum in the modified array. Note that the length of the sub-array can be `0` and its sum in that case is `0`.

As the answer can be very large, return the answer **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= arr.length <= 10^5`
- `1 <= k <= 10^5`
- `-10^4 <= arr[i] <= 10^4`

---

## 2. Examples

**Example 1:**
```
Input: arr = [1, 2], k = 3
Output: 9
Explanation: The concatenated array is [1, 2, 1, 2, 1, 2].
The maximum-sum subarray is the entire array, with sum 1 + 2 + 1 + 2 + 1 + 2 = 9.
```

**Example 2:**
```
Input: arr = [1, -2, 1], k = 5
Output: 2
Explanation: The concatenated array is [1, -2, 1, 1, -2, 1, 1, -2, 1, 1, -2, 1, 1, -2, 1].
The maximum-sum subarray is [1, 1], formed by the last element of one copy and the first element of the next copy, with sum 1 + 1 = 2.
```

**Example 3:**
```
Input: arr = [-1, -2], k = 7
Output: 0
Explanation: Every element in the concatenated array is negative, so no subarray has a positive sum. Therefore, the maximum possible sum is 0.
```

---

## 3. Key Insight

Three cases:
1. **k = 1:** Standard Kadane's on `arr`.
2. **k ≥ 2, totalSum ≤ 0:** Max subarray lies within two consecutive copies. Run Kadane's on `arr + arr`.
3. **k ≥ 2, totalSum > 0:** Best = maxSuffix(arr) + (k-2) × totalSum + maxPrefix(arr).

---

## 4. Approach: Kadane's + Total Sum Analysis — O(n) ✅

```
FUNCTION kConcatenationMaxSum(arr, k):
    MOD = 10^9 + 7
    totalSum = SUM(arr)

    // Kadane's on one copy
    kadane1 = kadane(arr)

    IF k == 1: RETURN kadane1 % MOD

    // Kadane's on two copies
    kadane2 = kadane(arr + arr)

    IF totalSum > 0:
        RETURN MAX(kadane2, kadane2 + (k - 2) * totalSum) % MOD
    ELSE:
        RETURN kadane2 % MOD

FUNCTION kadane(arr):
    maxSum = 0; curSum = 0
    FOR num IN arr:
        curSum = MAX(num, curSum + num)
        maxSum = MAX(maxSum, curSum)
    RETURN maxSum
```

---

## 5. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Kadane's on at most 2n elements |
| Space | O(n) | For the doubled array (or O(1) with index wrapping) |

---

## 6. Key Takeaway

> When totalSum > 0, additional copies in the middle each contribute totalSum. The "boundary" subarray spans the suffix of one copy + prefix of the next. Run Kadane's on two copies to capture this, then add (k-2) × totalSum if beneficial.
