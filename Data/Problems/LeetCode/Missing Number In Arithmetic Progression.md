# 1228. Missing Number In Arithmetic Progression

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/missing-number-in-arithmetic-progression](https://leetcode.com/problems/missing-number-in-arithmetic-progression)
**Companies:** Amazon, Audible

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Expected Diff — O(n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

In some array `arr`, the values were in arithmetic progression: the values `arr[i + 1] - arr[i]` are all equal for every `0 <= i < arr.length - 1`.

A value from `arr` was removed that **was not the first or last value in the array**.

Given `arr`, return *the removed value*.

**Constraints:**
- `3 <= arr.length <= 1000`
- `0 <= arr[i] <= 10^5`
- The given array is **guaranteed** to be a valid array.

---

## 2. Examples

**Example 1:**
```
Input: arr = [5,7,11,13]
Output: 9
Explanation: The previous array was [5,7,9,11,13].
```

**Example 2:**
```
Input: arr = [15,13,12]
Output: 14
Explanation: The previous array was [15,14,13,12].
```

---

## 3. Key Insight

> The true common difference = `(arr[-1] - arr[0]) / n`. Scan for where `arr[i+1] - arr[i] != diff`.

---

## 4. Approach: Expected Diff — O(n) ✅

```text
FUNCTION missingNumber(arr):
    n ← LENGTH(arr)
    diff ← (arr[n-1] - arr[0]) / n
    FOR i ← 0 TO n-2:
        IF arr[i+1] - arr[i] != diff:
            RETURN arr[i] + diff
    RETURN arr[0]  // fallback (should not occur)
```

---

## 5. Walkthrough

Consider `arr = [1,3,5,9,11]`.
1. `n = 5`, `diff = (11-1)/5 = 2`.
2. Iterate:
   - i=0: 3-1 = 2 (ok)
   - i=1: 5-3 = 2 (ok)
   - i=2: 9-5 = 4 ≠ 2 → missing = 5 + 2 = 7.
3. Return 7.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would you handle unsorted input?
2. Can you solve it in O(log n) using binary search?
3. What if multiple numbers are missing?

---

## 8. Key Takeaway

> **Compute expected difference, find the gap.** The true diff = `(last - first) / n`. The position where consecutive diff ≠ expected diff contains the missing element.
