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

Reduce a number to 0: if even → divide by 2, if odd → subtract 1. Count steps.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `14` | `6` | 14 → 7 → 6 → 3 → 2 → 1 → 0 (6 steps) |
| `8`  | `4` | 8 → 4 → 2 → 1 → 0 (4 steps) |
| `123`| `12`| Sequence: 123→122→61→60→30→15→14→7→6→3→2→1→0 |

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
2. Can you compute the number of steps using bit‑manipulation without explicit simulation?
3. What is the result if the allowed operations are *divide by 3* for multiples of 3 and *subtract 1* otherwise?

---

## 7. Key Takeaway

> **Steps = bits + set bits - 1.** Each 0‑bit costs 1 step (divide), each 1‑bit costs 2 steps (subtract then divide), except the leading 1 costs only 1 (subtract). Or simply simulate.
