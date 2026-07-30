# 3514. Number of Unique XOR Triplets II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-unique-xor-triplets-ii](https://leetcode.com/problems/number-of-unique-xor-triplets-ii)
**Companies:** Meesho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Optimized Pair XOR + Sweep](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Count unique XOR values from all triplets — harder variant with tighter constraints requiring optimization beyond O(n²·n).

---

## 2. Key Insight

> Exploit XOR properties and bit constraints. The set of achievable pair XORs often has structure (e.g., linear basis) that limits the space of triplet XORs.

---

## 3. Approach: Optimized Pair XOR + Sweep ✅

```text
// Build linear basis from all pair XORs
// The span of the basis determines achievable triplet XOR values
// Count unique values in the span XORed with each element
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: 4
Explanation: The possible triplet XORs are 1⊕2⊕3 = 0, 1⊕1⊕2 = 2, 1⊕1⊕3 = 3, 2⊕2⊕3 = 3. Unique values are {0,2,3,4} → 4.
```

**Example 2:**
```
Input: nums = [5,5,5,5]
Output: 1
Explanation: All triplets produce the same XOR value 5⊕5⊕5 = 5.
```

---

## 5. Walkthrough

Consider the first example `[1,2,3]`.
| Step | Action | Pair XOR Basis | Triplet XORs |
|------|--------|----------------|--------------|
| 1 | Compute all pair XORs: 1⊕2=3, 1⊕3=2, 2⊕3=1 | Basis = {1,2,3} (full rank) | — |
| 2 | For each element, XOR with span of basis:
- With 1: {1⊕b | b∈{0,1,2,3}} = {1,0,3,2}
- With 2: {2⊕b} = {2,3,0,1}
- With 3: {3⊕b} = {3,2,1,0} |
| 3 | Union of all results = {0,1,2,3,4} (4 unique values) |

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n² + 2^B · n) where B = basis size ≤ 20 |
| **Space** | O(2^B) |

---

## 7. Follow-Up Questions

1. How would the solution change if the array size could be up to 10⁵?
2. Can the approach be adapted to count distinct XOR values for quadruplets?
3. What if the numbers are limited to 30‑bit integers – does the basis size bound improve?

---

## 8. Key Takeaway

> **Linear basis reduces XOR set size.** Pair XORs form a vector space. Enumerate basis span instead of all pairs for efficiency.
