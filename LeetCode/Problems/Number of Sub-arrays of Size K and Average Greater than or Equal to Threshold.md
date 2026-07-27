# 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold](https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold)
**Companies:** Amazon, Goldman Sachs, Linkedin

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Sliding Window — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Count subarrays of size `k` with average ≥ `threshold`.

---

## 2. Approach: Sliding Window — O(n) ✅

```
FUNCTION numOfSubarrays(arr, k, threshold):
    target = k * threshold
    windowSum = SUM(arr[:k])
    count = 1 IF windowSum >= target ELSE 0

    FOR i ← k TO n - 1:
        windowSum += arr[i] - arr[i - k]
        IF windowSum >= target: count += 1

    RETURN count
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Compare sum instead of average.** Multiply threshold by k to avoid division. Classic fixed-size sliding window.
