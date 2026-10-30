# 2657. Find the Prefix Common Array of Two Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays](https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Set Tracking — O(n) ✅](#4-approach-set-tracking--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

You are given two **0-indexed **integer** **permutations `A` and `B` of length `n`.

A **prefix common array** of `A` and `B` is an array `C` such that `C[i]` is equal to the count of numbers that are present at or before the index `i` in both `A` and `B`.

Return *the **prefix common array** of *`A`* and *`B`.

A sequence of `n` integers is called a **permutation** if it contains all integers from `1` to `n` exactly once.

**Constraints:**
- `1 <= A.length == B.length == n <= 50`
- `1 <= A[i], B[i] <= n`
- `It is guaranteed that A and B are both a permutation of n integers.`

---

## 2. Examples

**Example 1:**
```
Input: A = [1,3,2,4], B = [3,1,2,4]
Output: [0,2,3,4]
Explanation: At i = 0: no number is common, so C[0] = 0.
At i = 1: 1 and 3 are common in A and B, so C[1] = 2.
At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.
At i = 3: 1, 2, 3, and 4 are common in A and B, so C[3] = 4.
```

**Example 2:**
```
Input: A = [2,3,1], B = [3,1,2]
Output: [0,1,3]
Explanation: At i = 0: no number is common, so C[0] = 0.
At i = 1: only 3 is common in A and B, so C[1] = 1.
At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.
```

---

## 3. Key Insight

> Add A[i] and B[i] to a shared set. A number becomes "common" the moment it appears in both — i.e., when adding it, it's already in the set (from the other array).

---

## 4. Approach: Set Tracking — O(n) ✅

```
FUNCTION findThePrefixCommonArray(A, B):
    seen = set()
    result = []
    common = 0

    FOR i ← 0 TO n - 1:
        IF A[i] IN seen: common += 1
        seen.ADD(A[i])
        IF B[i] IN seen: common += 1
        seen.ADD(B[i])
        result.ADD(common)

    RETURN result
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(n) — set |

---

## 6. Key Takeaway

> When adding to a shared set, if the element is already present, it means both arrays have seen it — increment common count. Clean O(n) single-pass solution.
