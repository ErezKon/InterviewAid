# 2939. Maximum Xor Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-xor-product](https://leetcode.com/problems/maximum-xor-product)
**Companies:** Atlassian, Google, Rippling, Squarepoint Capital

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given three integers `a`, `b`, and `n`, find a value `x` (where `0 ≤ x < 2^n`) that maximizes `(a XOR x) * (b XOR x)`. Return the result modulo `10⁹ + 7`.

**Constraints:**
- `0 ≤ a, b < 2⁵⁰`
- `0 ≤ n ≤ 50`

---

## Examples

**Example 1:**
```
Input:  a = 12, b = 5, n = 4
Output: 98
Explanation: x=2, (12^2)*(5^2) = 14*7 = 98.
```

**Example 2:**
```
Input:  a = 6, b = 7, n = 5
Output: 930
```

---

## Key Insight

> For a fixed sum `S = (a^x) + (b^x)`, the product is maximized when the two values are as **balanced** (close to each other) as possible (AM-GM inequality). For bits ≥ n, we can't change them. For bits 0 to n-1, we choose `x`'s bit to either make both results have that bit set (same original bits) or assign the set bit to whichever value is currently smaller (different original bits).

---

## Approach

```
FUNCTION maximumXorProduct(a, b, n):
    MOD ← 10⁹ + 7
    
    // For bits 0..n-1, choose x's bit to maximize (a^x)*(b^x)
    // Greedy: balance the two values as much as possible
    FOR bit ← n - 1 DOWN TO 0 DO
        bitA ← (a >> bit) AND 1
        bitB ← (b >> bit) AND 1
        IF bitA = bitB THEN
            // Both same → set x bit so both become 1
            a ← a OR (1 << bit)
            b ← b OR (1 << bit)
        ELSE
            // Different → give the 1 to the smaller value
            IF a < b THEN
                a ← a OR (1 << bit)
                b ← b AND NOT (1 << bit)
            ELSE
                b ← b OR (1 << bit)
                a ← a AND NOT (1 << bit)
    
    RETURN (a MOD MOD) * (b MOD MOD) MOD MOD
```

---

## Walkthrough

```
a = 12 (1100), b = 5 (0101), n = 4

bit 3: bitA=1, bitB=0 (different). a=12 > b=5 → give to b.
       b |= 8 → b=13, a &= ~8 → a=4.  a=0100, b=1101

bit 2: bitA=1, bitB=1 (same). Set both to 1.
       a |= 4=4, b |= 4=13.  No change. a=0100, b=1101

bit 1: bitA=0, bitB=0 (same). Set both to 1.
       a |= 2 → a=6, b |= 2 → b=15.  a=0110, b=1111

bit 0: bitA=0, bitB=1 (different). a=6 < b=15 → give to a.
       a |= 1 → a=7, b &= ~1 → b=14.  a=0111, b=1110

Result: 7 * 14 = 98 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy bit-by-bit | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. **Why process from MSB to LSB?** Higher bits have more impact on the magnitude. By balancing from the top, we ensure optimal distribution.
2. **Why does balancing maximize the product?** For fixed sum `S`, the product `p * q` where `p + q = S` is maximized when `|p - q|` is minimized (AM-GM).
3. **Why mod only at the end?** We need the exact values of `a` and `b` during the greedy comparison. Modding early would corrupt the comparison.

---

## Key Takeaway

> **Balance two values bit-by-bit** to maximize their product — when bits agree, set both to 1; when they differ, assign the set bit to the smaller value. A greedy application of the AM-GM inequality at the bit level.

---
