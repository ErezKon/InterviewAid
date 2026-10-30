# 2951. Find the Peaks

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-peaks](https://leetcode.com/problems/find-the-peaks)
**Companies:** Accelya, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Walkthrough](#3-walkthrough)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Approach: Linear Scan — O(n) ✅](#5-approach-linear-scan--on-)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** array `mountain`. Your task is to find all the **peaks** in the `mountain` array.

Return *an array that consists of *indices* of **peaks** in the given array in **any order**.*

**Notes:**

- A **peak** is defined as an element that is **strictly greater** than its neighboring elements.
- The first and last elements of the array are **not** a peak.

**Constraints:**
- `3 <= mountain.length <= 100`
- `1 <= mountain[i] <= 100`

---

## 2. Examples

**Example 1:**
```
Input: mountain = [2,4,4]
Output: []
Explanation: mountain[0] and mountain[2] can not be a peak because they are first and last elements of the array.
mountain[1] also can not be a peak because it is not strictly greater than mountain[2].
So the answer is [].
```

**Example 2:**
```
Input: mountain = [1,4,3,8,5]
Output: [1,3]
Explanation: mountain[0] and mountain[4] can not be a peak because they are first and last elements of the array.
mountain[2] also can not be a peak because it is not strictly greater than mountain[3] and mountain[1].
But mountain [1] and mountain[3] are strictly greater than their neighboring elements.
So the answer is [1,3].
```

---

## 3. Walkthrough

Consider `mountain = [1,3,2,4,1]`:
1. Start at `i = 1`: `3 > 1` and `3 > 2` → peak, add `1`.
2. `i = 2`: `2` is not greater than both neighbors.
3. `i = 3`: `4 > 2` and `4 > 1` → peak, add `3`.
Result `[1,3]`.

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) extra (output list excluded) |

---

## 5. Approach: Linear Scan — O(n) ✅

```text
FUNCTION findPeaks(mountain):
    peaks ← []
    n ← LENGTH(mountain)
    FOR i ← 1 TO n - 2 DO
        IF mountain[i] > mountain[i-1] AND mountain[i] > mountain[i+1] THEN
            peaks.ADD(i)
    RETURN peaks
```

---

## 6. Key Takeaway

> Simple linear scan checking each interior element against its two neighbors. O(n) time, O(1) extra space.
