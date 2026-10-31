# 1498. Number of Subsequences That Satisfy the Given Sum Condition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition](https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Two Pointers — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You are given an array of integers `nums` and an integer `target`.

Return *the number of **non-empty** subsequences of *`nums`* such that the sum of the minimum and maximum element on it is less or equal to *`target`. Since the answer may be too large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`
- `1 <= target <= 10^6`

---

## Examples

**Example 1:**
```
Input: nums = [3,5,6,7], target = 9
Output: 4
Explanation: There are 4 subsequences that satisfy the condition.
[3] -> Min value + max value <= target (3 + 3 <= 9)
[3,5] -> (3 + 5 <= 9)
[3,5,6] -> (3 + 6 <= 9)
[3,6] -> (3 + 6 <= 9)
```

**Example 2:**
```
Input: nums = [3,3,6,8], target = 10
Output: 6
Explanation: There are 6 subsequences that satisfy the condition. (nums can have repeated numbers).
[3] , [3] , [3,3], [3,6] , [3,6] , [3,3,6]
```

**Example 3:**
```
Input: nums = [2,3,3,4,6,7], target = 12
Output: 61
Explanation: There are 63 non-empty subsequences, two of them do not satisfy the condition ([6,7], [7]).
Number of valid subsequences (63 - 2 = 61).
```

---

## 2. Key Insight

> Sort the array. Fix the smallest element (lo). Find the rightmost hi where `nums[lo] + nums[hi] ≤ target`. All 2^(hi-lo) subsets of `[lo+1..hi]` including lo are valid.

---

## 3. Approach: Sort + Two Pointers — O(n log n) ✅

```text
FUNCTION numSubseq(nums, target):
    MOD ← 10^9 + 7
    SORT nums
    lo ← 0
    hi ← LENGTH(nums) - 1
    result ← 0

    WHILE lo ≤ hi:
        IF nums[lo] + nums[hi] > target:
            hi ← hi - 1
        ELSE:
            result ← (result + POW(2, hi - lo, MOD)) % MOD
            lo ← lo + 1

    RETURN result
```

---

## Walkthrough

Consider `nums = [3,5,6,7]`, `target = 9`.

| Step | lo | hi | nums[lo]+nums[hi] | Action | result |
|------|----|----|------------------|--------|--------|
| 1 | 0 (3) | 3 (7) | 10 > 9 | hi-- → 2 |
| 2 | 0 (3) | 2 (6) | 9 ≤ 9 | add 2^(2-0)=4 → result=4, lo++ → 1 |
| 3 | 1 (5) | 2 (6) | 11 > 9 | hi-- → 1 |
| 4 | 1 (5) | 1 (5) | 10 > 9 | hi-- → 0 (loop ends) |

Result = 4.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) |
| **Space** | O(1) extra |

---

## 5. Key Takeaway

> **Sort + two pointers + power of 2.** Fix min, find max bound. All subsets between them (excluding min) are valid. Subsequence order doesn't matter after sorting.
