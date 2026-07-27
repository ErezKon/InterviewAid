# 3514. Number of Unique XOR Triplets II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-unique-xor-triplets-ii](https://leetcode.com/problems/number-of-unique-xor-triplets-ii)
**Companies:** Meesho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Optimized Pair XOR + Sweep](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count unique XOR values from all triplets — harder variant with tighter constraints requiring optimization beyond O(n²·n).

---

## 2. Key Insight

> Exploit XOR properties and bit constraints. The set of achievable pair XORs often has structure (e.g., linear basis) that limits the space of triplet XORs.

---

## 3. Approach: Optimized Pair XOR + Sweep ✅

```
// Build linear basis from all pair XORs
// The span of the basis determines achievable triplet XOR values
// Count unique values in the span XORed with each element
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n² + 2^B · n) where B = basis size ≤ 20 |
| **Space** | O(2^B) |

---

## 5. Key Takeaway

> **Linear basis reduces XOR set size.** Pair XORs form a vector space. Enumerate basis span instead of all pairs for efficiency.
