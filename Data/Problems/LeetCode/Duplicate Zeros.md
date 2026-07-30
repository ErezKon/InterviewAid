# 1089. Duplicate Zeros

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/duplicate-zeros](https://leetcode.com/problems/duplicate-zeros)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Two-Pass In-Place](#approach-two-pass-in-place--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a fixed-length array of integers, duplicate every occurrence of zero, shifting remaining elements to the right. Modify the array **in-place** — elements beyond the array length are dropped.

**Constraints:**
- `1 <= arr.length <= 10^4`
- `0 <= arr[i] <= 9`

---

## Examples

```
Input: arr = [1,0,2,3,0,4,5,0]
Output:      [1,0,0,2,3,0,0,4]
Explanation: Zeros at indices 1,4 are duplicated; 5,0 are pushed off the end.

Input: arr = [1,2,3]
Output:      [1,2,3]
Explanation: No zeros, no change.
```

---

## Key Insight

> Process **right to left** to avoid overwriting unprocessed elements. First count zeros to know the total shift. Then place each element at its shifted position. When hitting a zero, place it twice (the duplicate).

---

## Approach: Two-Pass In-Place — O(n) ✅

```
FUNCTION duplicateZeros(arr):
    zeros = arr.count(0)
    n = len(arr)
    FOR i ← n - 1 DOWN TO 0:
        IF i + zeros < n: arr[i + zeros] = arr[i]
        IF arr[i] == 0:
            zeros -= 1
            IF i + zeros < n: arr[i + zeros] = 0
```

---

## Walkthrough

```
arr = [1, 0, 2, 3, 0, 4, 5, 0]
zeros = 3, n = 8

i=7: arr[7]=0 → i+zeros=10≥8 skip; zeros=2; i+zeros=9≥8 skip
i=6: arr[6]=5 → i+zeros=8≥8 skip
i=5: arr[5]=4 → i+zeros=7<8 → arr[7]=4
i=4: arr[4]=0 → i+zeros=6<8 → arr[6]=0; zeros=1; i+zeros=5<8 → arr[5]=0
i=3: arr[3]=3 → i+zeros=4<8 → arr[4]=3
i=2: arr[2]=2 → i+zeros=3<8 → arr[3]=2
i=1: arr[1]=0 → i+zeros=2<8 → arr[2]=0; zeros=0; i+zeros=1<8 → arr[1]=0
i=0: arr[0]=1 → i+zeros=0<8 → arr[0]=1

Result: [1, 0, 0, 2, 3, 0, 0, 4] ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n) |
| **Space** | O(1) — in-place |

---

## Key Takeaway

> **In-place shifting with duplicates → process right-to-left to avoid overwrites. Count the shift offset first, then place elements at their final positions.**
