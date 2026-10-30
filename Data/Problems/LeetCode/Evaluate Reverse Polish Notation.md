# 150. Evaluate Reverse Polish Notation

**Difficulty:** 🟡 Medium
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/evaluate-reverse-polish-notation](https://leetcode.com/problems/evaluate-reverse-polish-notation)
**Companies:** Amazon, Anduril, Apolloio, Apple, Bloomberg, Canonical, Citadel, Citi, Goldman Sachs, Google, Grammarly, Infosys, Linkedin, Meta, Microsoft, Oracle, Tesla, Yandex

---

## 1. Problem Description

You are given an array of strings `tokens` that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return *an integer that represents the value of the expression*.

**Note** that:

- The valid operators are `'+'`, `'-'`, `'*'`, and `'/'`.
- Each operand may be an integer or another expression.
- The division between two integers always **truncates toward zero**.
- There will not be any division by zero.
- The input represents a valid arithmetic expression in a reverse polish notation.
- The answer and all the intermediate calculations can be represented in a **32-bit** integer.

**Constraints:**
- `1 <= tokens.length <= 10^4`
- `tokens[i]` is either an operator: `"+"`, `"-"`, `"*"`, or `"/"`, or an integer in the range `[-200, 200]`.

---

## 2. Approach: Stack — O(n) ✅

```text
FUNCTION evalRPN(tokens):
    stack ← []
    FOR token IN tokens:
        IF token IS operator:
            b ← stack.POP()
            a ← stack.POP()
            IF token == '+': stack.PUSH(a + b)
            ELSE IF token == '-': stack.PUSH(a - b)
            ELSE IF token == '*': stack.PUSH(a * b)
            ELSE: // '/'
                // Truncate toward zero
                SET result ← a / b
                IF result < 0 AND result != FLOOR(result):
                    result ← CEIL(result)
                ELSE:
                    result ← FLOOR(result)
                stack.PUSH(result)
        ELSE:
            stack.PUSH(TO_INTEGER(token))
    RETURN stack.POP()
```

---

## Examples

```
Example 1:
  Input: tokens = ["2","1","+","3","*"]
  Output: 9
  Explanation: ((2 + 1) * 3) = 9
```

```
Example 2:
  Input: tokens = ["4","13","5","/","+"]
  Output: 6
  Explanation: (4 + (13 / 5)) = 6
```

```
Example 3:
  Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
  Output: 22
  Explanation:
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
  = ((10 * (6 / (12 * -11))) + 17) + 5
  = ((10 * (6 / -132)) + 17) + 5
  = ((10 * 0) + 17) + 5
  = (0 + 17) + 5
  = 17 + 5
  = 22
```

---

## Walkthrough

Take the first example `["2","1","+","3","*"]`:

1. Push `2`, push `1`.
2. Encounter `+`: pop `1` and `2`, compute `2 + 1 = 3`, push `3`.
3. Push `3`.
4. Encounter `*`: pop `3` and `3`, compute `3 * 3 = 9`, push `9`.
5. End of tokens, pop result `9`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) – each token processed once |
| **Space** | O(n) – stack holds at most n operands |

---

## Follow-Up Questions

- How would you modify the algorithm to support additional operators like exponentiation or modulo?
- Can you evaluate RPN expressions without using an explicit stack, e.g., via recursion?
- What changes are needed to handle floating‑point numbers instead of integers?

---

## Key Takeaway

> RPN evaluation uses a simple stack: push operands, pop two on each operator, compute, and push the result. No precedence rules are needed, making it an ideal fit for a linear‑time solution.
