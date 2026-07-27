# 2426. Number of Pairs Satisfying Inequality

**Difficulty:** 🔴 Hard

**Companies:** Amazon, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Merge Sort / BIT — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count pairs `(i, j)` where `i < j` and `nums1[i] - nums1[j] <= nums2[i] - nums2[j] + diff`.

---

## 2. Key Insight

> Transform: let `a[i] = nums1[i] - nums2[i]`. Condition becomes `a[i] - a[j] <= diff`, i.e., `a[i] <= a[j] + diff`. Count inversions variant solvable with merge sort or BIT.

---

## 3. Approach: Merge Sort / BIT — O(n log n) ✅

```
// Modified merge sort or BIT
// For j>i: nums1[i]-nums1[j] <= nums2[i]-nums2[j]+diff
// Transform: (nums1[i]-nums2[i]) - (nums1[j]-nums2[j]) <= diff
// Reduce to: count pairs where a[i] <= a[j] + diff (i < j)
// Use merge sort counting or BIT with coordinate compression
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Transform to single-array inequality, then count with merge sort.** Subtracting paired arrays reduces two-array constraints to a single-array inversion-counting problem.
