# 2875. Minimum Size Subarray in Infinite Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-size-subarray-in-infinite-array](https://leetcode.com/problems/minimum-size-subarray-in-infinite-array)
**Companies:** De Shaw

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Reduce + Sliding Window — O(n)](#4-approach-reduce--sliding-window--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a circular (infinite repeat) array `nums` and a target, return the **minimum** length subarray with sum equal to `target`, or `-1` if impossible.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i], target <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: nums = [1, 2, 3], target = 5
  Output: 2
  Explanation: [2,3] sums to 5.

Example 2:
  Input: nums = [1, 1, 1, 2, 3], target = 4
  Output: 2
  Explanation: [1,3] wrapping around, or [1,3] in one copy.
```

---

## 3. Key Insight

> If `target ≥ totalSum`, we can use `⌊target/totalSum⌋` full copies of the array, then find the minimum subarray in a **doubled** array for the remainder `target % totalSum`. Total length = full copies × n + subarray length for remainder.

---

## 4. Approach: Reduce + Sliding Window — O(n) ✅

```
FUNCTION minSizeSubarray(nums, target):
    n = len(nums)
    totalSum = SUM(nums)
    
    fullCopies = target // totalSum
    remainder = target % totalSum
    
    IF remainder == 0:
        RETURN fullCopies * n
    
    // Sliding window on doubled array for sum == remainder
    doubled = nums + nums
    left = 0, curSum = 0, minLen = infinity
    
    FOR right ← 0 TO 2*n - 1:
        curSum += doubled[right]
        WHILE curSum > remainder:
            curSum -= doubled[left]
            left += 1
        IF curSum == remainder:
            minLen = MIN(minLen, right - left + 1)
    
    IF minLen == infinity: RETURN -1
    RETURN fullCopies * n + minLen
```

---

## 5. Walkthrough

```
nums = [1, 2, 3], target = 5
totalSum = 6, fullCopies = 0, remainder = 5

Doubled: [1, 2, 3, 1, 2, 3]
Sliding window for sum == 5:
  [1,2] = 3, [1,2,3] = 6 > 5 → shrink...
  [2,3] = 5 ✅ → minLen = 2

Answer = 0*3 + 2 = 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — sliding window on doubled array |
| **Space** | O(n) — doubled array |

---

## 7. Key Takeaway

> **Infinite/circular array = full copies + remainder.** Handle full copies with division, then sliding window on a doubled array for the remainder. This pattern works for any circular subarray problem.
