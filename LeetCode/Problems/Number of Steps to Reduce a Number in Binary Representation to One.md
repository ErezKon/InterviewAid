# 1404. Number of Steps to Reduce a Number in Binary Representation to One

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one](https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one)
**Companies:** Amazon, Geico, General Motors, Google, Grab, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Process from LSB — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a binary string, reduce to "1" using: if even → divide by 2, if odd → add 1. Count the steps.

---

## 2. Key Insight

> Process bits from LSB to MSB with a carry. If current bit (with carry) is odd: add 1 (sets carry) and divide → 2 steps. If even: just divide → 1 step.

---

## 3. Approach: Process from LSB — O(n) ✅

```
FUNCTION numSteps(s):
    steps = 0
    carry = 0

    FOR i ← len(s) - 1 DOWN TO 1:
        bit = int(s[i]) + carry
        IF bit % 2 == 1:    // odd
            carry = 1
            steps += 2    // add 1 (becomes even) + divide by 2
        ELSE:
            steps += 1    // just divide by 2

    RETURN steps + carry    // final carry might add one more step
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Process binary string from right with carry.** Odd bit = 2 steps (add 1 + divide), even bit = 1 step (divide). Handle carry propagation at the end.
