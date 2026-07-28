# 89. Gray Code

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/gray-code](https://leetcode.com/problems/gray-code)
**Companies:** Amazon, Bloomberg, Google, Ibm, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bit Formula — O(2ⁿ) ✅](#3-approach-bit-formula--o2n-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Return an `n`-bit Gray code sequence where consecutive values differ by exactly one bit, starting from 0.

---

## 2. Key Insight

> The i-th Gray code = `i XOR (i >> 1)`. This directly generates the sequence without backtracking.

---

## 3. Approach: Bit Formula — O(2ⁿ) ✅

```text
FUNCTION grayCode(n):
    result ← []
    FOR i ← 0 TO (2^n) - 1:
        APPEND result WITH (i XOR (i RIGHT_SHIFT 1))
    RETURN result
```

---

## 4. Examples

| n | Output |
|---|--------|
| 0 | `[0]` |
| 1 | `[0,1]` |
| 2 | `[0,1,3,2]` |
| 3 | `[0,1,3,2,6,7,5,4]` |

---

## 5. Walkthrough

For `n = 2`:

1. `i = 0`: `0 XOR (0>>1) = 0` → `0`
2. `i = 1`: `1 XOR (1>>1) = 1 XOR 0 = 1` → `1`
3. `i = 2`: `2 XOR (2>>1) = 2 XOR 1 = 3` → `3`
4. `i = 3`: `3 XOR (3>>1) = 3 XOR 1 = 2` → `2`

Resulting sequence: `[0,1,3,2]`. Each adjacent pair differs by one bit.

---

## 6. Complexity Analysis

- **Time:** `O(2ⁿ)` – we generate all `2ⁿ` codes.
- **Space:** `O(2ⁿ)` – to store the resulting list.

---

## Key Takeaway

> **G(i) = i ⊕ (i >> 1)** — the reflected binary code formula. O(2ⁿ) to generate all values.
