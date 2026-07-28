# 2348. Number of Zero-Filled Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-zero-filled-subarrays](https://leetcode.com/problems/number-of-zero-filled-subarrays)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Count Consecutive Zeros — O(n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Count subarrays filled entirely with zeros.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| [0,0,0,2,0,0] | 9 | Zero runs: lengths 3 → 3·4/2=6, length 2 → 2·3/2=3, total 9 |
| [1,2,3] | 0 | No zero elements, no subarrays |

---

## 3. Key Insight

> A run of `k` consecutive zeros contributes `k*(k+1)/2` subarrays. Incrementally add `consecutive` at each zero.

---

## 4. Approach: Count Consecutive Zeros — O(n) ✅

```text
FUNCTION zeroFilledSubarray(nums):
    count ← 0
    consecutive ← 0
    FOR num IN nums:
        IF num == 0:
            consecutive ← consecutive + 1
            count ← count + consecutive
        ELSE:
            consecutive ← 0
    RETURN count
```

---

## 5. Walkthrough

Array: [0,0,0,2,0,0]

1. idx0: zero → consecutive=1, count=1
2. idx1: zero → consecutive=2, count=3
3. idx2: zero → consecutive=3, count=6
4. idx3: 2 → consecutive=0
5. idx4: zero → consecutive=1, count=7
6. idx5: zero → consecutive=2, count=9
Result 9 matches the sum of subarrays from each zero run.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Running count for consecutive elements.** Each new zero extends all subarrays ending here. Same pattern as "Number of Substrings With Only 1s".
