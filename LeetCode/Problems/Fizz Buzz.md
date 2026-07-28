# 412. Fizz Buzz

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fizz-buzz](https://leetcode.com/problems/fizz-buzz)
**Companies:** Agoda, Amazon, Apple, Bloomberg, Capital One, Cisco, Citadel, Cognizant, Goldman Sachs, Google, Ibm, Jpmorgan, Mastercard, Meta, Microsoft, Nvidia, Paypal, Tcs, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Modulo Check — O(n) ✅](#3-approach-modulo-check--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Return a list where for each `i` from 1 to n: "FizzBuzz" if divisible by 15, "Fizz" if by 3, "Buzz" if by 5, else the number as string.

---

## 2. Examples

**Example 1**
```
Input: n = 3
Output: ["1","2","Fizz"]
```
**Example 2**
```
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
```
**Example 3**
```
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```
---

## 3. Approach: Modulo Check — O(n) ✅

```text
FUNCTION fizzBuzz(n):
    SET result ← []
    FOR i ← 1 TO n:
        IF i % 15 == 0:
            APPEND "FizzBuzz" TO result
        ELSE IF i % 3 == 0:
            APPEND "Fizz" TO result
        ELSE IF i % 5 == 0:
            APPEND "Buzz" TO result
        ELSE:
            APPEND STRING(i) TO result
    RETURN result
```
---

## 4. Walkthrough

| i | Condition | Output |
|---|-----------|--------|
| 1 | not %3, not %5 | "1" |
| 2 | not %3, not %5 | "2" |
| 3 | %3 only | "Fizz" |
| 4 | none | "4" |
| 5 | %5 only | "Buzz" |
| … | … | … |
The loop checks the most specific condition (`%15`) first, then falls back.
---

## 5. Complexity Analysis

The algorithm iterates `n` times with constant work per iteration. **Time:** O(n). **Space:** O(n) for the output list.
---

## 6. Follow-Up Questions

1. How would you modify the solution to support custom divisor‑label pairs?
2. Can you generate the sequence lazily using an iterator/generator?
3. How would you handle very large `n` where storing the full list is infeasible?
---

## 7. Key Takeaway

> Checking the most specific divisor (`%15`) first simplifies the logic; the pattern scales to arbitrary divisor‑label mappings.
