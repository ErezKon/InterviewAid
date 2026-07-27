# 2951. Find the Peaks

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-peaks](https://leetcode.com/problems/find-the-peaks)
**Companies:** Accelya, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Linear Scan — O(n) ✅](#2-approach-linear-scan--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given an array `mountain`, find all indices `i` (1 ≤ i ≤ n-2) where `mountain[i] > mountain[i-1]` and `mountain[i] > mountain[i+1]` (local maxima).

**Constraints:**
- `3 <= n <= 100`

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION findPeaks(mountain):
    peaks ← []
    FOR i ← 1 TO n - 2 DO
        IF mountain[i] > mountain[i-1] AND mountain[i] > mountain[i+1] THEN
            peaks.ADD(i)
    RETURN peaks
```

---

## 3. Key Takeaway

> Simple linear scan checking each interior element against its two neighbors. O(n) time, O(1) extra space.
