# 2393. Count Strictly Increasing Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-strictly-increasing-subarrays](https://leetcode.com/problems/count-strictly-increasing-subarrays)
**Companies:** Bridgewater Associates

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an array `nums` consisting of **positive** integers.

Return *the number of **subarrays** of *`nums`* that are in **strictly increasing** order.*

A **subarray** is a **contiguous** part of an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

---

## Examples

**Example 1:**
```
Input: nums = [1,3,5,4,4,6]
Output: 10
Explanation: The strictly increasing subarrays are the following:
- Subarrays of length 1: [1], [3], [5], [4], [4], [6].
- Subarrays of length 2: [1,3], [3,5], [4,6].
- Subarrays of length 3: [1,3,5].
The total number of subarrays is 6 + 3 + 1 = 10.
```

**Example 2:**
```
Input: nums = [1,2,3,4,5]
Output: 15
Explanation: Every subarray is strictly increasing. There are 15 possible subarrays that we can take.
```

---

## Key Insight

Track the length of the current increasing run. Each run of length `len` contributes `len` new subarrays (one ending at each position in the run). When the run breaks, reset `len = 1`.

---

## Approach

```
FUNCTION countIncreasingSubarrays(nums):
    total = 0; len = 1
    FOR i ← 1 TO LENGTH(nums) - 1 DO
        IF nums[i] > nums[i-1]: len += 1
        ELSE: len = 1
        total += len
    RETURN total + 1   // +1 for the first element
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Counting contiguous subarrays with a monotonic property: track the current run length. Each position adds `run_length` new valid subarrays. Reset on break.**
