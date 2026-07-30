# 2520. Count the Digits That Divide a Number

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Tcs

---

## Problem Description

Given an integer `num`, return the count of digits in `num` that divide `num` evenly.

---

## Examples

**Example 1:**
```
Input: num = 7
Output: 1
Explanation: The only digit is 7, and 7 % 7 == 0.
```

**Example 2:**
```
Input: num = 121
Output: 3
Explanation: Digits are 1, 2, 1. Both 1s divide 121, and 2 also divides 121 (121 % 2 == 1? actually 121 % 2 = 1, so not). Wait correct: 121 % 2 != 0, so only the two 1s count → Output 2. Let's correct.
```

**Correct Example 2:**
```
Input: num = 1248
Output: 4
Explanation: Digits 1,2,4,8 all divide 1248.
```

---

## Approach

```text
FUNCTION countDivisibleDigits(num):
    SET count ← 0
    SET n ← num
    WHILE n > 0:
        SET digit ← n MOD 10
        IF digit != 0 AND num MOD digit == 0:
            SET count ← count + 1
        SET n ← n DIV 10
    RETURN count
```

---

## Walkthrough

**Using Example 3 (num = 1248)**
| Step | n (remaining) | digit | condition `num % digit == 0`? | count |
|------|---------------|-------|--------------------------------|-------|
| 1 | 1248 | 8 | 1248 % 8 == 0 → true | 1 |
| 2 | 124 | 4 | 1248 % 4 == 0 → true | 2 |
| 3 | 12 | 2 | 1248 % 2 == 0 → true | 3 |
| 4 | 1 | 1 | 1248 % 1 == 0 → true | 4 |
| 5 | 0 | - | loop ends | final count = 4 |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(d) where d = number of digits |
| **Space** | O(1) |

---

## Follow-Up Questions

- How would you handle numbers that may contain the digit `0`? (Skip zeros to avoid division by zero.)
- Can this be extended to count digits that **do not** divide the number?
- What is the runtime impact if the input number is extremely large (e.g., up to 10^18)?

---

## Key Takeaway

> **Iterate through each digit, skip zeros, and use modulo to test divisibility.**