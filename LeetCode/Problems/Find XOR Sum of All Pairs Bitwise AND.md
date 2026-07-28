# 1835. Find XOR Sum of All Pairs Bitwise AND

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-xor-sum-of-all-pairs-bitwise-and](https://leetcode.com/problems/find-xor-sum-of-all-pairs-bitwise-and)
**Companies:** Mobisy

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Math Property — O(n + m) ✅](#3-approach-math-property)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given arrays `arr1` and `arr2`, compute the XOR of `(arr1[i] & arr2[j])` for all pairs `(i, j)`.

**Constraints:**
- `1 <= n, m <= 10⁵`

---

## 2. Key Insight

> Distributive property: `XOR_{i,j} (arr1[i] & arr2[j]) = (XOR of arr1) & (XOR of arr2)`. This follows because for each bit, the XOR of all pairwise ANDs depends only on the parity of set bits in each array.

---

## 3. Approach: Math Property — O(n + m) ✅

```text
FUNCTION getXORSum(arr1, arr2):
    xor1 ← 0
    FOR val IN arr1 DO
        xor1 ← xor1 XOR val
    END FOR
    xor2 ← 0
    FOR val IN arr2 DO
        xor2 ← xor2 XOR val
    END FOR
    RETURN xor1 AND xor2
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + m) |
| **Space** | O(1) |

---

## 5. Examples

**Example 1:**
```
arr1 = [1,2]
arr2 = [3,4]
```
- XOR of `arr1` = `1 XOR 2 = 3`
- XOR of `arr2` = `3 XOR 4 = 7`
- Result = `3 AND 7 = 3`

**Example 2:**
```
arr1 = [5]
arr2 = [6,7]
```
- XOR of `arr1` = `5`
- XOR of `arr2` = `6 XOR 7 = 1`
- Result = `5 AND 1 = 1`

---

## 6. Walkthrough

Take Example 1 step‑by‑step:
1. Compute `xor1`:
   - Start `0`, XOR 1 → `1`
   - XOR 2 → `1 XOR 2 = 3`
2. Compute `xor2`:
   - Start `0`, XOR 3 → `3`
   - XOR 4 → `3 XOR 4 = 7`
3. Final answer: `3 AND 7 = 3`
The same process applies to any sized arrays, yielding the result in linear time.

---

## 7. Follow-Up Questions
- How would the solution change if the operation were OR instead of AND?
- Can you extend the identity to three arrays, i.e., XOR of `(a & b & c)`?
- What if the arrays contain up to `10⁶` elements—does the O(1) space still hold?

---

## 8. Key Takeaway

> **XOR distributes over AND across pairwise operations**: `XOR_{i,j}(a_i & b_j) = (XOR a_i) & (XOR b_j)`. This reduces a naïve O(n·m) problem to a simple O(n+m) scan.
