# 3209. Number of Subarrays With AND Value of K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-subarrays-with-and-value-of-k](https://leetcode.com/problems/number-of-subarrays-with-and-value-of-k)
**Companies:** De Shaw

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window on AND Values — O(n log max)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count subarrays whose bitwise AND equals exactly `k`.

---

## 2. Key Insight

> AND is monotonically non-increasing as the subarray extends. For a fixed right endpoint, the AND values form at most O(log max) distinct values. Track current AND set and merge.

---

## 3. Approach: Sliding Window on AND Values — O(n log max) ✅

```
FUNCTION countSubarrays(nums, k):
    count = 0
    // Track set of (AND_value, count_of_subarrays)
    prev = {}
    FOR num IN nums:
        curr = {}
        FOR (val, cnt) IN prev.items():
            curr[val & num] = curr.get(val & num, 0) + cnt
        curr[num] = curr.get(num, 0) + 1
        count += curr.get(k, 0)
        prev = curr
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · log(max)) — at most 30 distinct AND values per position |
| **Space** | O(log(max)) |

---

## 5. Key Takeaway

> **AND is monotonic → O(log max) distinct values per endpoint.** Maintain a map of AND values and their counts. AND with new element and merge.
