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

Given an array `mountain`, find all indices `i` (1 ≤ i ≤ n-2) where `mountain[i] > mountain[i-1]` and `mountain[i] > mountain[i+1]` (local maxima).

**Constraints:**
- `3 <= n <= 100`

---

## 2. Examples

| Input | Output |
|-------|--------|
| `[1,3,2,4,1]` | `[1,3]` |
| `[2,1,2,1,2]` | `[0,2,4]` |

*Explanation:* Indices 1 and 3 are peaks in the first example; all even indices are peaks in the second.

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
