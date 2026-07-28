# 1404. Number of Steps to Reduce a Number in Binary Representation to One

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one](https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one)
**Companies:** Amazon, Geico, General Motors, Google, Grab, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a binary string `s` representing a positive integer, repeatedly apply the following operations until the value becomes `1`:
- If the current number is even, divide it by `2` (right‑shift the binary string).
- If the current number is odd, add `1`.
Return the total number of operations performed.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"1101"` | `6` | 13 → 14 (add 1) → 7 (divide) → 8 → 4 → 2 → 1 (6 steps) |
| `"10"` | `1` | 2 → 1 (divide) |

---

## 3. Approach

Process the bits from least‑significant to most‑significant while tracking a carry.

```text
FUNCTION StepsBinary(s):
    SET steps ← 0
    SET carry ← 0
    FOR i ← LENGTH(s) - 1 DOWNTO 1:
        SET bit ← INT(s[i]) + carry
        IF bit % 2 = 1:               // odd after carry
            SET carry ← 1            // adding 1 creates a carry
            SET steps ← steps + 2    // add 1 then divide
        ELSE:
            SET steps ← steps + 1    // just divide
    // handle most‑significant bit
    RETURN steps + carry
```

The loop stops before the most‑significant bit because after processing all lower bits, the remaining value is either `1` (no extra step) or `10` (one extra division).

---

## 4. Walkthrough

For `s = "1101"` (13):

| i (from right) | bit + carry | action | carry after | steps |
|----------------|------------|--------|------------|-------|
| 3 (`1`)        | 1 + 0 = 1  | odd → add+divide | 1 | 2 |
| 2 (`0`)        | 0 + 1 = 1  | odd → add+divide | 1 | 4 |
| 1 (`1`)        | 1 + 1 = 2  | even → divide   | 1 | 5 |
| stop before idx0| carry = 1 | final carry adds one step | – | 6 |

Result matches the example.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) where n = length of the binary string |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

* How would the algorithm change if the input were given as an integer instead of a binary string?
* Can you compute the answer without simulating each bit, using only the count of `1`s and the length of the string?
* What is the effect of using a different base (e.g., ternary) on the step count?

---

## 7. Key Takeaway

> **Process the binary string from right to left with a carry.** An odd bit incurs two operations (add 1 then divide), an even bit incurs one, and the final carry may add one extra step.
