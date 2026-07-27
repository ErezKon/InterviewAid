# 1889. Minimum Space Wasted From Packaging

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-space-wasted-from-packaging](https://leetcode.com/problems/minimum-space-wasted-from-packaging)
**Companies:** Amazon, Imc, Two Sigma

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Binary Search — O(n log n + Σb log n)](#4-approach-sort--binary-search)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given packages of various sizes and multiple box suppliers (each offering a set of box sizes), assign each package to a box ≥ its size. Waste = box size - package size. Choose one supplier and minimize **total waste**. Return `-1` if no supplier can fit all packages.

**Constraints:**
- `1 <= packages.length <= 10⁵`
- `1 <= boxes.length <= 10⁵`
- Sum of all box arrays ≤ 10⁵

---

## 2. Examples

```
Example 1:
  Input: packages = [2,3,5], boxes = [[4,8],[2,8]]
  Output: 6
  Explanation: Supplier [2,8]: 2→2(waste 0), 3→8(waste 5), 5→8(waste 3) = 8.
    Supplier [4,8]: 2→4(waste 2), 3→4(waste 1), 5→8(waste 3) = 6 ✅
```

---

## 3. Key Insight

> Sort packages. For each supplier's box sizes (sorted), binary search to find how many packages fit in each box size. Use **prefix sums** to compute the total package size in a range, then waste = `box * count - sumOfPackages`.

---

## 4. Approach: Sort + Binary Search — O(n log n + Σb log n) ✅

```
FUNCTION minWastedSpace(packages, boxes):
    MOD = 10^9 + 7
    SORT packages
    prefix = prefix sums of packages
    minWaste = infinity

    FOR supplier IN boxes:
        SORT supplier
        IF supplier[-1] < packages[-1]: CONTINUE
        waste = 0; prev = 0
        FOR box IN supplier:
            idx = bisect_right(packages, box)
            waste += box * (idx - prev) - (prefix[idx] - prefix[prev])
            prev = idx
        minWaste = MIN(minWaste, waste)

    RETURN minWaste % MOD IF minWaste < infinity ELSE -1
```

---

## 5. Walkthrough

```
packages = [2, 3, 5] (sorted), prefix = [0, 2, 5, 10]

Supplier [4, 8] (sorted):
  box=4: idx = bisect_right([2,3,5], 4) = 2
    waste += 4*2 - (prefix[2]-prefix[0]) = 8-5 = 3. prev=2
  box=8: idx = bisect_right([2,3,5], 8) = 3
    waste += 8*1 - (prefix[3]-prefix[2]) = 8-5 = 3. prev=3
  Total waste = 3+3 = 6 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n + Σb_i log n) — sort packages once, binary search per box |
| **Space** | O(n) — prefix sums |

---

## 7. Key Takeaway

> **Sort + binary search + prefix sums** — for each box size, binary search to find which packages it covers, then compute waste using prefix sums in O(1). Classic technique for batch assignment problems.
