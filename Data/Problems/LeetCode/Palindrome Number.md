# 9. Palindrome Number

**Difficulty:** 🟢 Easy
**Acceptance:** 57.0%
**LeetCode:** [https://leetcode.com/problems/palindrome-number](https://leetcode.com/problems/palindrome-number)
**Companies:** Accenture, Amazon, Amd, Bcg, Bloomberg, Capgemini, Capital One, Cognizant, Deloitte, Epam Systems, Exl, Garmin, Google, Ibm, Infosys, Intel, Luxoft, Meta, Microsoft, Mindtree, Morgan Stanley, Oracle, Persistent Systems, Pornhub, Qualcomm, Sap, Siemens, Tcs, Wipro, Yahoo, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: String Conversion — O(n)](#3-approach-1-string-conversion--on)
4. [Approach 2: Reverse Half — O(log n) ✅](#4-approach-2-reverse-half--olog-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an integer `x`, return `true` if `x` is a **palindrome**, and `false` otherwise.

**Follow up:** Could you solve it without converting the integer to a string?

**Constraints:**
- `-2³¹ <= x <= 2³¹ - 1`

---

## 2. Examples

```
Example 1:
  Input:  x = 121
  Output: true

Example 2:
  Input:  x = -121
  Output: false (reads as "121-")

Example 3:
  Input:  x = 10
  Output: false (reads as "01")
```

---

## 3. Approach 1: String Conversion — O(n)

```
FUNCTION isPalindrome(x):
    s = STRING(x)
    RETURN s == REVERSE(s)
```

Simple but uses O(n) space and converts to string.

---

## 4. Approach 2: Reverse Half — O(log n) ✅

### Key Insight

Reverse only the **second half** of the number and compare with the first half. Stop when the reversed half is ≥ the remaining first half.

```
FUNCTION isPalindrome(x):
    // Negative numbers and numbers ending in 0 (except 0 itself) aren't palindromes
    IF x < 0 OR (x != 0 AND x % 10 == 0):
        RETURN false

    reversed = 0
    WHILE x > reversed:
        reversed = reversed * 10 + x % 10
        x = x / 10

    // For even-length: x == reversed
    // For odd-length: x == reversed / 10 (middle digit doesn't matter)
    RETURN x == reversed OR x == reversed / 10
```

---

## 5. Walkthrough

```
x = 12321

Step 1: reversed=1, x=1232
Step 2: reversed=12, x=123
Step 3: reversed=123, x=12
        x(12) < reversed(123) → stop

x(12) == reversed/10(12) → true ✅ (odd-length palindrome)

x = 1221

Step 1: reversed=1, x=122
Step 2: reversed=12, x=12
        x(12) <= reversed(12) → stop

x(12) == reversed(12) → true ✅ (even-length palindrome)
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| String | O(n) | O(n) |
| **Reverse Half** | **O(log n)** | **O(1)** |

Where n = number of digits = log₁₀(x).

---

## 7. Follow-Up Questions

### 7.1 Palindrome Linked List (LeetCode #234)?

Find the middle (slow/fast pointers), reverse the second half, compare both halves, optionally restore.

### 7.2 Largest Palindrome Product?

For n-digit numbers, search downward from 10ⁿ-1. For each candidate palindrome, check if it's a product of two n-digit numbers.

### 7.3 Palindrome with leading zeros?

The problem states numbers don't have leading zeros (except 0 itself). So `10` → `01` is not a palindrome, which is correct.

---

## Key Takeaway

> Reversing only **half** the number avoids overflow concerns and doesn't require string conversion. The stopping condition `x > reversed` elegantly handles both even and odd length numbers.
