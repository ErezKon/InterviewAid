# 67. Add Binary

**Difficulty:** 🟢 Easy
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/add-binary](https://leetcode.com/problems/add-binary)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Deloitte, Google, Ibm, Infosys, Meta, Microsoft, Snapchat, Tcs, Visa, Walmart Labs, Wipro

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Simulation — O(max(m,n)) ✅](#4-approach-simulation--omaxmn-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given two binary strings `a` and `b`, return their **sum** as a binary string.

**Constraints:**
- `1 ≤ a.length, b.length ≤ 10⁴`
- `a` and `b` consist only of `'0'` or `'1'`
- Each string does not contain leading zeros except `"0"` itself

---

## 2. Examples

```
Example 1:
  Input:  a = "11", b = "1"
  Output: "100"
  Explanation: 3 + 1 = 4 → "100"

Example 2:
  Input:  a = "1010", b = "1011"
  Output: "10101"
  Explanation: 10 + 11 = 21 → "10101"
```

Visual (column addition):
```
    1 0 1 0
  + 1 0 1 1
  ---------
  1 0 1 0 1
  carry: 1 0 1 0
```

---

## 3. Key Insight

> Simulate binary addition exactly like grade-school decimal addition: process from right to left, sum corresponding digits plus carry, store `sum % 2`, propagate `sum / 2` as the new carry.

---

## 4. Approach: Simulation — O(max(m,n)) ✅

```
FUNCTION addBinary(a, b):
    result = []
    carry = 0
    i, j = len(a) - 1, len(b) - 1

    WHILE i >= 0 OR j >= 0 OR carry:
        sum = carry
        IF i >= 0: sum += int(a[i]); i -= 1
        IF j >= 0: sum += int(b[j]); j -= 1

        result.ADD(str(sum % 2))
        carry = sum / 2

    RETURN REVERSE(result) as string
```

---

## 5. Walkthrough

```
a = "1010", b = "1011"

Step 1: i=3, j=3 → 0+1+0(carry) = 1, result=[1], carry=0
Step 2: i=2, j=2 → 1+1+0 = 2, result=[1,0], carry=1
Step 3: i=1, j=1 → 0+0+1 = 1, result=[1,0,1], carry=0
Step 4: i=0, j=0 → 1+1+0 = 2, result=[1,0,1,0], carry=1
Step 5: i<0, j<0, carry=1 → result=[1,0,1,0,1], carry=0

Reverse: "10101" ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(max(m, n)) — single pass |
| **Space** | O(max(m, n)) — for the result string |

---

## 7. Follow-Up Questions

### 7.1 What if we can't use built-in big-integer arithmetic?

This solution already avoids big integers — it works digit by digit. This is often the interviewer's intent.

### 7.2 Can we do it with bit manipulation?

Yes, using XOR for sum-without-carry and AND+shift for carry, but it requires converting strings to integers first, which may overflow for very long strings.

### 7.3 Related addition problems

| Problem | Representation |
|---------|---------------|
| **Add Two Numbers** (#2) | Linked list (reverse order) |
| **Add Strings** (#415) | Decimal strings |
| **Add Binary** (#67) | Binary strings |
| **Multiply Strings** (#43) | Decimal multiplication |

All follow the same right-to-left, carry-propagation pattern.

---

## 8. Key Takeaway

> Same pattern as Add Two Numbers (#2) but with bits. Process from right to left, track carry, handle unequal lengths. The `while i >= 0 OR j >= 0 OR carry` loop elegantly handles all edge cases in one pass.
