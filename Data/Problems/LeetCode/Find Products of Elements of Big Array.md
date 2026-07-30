# 3145. Find Products of Elements of Big Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-products-of-elements-of-big-array](https://leetcode.com/problems/find-products-of-elements-of-big-array)
**Companies:** Ibm

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search + Bit Counting + Modular Exponentiation ✅](#4-approach-binary-search--bit-counting--modular-exponentiation-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

The **powerful array** of a positive integer `x` is the sorted array of powers of 2 that sum to `x` (i.e., the set bits). The **big array** is formed by concatenating the powerful arrays of `1, 2, 3, ...` in order.

Given queries `[from_i, to_i, mod_i]`, for each query compute the **product** of elements in the big array from index `from_i` to `to_i` (1-indexed), modulo `mod_i`.

**Constraints:**
- `1 <= queries.length <= 500`
- `1 <= from_i <= to_i <= 10¹⁵`
- `1 <= mod_i <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input:  queries = [[1, 3, 7]]
  Big array: [1] ++ [2] ++ [1, 2] ++ [4] ++ ...
           = [1, 2, 1, 2, 4, 1, 4, 2, 4, 1, 2, 4, ...]
  Elements [1..3] = [1, 2, 1]
  Product = 1 * 2 * 1 = 2
  Output: [2 % 7] = [2]

Example 2:
  Input:  queries = [[2, 5, 3]]
  Elements [2..5] = [2, 1, 2, 4]
  Product = 2 * 1 * 2 * 4 = 16
  Output: [16 % 3] = [1]
```

---

## 3. Key Insight

> Each element in the big array is a **power of 2**. So the product of a range equals `2^(sum of exponents)`. The problem reduces to: find the **sum of bit positions** across a range of the big array, then compute `2^S mod m` using fast exponentiation.

Use **binary search** to map a big-array index to which number's powerful array it falls in, and count total set bits (with their positions) using prefix counts.

---

## 4. Approach: Binary Search + Bit Counting + Modular Exponentiation ✅

```
FUNCTION countBitsUpTo(x):
    // Count total number of set bits across all numbers 1..x
    // (Standard digit DP / bit-counting formula)

FUNCTION sumExponentsUpTo(idx):
    // Binary search to find which number n the idx-th element
    // belongs to, then sum all bit-position exponents from
    // the start of the big array up to idx

FUNCTION solve(queries):
    results ← []
    FOR [from, to, mod] IN queries DO
        totalExp ← sumExponentsUpTo(to) - sumExponentsUpTo(from - 1)
        results.ADD(POWER(2, totalExp, mod))
    RETURN results
```

The key helper uses the fact that for numbers `1..n`:
- Bit position `k` appears `floor((n+1)/2^(k+1)) * 2^k + max(0, (n+1) mod 2^(k+1) - 2^k)` times.

---

## 5. Walkthrough

```
Big array construction:
  1 = 2⁰         → [1]         (exponents: [0])
  2 = 2¹         → [2]         (exponents: [1])
  3 = 2⁰ + 2¹   → [1, 2]      (exponents: [0, 1])
  4 = 2²         → [4]         (exponents: [2])

Big array: [1, 2, 1, 2, 4, ...]
Exponents: [0, 1, 0, 1, 2, ...]

Query [1,3,7]:
  Exponents at positions 1..3: [0, 1, 0]
  Sum = 0 + 1 + 0 = 1
  Product = 2¹ = 2
  2 mod 7 = 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(Q · log²(max_idx)) — binary search × bit enumeration per query |
| **Space** | O(1) per query |

---

## 7. Follow-Up Questions

### 7.1 Why can we reduce product to sum of exponents?

Every element is a power of 2, so `∏ 2^eᵢ = 2^(Σeᵢ)`. This converts multiplication into addition.

### 7.2 How does the binary search work?

For a given big-array index, binary search on the number `n` such that the total count of set bits in `1..n` ≥ the index. This tells you which number's powerful array contains that index.

### 7.3 Why is modular exponentiation needed?

The sum of exponents can be enormous (up to ~10¹⁵), so `2^S mod m` must use fast modular exponentiation to avoid overflow.

---

## 8. Key Takeaway

> **Reduce product of powers-of-2 to sum of exponents**, then use binary search + digit DP to efficiently compute prefix sums over the "big array" structure. This combines bit manipulation, binary search, and modular arithmetic.
