# 2629. Function Composition

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/function-composition](https://leetcode.com/problems/function-composition)
**Companies:** Amazon, Google, Meta, Microsoft, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Right-to-Left Apply — O(n) ✅](#2-approach-right-to-left-apply--on-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an array of functions `[f1, f2, f3, ..., fn]`, return a new function `fn` that is the **function composition** of the array of functions.

The **function composition** of `[f(x), g(x), h(x)]` is `fn(x) = f(g(h(x)))`.

The **function composition** of an empty list of functions is the **identity function** `f(x) = x`.

You may assume each function in the array accepts one integer as input and returns one integer as output. (JavaScript problem)

**Constraints:**
- `-1000 <= x <= 1000`
- `0 <= functions.length <= 1000`
- all functions accept and return a single integer

**Official examples:** `functions = [x => x + 1, x => x * x, x => 2 * x], x = 4` → `65` (evaluated right to left: 2 * 4 = 8, 8 * 8 = 64, 64 + 1 = 65); `functions = [x => 10 * x, x => 10 * x, x => 10 * x], x = 1` → `1000`; `functions = [], x = 42` → `42`.

---

## 2. Approach: Right-to-Left Apply — O(n) ✅

```text
// Compose functions by applying them from right to left

FUNCTION compose(functions):
    RETURN FUNCTION(x):
        SET result ← x
        FOR i ← LENGTH(functions) - 1 DOWNTO 0 DO
            SET result ← functions[i](result)
        RETURN result
```

---

## 3. Examples

**Example 1:**
```
functions = [x => x + 1, x => x * 2]
compose(functions)(5) // ((5 * 2) + 1) = 11
```
*Result:* `11`

**Example 2:**
```
functions = [x => x * x, x => x + 3]
compose(functions)(2) // (2 + 3)^2 = 25
```
*Result:* `25`

---

## 4. Walkthrough

Take Example 1:
1. Start with input `5`.
2. Apply the rightmost function `x => x * 2` → `10`.
3. Apply the next function `x => x + 1` → `11`.
4. Return `11`.

---

## 5. Complexity Analysis

- **Time:** O(n) – each function is applied once.
- **Space:** O(1) – only a few variables are used besides the input array.

---

## 6. Key Takeaway

> Function composition applies functions right-to-left. Use `reduceRight` or reverse iteration.
