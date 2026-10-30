# 3364. Minimum Positive Sum Subarray

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-positive-sum-subarray](https://leetcode.com/problems/minimum-positive-sum-subarray)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Brute Force — O(n² · (r-l))](#4-approach-brute-force)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given an integer array `nums` and **two** integers `l` and `r`. Your task is to find the **minimum** sum of a **subarray** whose size is between `l` and `r` (inclusive) and whose sum is greater than 0.

Return the **minimum** sum of such a subarray. If no such subarray exists, return -1.

A **subarray** is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= l <= r <= nums.length`
- `-1000 <= nums[i] <= 1000`

---

## 2. Examples

**Example 1:**
```
Input: nums = [3, -2, 1, 4], l = 2, r = 3
Output: 1
Explanation: The subarrays of length between l = 2 and r = 3 where the sum is greater than 0 are:
- [3, -2] with a sum of 1
- [1, 4] with a sum of 5
- [3, -2, 1] with a sum of 2
- [-2, 1, 4] with a sum of 3
Out of these, the subarray [3, -2] has a sum of 1, which is the smallest positive sum. Hence, the answer is 1.
```

**Example 2:**
```
Input: nums = [-2, 2, -3, 1], l = 2, r = 3
Output: -1
Explanation: There is no subarray of length between l and r that has a sum greater than 0. So, the answer is -1.
```

**Example 3:**
```
Input: nums = [1, 2, 3, 4], l = 2, r = 4
Output: 3
Explanation: The subarray [1, 2] has a length of 2 and the minimum sum greater than 0. So, the answer is 3.
```

---

## 3. Key Insight

> With small constraints (n ≤ 100), enumerate all subarrays of lengths `l` to `r` and track the minimum positive sum. Use prefix sums for efficient subarray sum computation.

---

## 4. Approach: Brute Force — O(n² · (r-l)) ✅

```
FUNCTION minPositiveSumSubarray(nums, l, r):
    minSum = infinity

    FOR length ← l TO r:
        curSum = SUM(nums[0..length-1])
        IF curSum > 0: minSum = MIN(minSum, curSum)

        FOR i ← 1 TO n - length:
            curSum += nums[i + length - 1] - nums[i - 1]
            IF curSum > 0: minSum = MIN(minSum, curSum)

    RETURN minSum IF minSum != infinity ELSE -1
```

---

## 5. Walkthrough

```
nums = [3, -2, 1, 4], l=2, r=3

Length 2:
  [3,-2]=1 > 0 → minSum=1
  [-2,1]=-1 ≤ 0 → skip
  [1,4]=5 > 0 → minSum=min(1,5)=1

Length 3:
  [3,-2,1]=2 > 0 → minSum=min(1,2)=1
  [-2,1,4]=3 > 0 → minSum=min(1,3)=1

Answer = 1 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · (r - l + 1)) — sliding window for each length |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Small constraints = brute force is fine.** Sliding window per length keeps it efficient. For larger inputs, prefix sums + sorted structure could bring it to O(n log n).
