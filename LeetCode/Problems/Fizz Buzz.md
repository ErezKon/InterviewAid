# 412. Fizz Buzz

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fizz-buzz](https://leetcode.com/problems/fizz-buzz)
**Companies:** Agoda, Amazon, Apple, Bloomberg, Capital One, Cisco, Citadel, Cognizant, Goldman Sachs, Google, Ibm, Jpmorgan, Mastercard, Meta, Microsoft, Nvidia, Paypal, Tcs, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Modulo Check — O(n) ✅](#2-approach-modulo-check--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Return a list where for each `i` from 1 to n: "FizzBuzz" if divisible by 15, "Fizz" if by 3, "Buzz" if by 5, else the number as string.

---

## 2. Approach: Modulo Check — O(n) ✅

```
FUNCTION fizzBuzz(n):
    result = []
    FOR i ← 1 TO n:
        IF i % 15 == 0: result.ADD("FizzBuzz")
        ELSE IF i % 3 == 0: result.ADD("Fizz")
        ELSE IF i % 5 == 0: result.ADD("Buzz")
        ELSE: result.ADD(str(i))
    RETURN result
```

For extensibility (many divisors), use a list of (divisor, word) pairs and concatenate matches.

---

## 3. Key Takeaway

> Check `% 15` first (or build string via concatenation). For extensibility, iterate a mapping of `(divisor → label)` and concatenate matches.
