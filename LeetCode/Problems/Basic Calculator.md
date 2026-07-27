# 224. Basic Calculator

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/basic-calculator](https://leetcode.com/problems/basic-calculator)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Boeing, Bytedance, Canva, Coupang, Doordash, Ericsson, Google, Meta, Microsoft, Oracle, Palo Alto Networks, Ripple, Rokt, Salesforce, Snapchat, Snowflake, Squarepoint Capital, Tiktok, Uber

---

## 1. Problem Description

Implement a basic calculator with `+`, `-`, `(`, `)` and spaces.

---

## 2. Approach: Stack for Parentheses — O(n) ✅

```
FUNCTION calculate(s):
    stack = []
    result = 0
    num = 0
    sign = 1

    FOR char IN s:
        IF char is digit:
            num = num * 10 + int(char)
        ELSE IF char == '+':
            result += sign * num
            num = 0
            sign = 1
        ELSE IF char == '-':
            result += sign * num
            num = 0
            sign = -1
        ELSE IF char == '(':
            stack.PUSH(result)
            stack.PUSH(sign)
            result = 0
            sign = 1
        ELSE IF char == ')':
            result += sign * num
            num = 0
            result *= stack.POP()     // sign before '('
            result += stack.POP()     // result before '('

    result += sign * num
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Push (result, sign) onto stack at `(`. At `)`, pop and combine. This pattern extends to Basic Calculator II (#227, with `*` `/`) and III (#772, with all operators + parentheses).
