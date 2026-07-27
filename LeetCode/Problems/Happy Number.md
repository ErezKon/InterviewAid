# 202. Happy Number

**Difficulty:** 🟢 Easy
**Acceptance:** 57.0%
**LeetCode:** [https://leetcode.com/problems/happy-number](https://leetcode.com/problems/happy-number)
**Companies:** Accenture, Agoda, Airbnb, Amazon, Apple, Blackrock, Bloomberg, Cisco, Google, Ibm, Jpmorgan, Jump Trading, Meta, Microsoft, Nike, Oracle, Paypal, Snowflake, Swiggy, Tcs, Tesla, Tiktok, Twitter, Uber, Verily, Visa, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Hash Set — O(log n) ✅](#3-approach-1-hash-set--olog-n-)
4. [Approach 2: Floyd's Cycle Detection — O(log n) ✅](#4-approach-2-floyds-cycle-detection--olog-n-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

A **happy number** is defined by: starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat until the number equals 1 (happy) or **loops endlessly** in a cycle (not happy).

Return `true` if `n` is a happy number.

---

## 2. Examples

```
Example 1:
  Input:  n = 19
  Output: true
  Reason: 1²+9² = 82 → 8²+2² = 68 → 6²+8² = 100 → 1²+0²+0² = 1 ✅

Example 2:
  Input:  n = 2
  Output: false (enters a cycle: 2→4→16→37→58→89→145→42→20→4→...)
```

---

## 3. Approach 1: Hash Set — O(log n) ✅

Track seen numbers. If we see a repeat, it's a cycle → not happy.

```
FUNCTION isHappy(n):
    seen = {}

    WHILE n != 1:
        IF n IN seen:
            RETURN false
        seen.ADD(n)
        n = sumOfSquaredDigits(n)

    RETURN true

FUNCTION sumOfSquaredDigits(n):
    sum = 0
    WHILE n > 0:
        digit = n % 10
        sum += digit * digit
        n = n / 10
    RETURN sum
```

---

## 4. Approach 2: Floyd's Cycle Detection — O(log n) ✅

Use slow/fast pointers (like linked list cycle detection).

```
FUNCTION isHappy(n):
    slow = n
    fast = sumOfSquaredDigits(n)

    WHILE fast != 1 AND slow != fast:
        slow = sumOfSquaredDigits(slow)
        fast = sumOfSquaredDigits(sumOfSquaredDigits(fast))

    RETURN fast == 1
```

---

## 5. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Hash Set | O(log n) per step | O(log n) |
| **Floyd's** | **O(log n) per step** | **O(1)** |

---

## 6. Follow-Up Questions

### 6.1 Why does it always cycle (never diverge to infinity)?

For any number with d digits, the max sum of squared digits is `81d` (all 9s). For d ≥ 4, `81d < 10^(d-1)`, so the sequence decreases. All numbers eventually drop below ~1000 and either reach 1 or enter one of the known cycles.

### 6.2 Linked List Cycle (LeetCode #141)?

Same Floyd's algorithm on actual linked list nodes. The "next" function is `node.next` instead of `sumOfSquaredDigits`.

### 6.3 What are all the known cycles for unhappy numbers?

There's only one cycle for base-10: `4→16→37→58→89→145→42→20→4`. All unhappy numbers eventually enter this cycle.

---

## Key Takeaway

> Happy Number is a **cycle detection** problem in disguise. The sequence of digit-square sums either converges to 1 or enters a cycle. Floyd's algorithm provides O(1) space detection.
