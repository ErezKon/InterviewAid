# 1342. Number of Steps to Reduce a Number to Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero](https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero)
**Companies:** Amazon, Bloomberg, Google, Hrt, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Simulation — O(log n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Reduce a number to 0: if even → divide by 2, if odd → subtract 1. Count steps.

---

## 2. Approach: Simulation — O(log n) ✅

```
FUNCTION numberOfSteps(num):
    steps = 0
    WHILE num > 0:
        IF num % 2 == 0: num /= 2
        ELSE: num -= 1
        steps += 1
    RETURN steps
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Steps = bits + set bits - 1.** Each 0-bit costs 1 step (divide), each 1-bit costs 2 steps (subtract then divide), except the leading 1 costs only 1 (subtract). Or simply simulate.
