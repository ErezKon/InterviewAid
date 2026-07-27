# 1835. Find XOR Sum of All Pairs Bitwise AND

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-xor-sum-of-all-pairs-bitwise-and](https://leetcode.com/problems/find-xor-sum-of-all-pairs-bitwise-and)
**Companies:** Mobisy

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Math Property — O(n + m) ✅](#3-approach-math-property--on--m-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given arrays `arr1` and `arr2`, compute the XOR of `(arr1[i] & arr2[j])` for all pairs `(i, j)`.

**Constraints:**
- `1 <= n, m <= 10⁵`

---

## 2. Key Insight

> Distributive property: `XOR of all (a & b)` = `(XOR of all a) & (XOR of all b)`. Wait — actually the correct identity is: `XOR_{i,j} (arr1[i] & arr2[j]) = (XOR of arr1) & (XOR of arr2)` when one array has odd length, but the general identity is more nuanced. The correct formula: for each bit, the XOR result depends on parity of counts.

> The key identity: `XOR_{j} (a & arr2[j]) = a & XOR(arr2)`. Then `XOR_{i} (arr1[i] & XOR(arr2)) = XOR(arr1) & XOR(arr2)`.

---

## 3. Approach: Math Property — O(n + m) ✅

```
FUNCTION getXORSum(arr1, arr2):
    xor1 ← XOR of all elements in arr1
    xor2 ← XOR of all elements in arr2
    RETURN xor1 & xor2
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + m) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **XOR distributes over AND across pairwise operations**: `XOR_{i,j}(a_i & b_j) = (XOR a_i) & (XOR b_j)`. This reduces O(n·m) to O(n+m).
