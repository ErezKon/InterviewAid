# 2134. Minimum Swaps to Group All 1's Together II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii)
**Companies:** Adobe, Amazon, Arcesium, Bloomberg, Bytedance, Google, Ibm, Josh Technology, Microsoft, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Fixed-Size Sliding Window (Circular) — O(n)](#4-approach-fixed-size-sliding-window-circular--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

A **swap** is defined as taking two **distinct** positions in an array and swapping the values in them.

A **circular** array is defined as an array where we consider the **first** element and the **last** element to be **adjacent**.

Given a **binary** **circular** array `nums`, return *the minimum number of swaps required to group all *`1`*'s present in the array together at **any location***.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.

---

## 2. Examples

**Example 1:**
```
Input: nums = [0,1,0,1,1,0,0]
Output: 1
Explanation: Here are a few of the ways to group all the 1's together:
[0,0,1,1,1,0,0] using 1 swap.
[0,1,1,1,0,0,0] using 1 swap.
[1,1,0,0,0,0,1] using 2 swaps (using the circular property of the array).
There is no way to group all 1's together with 0 swaps.
Thus, the minimum number of swaps required is 1.
```

**Example 2:**
```
Input: nums = [0,1,1,1,0,0,1,1,0]
Output: 2
Explanation: Here are a few of the ways to group all the 1's together:
[1,1,1,0,0,0,0,1,1] using 2 swaps (using the circular property of the array).
[1,1,1,1,1,0,0,0,0] using 2 swaps.
There is no way to group all 1's together with 0 or 1 swaps.
Thus, the minimum number of swaps required is 2.
```

**Example 3:**
```
Input: nums = [1,1,0,0,1]
Output: 0
Explanation: All the 1's are already grouped together due to the circular property of the array.
Thus, the minimum number of swaps required is 0.
```

---

## 3. Key Insight

> Same as the non-circular version but the window wraps around. Use modular indexing. Window size = count of 1s. Minimum zeros in any circular window = minimum swaps.

---

## 4. Approach: Fixed-Size Sliding Window (Circular) — O(n) ✅

```
FUNCTION minSwaps(nums):
    ones = SUM(nums)
    IF ones <= 1: RETURN 0

    n = len(nums)
    // Count zeros in first window of size 'ones'
    zeros = SUM(1 for i in range(ones) if nums[i] == 0)
    minZeros = zeros

    FOR i ← 1 TO n - 1:
        // Slide window circularly
        IF nums[(i - 1)] == 0: zeros -= 1     // remove left
        IF nums[(i + ones - 1) % n] == 0: zeros += 1  // add right
        minZeros = MIN(minZeros, zeros)

    RETURN minZeros
```

---

## 5. Walkthrough

```
nums = [1, 1, 0, 0, 1], ones = 3

Circular windows of size 3:
  [1,1,0] → zeros=1
  [1,0,0] → zeros=2
  [0,0,1] → zeros=2
  [0,1,1] → zeros=1 (wraps: indices 3,4,0)
  [1,1,1] → zeros=0 (wraps: indices 4,0,1) ← min!

Answer = 0 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single circular pass |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Circular sliding window** — use modular indexing (`% n`) to handle wraparound. Same "count zeros in fixed window" pattern as the non-circular version.
