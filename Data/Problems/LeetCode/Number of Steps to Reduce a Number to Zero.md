# 1342. Number of Steps to Reduce a Number to Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero](https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero)
**Companies:** Amazon, Bloomberg, Google, Hrt, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Simulation — O(log n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an integer `num`, return *the number of steps to reduce it to zero*.

In one step, if the current number is even, you have to divide it by `2`, otherwise, you have to subtract `1` from it.

**Constraints:**
- `0 <= num <= 10^6`

---

## 2. Examples

**Example 1:**
```
Input: num = 14
Output: 6
Explanation: Step 1) 14 is even; divide by 2 and obtain 7.
Step 2) 7 is odd; subtract 1 and obtain 6.
Step 3) 6 is even; divide by 2 and obtain 3.
Step 4) 3 is odd; subtract 1 and obtain 2.
Step 5) 2 is even; divide by 2 and obtain 1.
Step 6) 1 is odd; subtract 1 and obtain 0.
```

**Example 2:**
```
Input: num = 8
Output: 4
Explanation: Step 1) 8 is even; divide by 2 and obtain 4.
Step 2) 4 is even; divide by 2 and obtain 2.
Step 3) 2 is even; divide by 2 and obtain 1.
Step 4) 1 is odd; subtract 1 and obtain 0.
```

**Example 3:**
```
Input: num = 123
Output: 12
```

---

## 3. Approach: Simulation — O(log n) ✅

```text
FUNCTION numberOfSteps(num):
    SET steps ← 0
    WHILE num > 0:
        IF num % 2 == 0:
            SET num ← num / 2
        ELSE:
            SET num ← num - 1
        SET steps ← steps + 1
    RETURN steps
```

---

## 4. Walkthrough

**Example:** `num = 14`

| Step | num (before) | Operation | num (after) | steps |
|------|--------------|-----------|-------------|-------|
| 1    | 14           | even → /2 | 7           | 1 |
| 2    | 7            | odd → -1  | 6           | 2 |
| 3    | 6            | even → /2 | 3           | 3 |
| 4    | 3            | odd → -1  | 2           | 4 |
| 5    | 2            | even → /2 | 1           | 5 |
| 6    | 1            | odd → -1  | 0           | 6 |

The loop terminates when `num` becomes 0, yielding a total of 6 steps.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would the solution change if the operation for odd numbers were to add 1 instead of subtract 1?
2. Can you compute the number of steps using bit-manipulation without explicit simulation?
3. What is the result if the allowed operations are *divide by 3* for multiples of 3 and *subtract 1* otherwise?

---

## 7. Key Takeaway

> **Steps = bits + set bits - 1.** Each 0-bit costs 1 step (divide), each 1-bit costs 2 steps (subtract then divide), except the leading 1 costs only 1 (subtract). Or simply simulate.
