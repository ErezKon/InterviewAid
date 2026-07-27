# 89. Gray Code

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/gray-code](https://leetcode.com/problems/gray-code)
**Companies:** Amazon, Bloomberg, Google, Ibm, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bit Formula — O(2ⁿ) ✅](#3-approach-bit-formula--o2n-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Return an `n`-bit Gray code sequence where consecutive values differ by exactly one bit, starting from 0.

---

## 2. Key Insight

> The i-th Gray code = `i XOR (i >> 1)`. This directly generates the sequence without backtracking.

---

## 3. Approach: Bit Formula — O(2ⁿ) ✅

```
FUNCTION grayCode(n):
    result = []
    FOR i ← 0 TO 2^n - 1:
        result.ADD(i ^ (i >> 1))
    RETURN result
```

---

## 4. Key Takeaway

> **G(i) = i ⊕ (i >> 1)** — the reflected binary code formula. O(2ⁿ) to generate all values.
