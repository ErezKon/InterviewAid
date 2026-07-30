# 3209. Number of Subarrays With AND Value of K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-subarrays-with-and-value-of-k](https://leetcode.com/problems/number-of-subarrays-with-and-value-of-k)
**Companies:** De Shaw

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window on AND Values — O(n log max)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Count subarrays whose bitwise AND equals exactly `k`.

---

## 2. Key Insight

> AND is monotonically non-increasing as the subarray extends. For a fixed right endpoint, the AND values form at most O(log max) distinct values. Track current AND set and merge.

---

## 3. Approach: Sliding Window on AND Values — O(n log max) ✅

```text
FUNCTION countSubarrays(nums, k):
    // count of qualifying subarrays
    SET total ← 0
    // map of AND value → number of subarrays ending at previous index
    SET prevMap ← {}
    FOR num IN nums:
        SET currMap ← {}
        // extend previous subarrays with current num
        FOR (val, cnt) IN prevMap:
            SET newVal ← val AND num
            SET currMap[newVal] ← currMap.get(newVal, 0) + cnt
        // start new subarray at current index
        SET currMap[num] ← currMap.get(num, 0) + 1
        // add subarrays whose AND equals k
        SET total ← total + currMap.get(k, 0)
        SET prevMap ← currMap
    RETURN total
```

---

## 4. Examples

| nums | k | Output |
|------|---|--------|
| [1,2,3] | 0 | 3 |
| [7,7,7] | 7 | 6 |
| [5,1,2] | 0 | 4 |

*Explanation:* In the first example, subarrays `[1,2]`, `[2,3]`, and `[1,2,3]` have AND `0`.

---

## 5. Walkthrough

Consider `nums = [5,1,2]`, `k = 0`.

1. **Initialize** `total = 0`, `prevMap = {}`.
2. **First element 5**:
   - `currMap = {5:1}` (subarray `[5]`).
   - `total` unchanged (no AND `0`).
   - `prevMap = {5:1}`.
3. **Second element 1**:
   - Extend previous: `5 AND 1 = 1` → `currMap[1] = 1`.
   - New subarray `[1]` → `currMap[1] = 2`.
   - No AND `0`, `total = 0`.
   - `prevMap = {1:2}`.
4. **Third element 2**:
   - Extend: `1 AND 2 = 0` → `currMap[0] = 2`.
   - New subarray `[2]` → `currMap[2] = 1`.
   - Add `currMap[0]` to total → `total = 2` (subarrays `[5,1,2]` and `[1,2]`).
   - `prevMap = {0:2, 2:1}`.
5. **Result**: `total = 2` subarrays with AND `0`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · log max) — at most 30 distinct AND values per position |
| **Space** | O(log max) for the map of AND values |

---

## 7. Follow-Up Questions

- How would the solution change if we needed subarrays with AND **greater than or equal to** `k`?
- Can this approach be adapted for the bitwise OR or XOR operations?
- What is the impact on performance if the array length reaches 10⁵ and values are up to 2³¹‑1?

---

## 8. Key Takeaway

> **AND is monotonic → O(log max) distinct values per endpoint.** Maintain a map of AND values and their counts. AND with new element and merge.
