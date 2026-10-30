# 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold](https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold)
**Companies:** Amazon, Goldman Sachs, Linkedin

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Sliding Window — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array of integers `arr` and two integers `k` and `threshold`, return *the number of sub-arrays of size *`k`* and average greater than or equal to *`threshold`.

**Constraints:**
- `1 <= arr.length <= 10^5`
- `1 <= arr[i] <= 10^4`
- `1 <= k <= arr.length`
- `0 <= threshold <= 10^4`

---

## 2. Examples

**Example 1:**
```
Input: arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
Output: 3
Explanation: Sub-arrays [2,5,5],[5,5,5] and [5,5,8] have averages 4, 5 and 6 respectively. All other sub-arrays of size 3 have averages less than 4 (the threshold).
```

**Example 2:**
```
Input: arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5
Output: 6
Explanation: The first 6 sub-arrays of size 3 have averages greater than 5. Note that averages are not integers.
```

---

## 3. Approach: Sliding Window — O(n) ✅

```text
FUNCTION numOfSubarrays(arr, k, threshold):
    target ← k * threshold
    windowSum ← SUM(arr[0 : k])
    count ← 1 IF windowSum ≥ target ELSE 0

    FOR i ← k TO LENGTH(arr) - 1:
        windowSum ← windowSum + arr[i] - arr[i - k]
        IF windowSum ≥ target:
            count ← count + 1

    RETURN count
```

---

## 4. Walkthrough

Consider `arr = [2,2,2,2,5,5,5,8]`, `k = 3`, `threshold = 4`.

1. Compute `target = 3 * 4 = 12`.
2. Initial window `[2,2,2]` sum = 6 → < 12 → count = 0.
3. Slide: add 2, remove 2 → sum = 6 → still < 12.
4. Slide: add 5, remove 2 → sum = 9 → < 12.
5. Slide: add 5, remove 2 → sum = 12 → ≥ 12 → count = 1.
6. Slide: add 5, remove 2 → sum = 12 → count = 2.
7. Slide: add 8, remove 5 → sum = 18 → count = 3.

Result: 3 qualifying subarrays.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would you modify the solution for variable‑size subarrays where the length is not fixed?
2. Can you extend the approach to handle a stream of numbers where the array is not fully known in advance?

---

## 7. Key Takeaway

> **Compare sum instead of average.** Multiply threshold by k to avoid division. Classic fixed-size sliding window.
