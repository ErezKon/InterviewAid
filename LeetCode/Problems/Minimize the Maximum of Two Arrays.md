# 2513. Minimize the Maximum of Two Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-the-maximum-of-two-arrays](https://leetcode.com/problems/minimize-the-maximum-of-two-arrays)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `uniqueCnt1` and `uniqueCnt2` (number of elements needed for two arrays), and `divisor1` and `divisor2` (arr1 elements must NOT be divisible by divisor1, arr2 by divisor2), minimize the **maximum** element across both arrays. Elements can't be shared.

---

## Key Insight

> **Binary search on the answer `m`.** Among `[1..m]`, count available numbers:
> - For arr1 only: not divisible by d1 = `m - m/d1`
> - For arr2 only: not divisible by d2 = `m - m/d2`
> - For either: not divisible by both = `m - m/lcm(d1,d2)`
> - Use inclusion-exclusion to check if enough numbers exist for both arrays.

---

## Approach: Binary Search + Inclusion-Exclusion ✅

```
FUNCTION minimizeSet(divisor1, divisor2, uniqueCnt1, uniqueCnt2):
    lcm ← LCM(divisor1, divisor2)
    lo ← 1
    hi ← 2 × 10⁹
    
    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        // Numbers not divisible by d1
        forArr1 ← mid - mid / divisor1
        // Numbers not divisible by d2
        forArr2 ← mid - mid / divisor2
        // Numbers not divisible by either
        forBoth ← mid - mid / lcm
        
        IF forArr1 ≥ uniqueCnt1 AND forArr2 ≥ uniqueCnt2 AND forBoth ≥ uniqueCnt1 + uniqueCnt2 THEN
            hi ← mid
        ELSE
            lo ← mid + 1
    
    RETURN lo
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search | **O(log(2 × 10⁹))** | **O(1)** |

---

## Key Takeaway

> **Binary search + inclusion-exclusion on divisibility** — count available numbers for each constraint using floor division and LCM. A clean mathematical binary search.

---
