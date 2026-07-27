# 1228. Missing Number In Arithmetic Progression

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/missing-number-in-arithmetic-progression](https://leetcode.com/problems/missing-number-in-arithmetic-progression)
**Companies:** Amazon, Audible

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Expected Diff — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an arithmetic progression with one missing element, return the **missing** value.

**Constraints:**
- `3 <= arr.length <= 1000`
- Array is sorted

---

## 2. Key Insight

> The true common difference = `(arr[-1] - arr[0]) / n`. Scan for where `arr[i+1] - arr[i] != diff`.

---

## 3. Approach: Expected Diff — O(n) ✅

```
FUNCTION missingNumber(arr):
    n = len(arr)
    diff = (arr[-1] - arr[0]) / n
    FOR i ← 0 TO n - 2:
        IF arr[i+1] - arr[i] != diff:
            RETURN arr[i] + diff
    RETURN arr[0]  // no gap found (all same)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Compute expected difference, find the gap.** The true diff = `(last - first) / n`. The position where consecutive diff ≠ expected diff contains the missing element.
