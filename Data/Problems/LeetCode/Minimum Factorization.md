# 625. Minimum Factorization

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-factorization](https://leetcode.com/problems/minimum-factorization)
**Companies:** Tencent
---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given a positive integer num, return *the smallest positive integer *`x`* whose multiplication of each digit equals *`num`. If there is no answer or the answer is not fit in **32-bit** signed integer, return `0`.

**Constraints:**
- `1 <= num <= 2^31 - 1`

---

## Examples

**Example 1:**
```
Input: num = 48
Output: 68
```

**Example 2:**
```
Input: num = 15
Output: 35
```

---

## Approach: Greedy Factor Extraction — O(log n) ✅

```text
FUNCTION smallestFactorization(num):
    IF num = 1: RETURN 1
    digits ← []
    FOR d ← 9 DOWNTO 2:
        WHILE num MOD d = 0:
            digits.APPEND(d)
            num ← num / d
    IF num > 1: RETURN 0    // prime factor > 9
    digits.REVERSE()         // smallest digits first
    result ← CONVERT_DIGITS_TO_INT(digits)
    IF result > 2^31 - 1: RETURN 0
    RETURN result
```

---

## Walkthrough

Consider `num = 48`.

| Step | d | num after division | digits collected |
|------|---|--------------------|-----------------|
| 0 | - | 48 | [] |
| 1 | 9 | 48 (not divisible) | [] |
| 2 | 8 | 48 / 8 = 6 | [8] |
| 3 | 6 | 6 / 6 = 1 | [8,6] |

After loop, `num = 1`. Reverse digits → [6,8]. Resulting integer = 68, the smallest possible.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy factor extraction | **O(log n)** | **O(log n)** |

---

## Key Takeaway

> To minimize a number from digit products, extract the **largest digit factors first** (greedy 9→2), then reverse to form the smallest number.

---