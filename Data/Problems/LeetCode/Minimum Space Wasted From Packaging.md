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

You have `n` packages that you are trying to place in boxes, **one package in each box**. There are `m` suppliers that each produce boxes of **different sizes** (with infinite supply). A package can be placed in a box if the size of the package is **less than or equal to** the size of the box.

The package sizes are given as an integer array `packages`, where `packages[i]` is the **size** of the `i^th` package. The suppliers are given as a 2D integer array `boxes`, where `boxes[j]` is an array of **box sizes** that the `j^th` supplier produces.

You want to choose a **single supplier** and use boxes from them such that the **total wasted space **is **minimized**. For each package in a box, we define the space **wasted** to be `size of the box - size of the package`. The **total wasted space** is the sum of the space wasted in **all** the boxes.

- For example, if you have to fit packages with sizes `[2,3,5]` and the supplier offers boxes of sizes `[4,8]`, you can fit the packages of size-`2` and size-`3` into two boxes of size-`4` and the package with size-`5` into a box of size-`8`. This would result in a waste of `(4-2) + (4-3) + (8-5) = 6`.

Return *the **minimum total wasted space** by choosing the box supplier **optimally**, or *`-1` *if it is **impossible** to fit all the packages inside boxes. *Since the answer may be **large**, return it **modulo **`10^9 + 7`.

**Constraints:**
- `n == packages.length`
- `m == boxes.length`
- `1 <= n <= 10^5`
- `1 <= m <= 10^5`
- `1 <= packages[i] <= 10^5`
- `1 <= boxes[j].length <= 10^5`
- `1 <= boxes[j][k] <= 10^5`
- `sum(boxes[j].length) <= 10^5`
- The elements in `boxes[j]` are **distinct**.

---

## 2. Examples

**Example 1:**
```
Input: packages = [2,3,5], boxes = [[4,8],[2,8]]
Output: 6
Explanation: It is optimal to choose the first supplier, using two size-4 boxes and one size-8 box.
The total waste is (4-2) + (4-3) + (8-5) = 6.
```

**Example 2:**
```
Input: packages = [2,3,5], boxes = [[1,4],[2,3],[3,4]]
Output: -1
Explanation: There is no box that the package of size 5 can fit in.
```

**Example 3:**
```
Input: packages = [3,5,8,10,11,12], boxes = [[12],[11,9],[10,5,14]]
Output: 9
Explanation: It is optimal to choose the third supplier, using two size-5 boxes, two size-10 boxes, and two size-14 boxes.
The total waste is (5-3) + (5-5) + (10-8) + (10-10) + (14-11) + (14-12) = 9.
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
