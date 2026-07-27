# 592. Fraction Addition and Subtraction

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fraction-addition-and-subtraction](https://leetcode.com/problems/fraction-addition-and-subtraction)
**Companies:** Google, Ixl, Meta, Trilogy, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Parse + Accumulate — O(n) ✅](#2-approach-parse--accumulate--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a string expression of fractions with `+` and `-`, compute the result as an irreducible fraction `a/b`.

---

## 2. Approach: Parse + Accumulate — O(n) ✅

```
FUNCTION fractionAddition(expression):
    // Parse fractions, accumulate result
    num = 0; den = 1

    FOR each fraction a/b in expression:
        num = num * b + a * den
        den = den * b
        g = GCD(ABS(num), den)
        num /= g; den /= g

    RETURN f"{num}/{den}"
```

---

## 3. Key Takeaway

> Parse fractions, accumulate via `a/b + c/d = (a*d + c*b) / (b*d)`, reduce by GCD after each step to avoid overflow.
