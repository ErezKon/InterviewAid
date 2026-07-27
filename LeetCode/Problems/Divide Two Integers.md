# 29. Divide Two Integers

**Difficulty:** 🟡 Medium
**Acceptance:** 17.0%
**LeetCode:** [https://leetcode.com/problems/divide-two-integers](https://leetcode.com/problems/divide-two-integers)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle, Samsung, Zepto

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Exponential Search (Bit Shifting)](#approach-exponential-search-bit-shifting--olog²n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two integers `dividend` and `divisor`, divide without using multiplication, division, or mod operator. Return the quotient **truncated toward zero**. If the result overflows 32-bit signed integer range, return `2³¹ - 1`.

**Constraints:**
- `-2³¹ <= dividend, divisor <= 2³¹ - 1`
- `divisor != 0`

---

## Examples

```
Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10 / 3 = 3.333... → truncated to 3

Input: dividend = 7, divisor = -2
Output: -3

Input: dividend = -2147483648, divisor = -1
Output: 2147483647  (overflow capped to INT_MAX)
```

---

## Key Insight

> Instead of subtracting the divisor one-by-one (O(n) — too slow for large dividends), **double the divisor using bit shifts** until it's about to exceed the remaining dividend. This is exponential search — each outer iteration removes a power-of-2 multiple of the divisor.

---

## Approach: Exponential Search (Bit Shifting) — O(log²n) ✅

```
FUNCTION divide(dividend, divisor):
    IF dividend == INT_MIN AND divisor == -1:
        RETURN INT_MAX          // overflow

    negative = (dividend < 0) XOR (divisor < 0)
    a = ABS(dividend)
    b = ABS(divisor)
    quotient = 0

    WHILE a >= b:
        temp = b
        multiple = 1
        WHILE a >= temp << 1:
            temp <<= 1
            multiple <<= 1
        a -= temp
        quotient += multiple

    RETURN -quotient IF negative ELSE quotient
```

---

## Walkthrough

```
dividend = 43, divisor = 5

Iteration 1: a=43, b=5
  temp=5, multiple=1 → 5<<1=10≤43 → temp=10, mult=2
  → 10<<1=20≤43 → temp=20, mult=4
  → 20<<1=40≤43 → temp=40, mult=8
  → 40<<1=80>43 → STOP
  a = 43 - 40 = 3, quotient = 0 + 8 = 8

Iteration 2: a=3 < b=5 → STOP

quotient = 8 → 43 ÷ 5 = 8 (remainder 3) ✅
```

Visually — each doubling step:
```
5 → 10 → 20 → 40  (×1, ×2, ×4, ×8)
                ↑ largest ≤ 43, subtract 40
Remainder 3 < 5, done.
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(log²n) | Outer loop O(log n) iterations, inner loop O(log n) doublings |
| **Space** | O(1) | Only a few variables |

---

## Follow-Up Questions

**Q1: Why O(log²n) and not O(log n)?**
> Each outer iteration peels off the largest power-of-2 chunk. The inner loop takes O(log n) to find that chunk. There are at most O(log n) outer iterations (each halves the bits in the quotient).

**Q2: How to handle INT_MIN safely with ABS?**
> `ABS(INT_MIN)` overflows in 32-bit. Work with **long** (64-bit) or handle everything in negatives (negate only when needed).

**Q3: Can you do this in O(log n)?**
> Yes — precompute all doublings of the divisor (d, 2d, 4d, ...) up to the dividend, then greedily subtract from largest to smallest. This is equivalent but avoids redoing the inner loop.

---

## Key Takeaway

> **Bit-shifting doubles the divisor exponentially, making this much faster than linear subtraction. Handle the one overflow case: `INT_MIN / -1`. Classic bit manipulation problem.**
