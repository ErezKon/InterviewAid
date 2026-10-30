# 2520. Count the Digits That Divide a Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-digits-that-divide-a-number](https://leetcode.com/problems/count-the-digits-that-divide-a-number)

**Companies:** Amazon, Google, Tcs

---

## Problem Description

Given an integer `num`, return *the number of digits in `num` that divide* `num`.

An integer `val` divides `nums` if `nums % val == 0`.

**Constraints:**
- `1 <= num <= 10^9`
- `num` does not contain `0` as one of its digits.

---

## Examples

```
Example 1:
  Input: num = 7
  Output: 1
  Explanation: 7 divides itself, hence the answer is 1.
```

```
Example 2:
  Input: num = 121
  Output: 2
  Explanation: 121 is divisible by 1, but not 2. Since 1 occurs twice as a digit, we return 2.
```

```
Example 3:
  Input: num = 1248
  Output: 4
  Explanation: 1248 is divisible by all of its digits, hence the answer is 4.
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