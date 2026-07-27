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

Given two permutations `A` and `B` of `[1..n]`, compute the **prefix common array** `C` where `C[i]` = count of numbers present in both `A[0..i]` and `B[0..i]`.

**Constraints:**
- `1 <= n <= 50`

---

## 2. Examples

```
Example 1:
  Input:  A = [1,3,2,4], B = [3,1,2,4]
  Output: [0,2,3,4]
  Reason: After index 0: A has {1}, B has {3} → 0 common.
          After index 1: A has {1,3}, B has {3,1} → 2 common.
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
