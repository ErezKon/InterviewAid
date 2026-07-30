# 592. Fraction Addition and Subtraction

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fraction-addition-and-subtraction](https://leetcode.com/problems/fraction-addition-and-subtraction)
**Companies:** Google, Ixl, Meta, Trilogy, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Parse + Accumulate — O(n) ✅](#3-approach-parse--accumulate--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a string expression containing fractions separated by `+` or `-`, compute the resulting fraction in its simplest form `a/b`.

**Constraints:**
- `-10⁴ <= numerator, denominator <= 10⁴`
- The expression length ≤ 10⁴ characters.

---

## 2. Examples

| Expression | Output |
|------------|--------|
| "-1/2+1/2" | "0/1" |
| "-1/2+1/2+1/3" | "1/3" |
| "5/3+1/3" | "2/1" |

*Explanation:* The fractions are parsed, summed using a common denominator, and reduced by the greatest common divisor.

---

## 3. Approach: Parse + Accumulate — O(n) ✅

```text
FUNCTION fractionAddition(expression):
    SET num ← 0
    SET den ← 1
    SET i ← 0
    WHILE i < LENGTH(expression):
        // Determine sign
        SET sign ← 1
        IF expression[i] = '-' THEN
            sign ← -1
            i ← i + 1
        ELSE IF expression[i] = '+' THEN
            i ← i + 1
        // Parse numerator
        SET a ← 0
        WHILE i < LENGTH(expression) AND expression[i] IS DIGIT:
            a ← a * 10 + INT(expression[i])
            i ← i + 1
        i ← i + 1 // skip '/'
        // Parse denominator
        SET b ← 0
        WHILE i < LENGTH(expression) AND expression[i] IS DIGIT:
            b ← b * 10 + INT(expression[i])
            i ← i + 1
        // Accumulate
        SET num ← num * b + sign * a * den
        SET den ← den * b
        SET g ← GCD(ABS(num), den)
        SET num ← num / g
        SET den ← den / g
    RETURN STRING(num) + "/" + STRING(den)
```

---

## 4. Walkthrough

Expression: "-1/2+1/2+1/3"
1. Start with `num=0, den=1`.
2. Parse `-1/2`: sign = -1, a=1, b=2 → `num = 0*2 + (-1)*1*1 = -1`, `den = 1*2 = 2`. Reduce → `-1/2`.
3. Parse `+1/2`: sign = 1, a=1, b=2 → `num = -1*2 + 1*1*2 = 0`, `den = 2*2 = 4`. Reduce → `0/1`.
4. Parse `+1/3`: sign = 1, a=1, b=3 → `num = 0*3 + 1*1*1 = 1`, `den = 1*3 = 3`. Reduce → `1/3`.
Result `1/3`.

---

## 5. Complexity Analysis

- **Time:** O(L) where L is the length of the expression (each character processed once).
- **Space:** O(1) extra space besides the input string.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to support mixed numbers (e.g., `1_1/2`)?
- Can you extend the solution to handle very large numerators/denominators using arbitrary‑precision arithmetic?
- What changes are needed to output the result as a mixed fraction instead of an improper fraction?

---

## 7. Key Takeaway

> Parse each fraction, keep a running numerator/denominator pair, and reduce with GCD after every addition to avoid overflow.
