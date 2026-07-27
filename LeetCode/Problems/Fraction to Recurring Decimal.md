# 166. Fraction to Recurring Decimal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fraction-to-recurring-decimal](https://leetcode.com/problems/fraction-to-recurring-decimal)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Ixl, Meta, Microsoft, Oracle, Snapchat, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Long Division + Hash Map — O(denominator) ✅](#3-approach-long-division--hash-map--odenominator-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given two integers `numerator` and `denominator`, return the fraction as a string. If the fractional part repeats, enclose the repeating part in parentheses.

---

## 2. Key Insight

> Track remainders during long division. A repeating decimal cycle begins when a remainder recurs. Map each remainder to its position in the result string to insert parentheses.

---

## 3. Approach: Long Division + Hash Map — O(denominator) ✅

```
FUNCTION fractionToDecimal(numerator, denominator):
    IF numerator == 0: RETURN "0"

    result = ""
    IF (numerator < 0) XOR (denominator < 0):
        result += "-"

    num = ABS(numerator)
    den = ABS(denominator)
    result += str(num / den)
    remainder = num % den

    IF remainder == 0: RETURN result
    result += "."

    remainderMap = {}
    WHILE remainder != 0:
        IF remainder IN remainderMap:
            result = result[:remainderMap[remainder]] + "(" + result[remainderMap[remainder]:] + ")"
            RETURN result
        remainderMap[remainder] = len(result)
        remainder *= 10
        result += str(remainder / den)
        remainder %= den

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(denominator) — cycle length bounded by denominator |
| **Space** | O(denominator) — remainder map |

---

## 5. Key Takeaway

> **Long division simulation** with remainder tracking. When a remainder repeats, we've found the cycle — wrap it in parentheses. Handle sign and zero cases.
