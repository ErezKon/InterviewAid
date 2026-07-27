# 227. Basic Calculator II

**Difficulty:** 🟡 Medium
**Acceptance:** 44.0%
**LeetCode:** [https://leetcode.com/problems/basic-calculator-ii](https://leetcode.com/problems/basic-calculator-ii)
**Companies:** Adobe, Airbnb, Amazon, Apple, Bloomberg, Bytedance, Canva, De Shaw, Doordash, Expedia, Goldman Sachs, Google, Highspot, Ixl, Meta, Microsoft, Motive, Oracle, Palo Alto Networks, Rivian, Rokt, Servicenow, Snapchat, Snowflake, Tesla, The Trade Desk, Tiktok, Uber, Verkada, Walmart Labs, Yandex, Zoho, Zoox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Stack — O(n) ✅](#3-approach-stack--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given a string `s` representing an expression, evaluate it and return its value.

The expression contains non-negative integers, `+`, `-`, `*`, `/` operators, and spaces. Integer division should **truncate toward zero**.

**Note:** No parentheses in this version.

**Constraints:**
- `1 <= s.length <= 3 × 10⁵`
- `s` consists of digits, `+`, `-`, `*`, `/`, and spaces.
- The expression is always valid.

---

## 2. Examples

```
Example 1:
  Input:  s = "3+2*2"
  Output: 7

Example 2:
  Input:  s = " 3/2 "
  Output: 1

Example 3:
  Input:  s = " 3+5 / 2 "
  Output: 5
```

---

## 3. Approach: Stack — O(n) ✅

### Key Insight

Process `*` and `/` immediately (they bind tighter). For `+` and `-`, push values onto a stack and sum at the end.

Track the **previous operator**. When we encounter a new operator (or reach the end), apply the previous operator to the current number.

```
FUNCTION calculate(s):
    stack = []
    num = 0
    prevOp = '+'

    FOR i ← 0 TO len(s) - 1:
        char = s[i]

        IF char is a digit:
            num = num * 10 + int(char)

        IF (char is an operator OR i == len(s) - 1):
            IF prevOp == '+':
                stack.PUSH(num)
            ELSE IF prevOp == '-':
                stack.PUSH(-num)
            ELSE IF prevOp == '*':
                stack.PUSH(stack.POP() * num)
            ELSE IF prevOp == '/':
                stack.PUSH(TRUNCATE(stack.POP() / num))

            prevOp = char
            num = 0

    RETURN SUM(stack)
```

---

## 4. Walkthrough

```
s = "3+2*2"

i=0: '3' → num=3
i=1: '+' → prevOp='+', push 3, stack=[3], prevOp='+', num=0
i=2: '2' → num=2
i=3: '*' → prevOp='+', push 2, stack=[3,2], prevOp='*', num=0
i=4: '2' → num=2, end of string → prevOp='*', pop 2, push 2*2=4
     stack=[3,4]

SUM([3,4]) = 7 ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(n) for stack |

---

## 6. Follow-Up Questions

### 6.1 Basic Calculator I (LeetCode #224)?

Handles `+`, `-`, and **parentheses** (no `*`/`/`). Use a stack for nested expressions: push result and sign when entering `(`, pop when leaving `)`.

### 6.2 Basic Calculator III (LeetCode #772)?

Handles `+`, `-`, `*`, `/`, AND parentheses. Combine both approaches: recursion for parentheses, stack for operator precedence.

### 6.3 What about negative numbers?

The problem guarantees non-negative integers. For negative numbers, handle leading `-` as a special case (treat as `0 - number`).

### 6.4 How to handle operator precedence in general?

Use the **Shunting Yard algorithm** (Dijkstra) to convert infix to postfix, then evaluate the postfix expression with a stack. This handles arbitrary precedence levels and associativity.

---

## Key Takeaway

> The **delayed evaluation** pattern (track previous operator, apply when we see the next one) handles operator precedence elegantly. `*` and `/` are applied immediately to the stack top; `+` and `-` just push. The final sum resolves all additions/subtractions.
