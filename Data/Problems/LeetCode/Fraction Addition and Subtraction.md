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

Given a string `expression` representing an expression of fraction addition and subtraction, return the calculation result in string format.

The final result should be an irreducible fraction. If your final result is an integer, change it to the format of a fraction that has a denominator `1`. So in this case, `2` should be converted to `2/1`.

**Constraints:**
- The input string only contains `'0'` to `'9'`, `'/'`, `'+'` and `'-'`. So does the output.
- Each fraction (input and output) has the format `±numerator/denominator`. If the first input fraction or the output is positive, then `'+'` will be omitted.
- The input only contains valid **irreducible fractions**, where the **numerator** and **denominator** of each fraction will always be in the range `[1, 10]`. If the denominator is `1`, it means this fraction is actually an integer in a fraction format defined above.
- The number of given fractions will be in the range `[1, 10]`.
- The numerator and denominator of the **final result** are guaranteed to be valid and in the range of **32-bit** int.

---

## 2. Examples

**Example 1:**
```
Input: expression = "-1/2+1/2"
Output: "0/1"
```

**Example 2:**
```
Input: expression = "-1/2+1/2+1/3"
Output: "1/3"
```

**Example 3:**
```
Input: expression = "1/3-1/2"
Output: "-1/6"
```

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
- Can you extend the solution to handle very large numerators/denominators using arbitrary-precision arithmetic?
- What changes are needed to output the result as a mixed fraction instead of an improper fraction?

---

## 7. Key Takeaway

> Parse each fraction, keep a running numerator/denominator pair, and reduce with GCD after every addition to avoid overflow.
