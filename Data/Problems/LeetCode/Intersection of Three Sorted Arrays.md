# 1213. Intersection of Three Sorted Arrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/intersection-of-three-sorted-arrays](https://leetcode.com/problems/intersection-of-three-sorted-arrays)
**Companies:** Apple, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Three Pointers — O(n) ✅](#4-approach-three-pointers--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given three integer arrays `arr1`, `arr2`, `arr3` sorted in **strictly increasing** order, return a sorted array of integers that appear in **all three** arrays.

**Constraints:**
- `1 <= arr1.length, arr2.length, arr3.length <= 1000`
- `1 <= arr1[i], arr2[i], arr3[i] <= 2000`

---

## 2. Examples

```
Input:  arr1 = [1,2,3,4,5], arr2 = [1,2,5,7,9], arr3 = [1,3,4,5,8]
Output: [1,5]

Input:  arr1 = [197,418,523,876,1356], arr2 = [501,880,1593,1710,1870], arr3 = [521,682,1337]
Output: []
```

---

## 3. Key Insight

Since all three arrays are **sorted**, use three pointers. If all three values are equal, add to result and advance all. Otherwise, advance the pointer with the **smallest** value. This guarantees O(n) single-pass without extra space.

---

## 4. Approach: Three Pointers — O(n) ✅

```
FUNCTION arraysIntersection(arr1, arr2, arr3):
    i = j = k = 0
    result = []

    WHILE i < len(arr1) AND j < len(arr2) AND k < len(arr3):
        IF arr1[i] == arr2[j] == arr3[k]:
            result.ADD(arr1[i])
            i += 1; j += 1; k += 1
        ELSE IF arr1[i] <= arr2[j] AND arr1[i] <= arr3[k]:
            i += 1
        ELSE IF arr2[j] <= arr3[k]:
            j += 1
        ELSE:
            k += 1

    RETURN result
```

---

## 5. Walkthrough

```
arr1 = [1,2,3,4,5], arr2 = [1,2,5,7,9], arr3 = [1,3,4,5,8]
```

| i | j | k | arr1[i] | arr2[j] | arr3[k] | Action |
|---|---|---|---------|---------|---------|--------|
| 0 | 0 | 0 | 1 | 1 | 1 | All equal → add **1**, advance all |
| 1 | 1 | 1 | 2 | 2 | 3 | 2 < 3 → advance i |
| 2 | 1 | 1 | 3 | 2 | 3 | 2 smallest → advance j |
| 2 | 2 | 1 | 3 | 5 | 3 | 3 < 5 → advance i |
| 3 | 2 | 1 | 4 | 5 | 3 | 3 smallest → advance k |
| 3 | 2 | 2 | 4 | 5 | 4 | 4 < 5 → advance i |
| 4 | 2 | 2 | 5 | 5 | 4 | 4 smallest → advance k |
| 4 | 2 | 3 | 5 | 5 | 5 | All equal → add **5**, advance all |

**Result:** `[1, 5]` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Each pointer advances at most n times |
| Space | O(1) | Output excluded |

---

## 7. Follow-Up Questions

### 7.1 What about k sorted arrays?

Use a min-heap of size k: pop the smallest, advance its pointer. If all k values are equal, add to result. O(n·k log k).

### 7.2 What if arrays aren't sorted?

Sort them first (O(n log n)), then apply the three-pointer technique.

---

## 8. Key Takeaway

> The three-pointer technique on sorted arrays is the natural extension of two-pointer merge. Always advance the pointer pointing to the smallest value, and collect when all pointers agree.
