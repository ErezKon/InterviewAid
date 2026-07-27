# 150. Evaluate Reverse Polish Notation

**Difficulty:** 🟡 Medium
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/evaluate-reverse-polish-notation](https://leetcode.com/problems/evaluate-reverse-polish-notation)
**Companies:** Amazon, Anduril, Apolloio, Apple, Bloomberg, Canonical, Citadel, Citi, Goldman Sachs, Google, Grammarly, Infosys, Linkedin, Meta, Microsoft, Oracle, Tesla, Yandex

---

## 1. Problem Description

Evaluate an arithmetic expression in Reverse Polish Notation (postfix). Valid operators: `+`, `-`, `*`, `/`. Division truncates toward zero.

---

## 2. Approach: Stack — O(n) ✅

```
FUNCTION evalRPN(tokens):
    stack = []

    FOR token IN tokens:
        IF token is an operator:
            b = stack.POP()
            a = stack.POP()
            IF token == '+': stack.PUSH(a + b)
            ELSE IF token == '-': stack.PUSH(a - b)
            ELSE IF token == '*': stack.PUSH(a * b)
            ELSE: stack.PUSH(TRUNCATE(a / b))
        ELSE:
            stack.PUSH(int(token))

    RETURN stack.POP()
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> RPN evaluation is the canonical stack problem. Push operands, pop two on operator, push result. No operator precedence or parentheses needed — that's the beauty of postfix notation.
