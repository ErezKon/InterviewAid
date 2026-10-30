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

The **XOR sum** of a list is the bitwise `XOR` of all its elements. If the list only contains one element, then its **XOR sum** will be equal to this element.

- For example, the **XOR sum** of `[1,2,3,4]` is equal to `1 XOR 2 XOR 3 XOR 4 = 4`, and the **XOR sum** of `[3]` is equal to `3`.

You are given two **0-indexed** arrays `arr1` and `arr2` that consist only of non-negative integers.

Consider the list containing the result of `arr1[i] AND arr2[j]` (bitwise `AND`) for every `(i, j)` pair where `0 <= i < arr1.length` and `0 <= j < arr2.length`.

Return *the **XOR sum** of the aforementioned list*.

**Constraints:**
- `1 <= arr1.length, arr2.length <= 10^5`
- `0 <= arr1[i], arr2[j] <= 10^9`

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
Input: arr1 = [1,2,3], arr2 = [6,5]
Output: 0
Explanation: The list = [1 AND 6, 1 AND 5, 2 AND 6, 2 AND 5, 3 AND 6, 3 AND 5] = [0,1,2,0,2,1].
The XOR sum = 0 XOR 1 XOR 2 XOR 0 XOR 2 XOR 1 = 0.
```

**Example 2:**
```
Input: arr1 = [12], arr2 = [4]
Output: 4
Explanation: The list = [12 AND 4] = [4]. The XOR sum = 4.
```

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
