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

| Tokens | Evaluation | Explanation |
|--------|------------|-------------|
| `["2","1","+","3","*"]` | `9` | `(2 + 1) * 3 = 9` |
| `["4","13","5","/","+","-"]` | `-5` | `4 + (13 / 5) = 4 + 2 = 6`; then `6 - 11 = -5` (assuming integer division truncates) |
| `["10","6","9","3","+","-","*","/"]` | `0` | Compute inner `9 + 3 = 12`; then `6 - 12 = -6`; then `10 * -6 = -60`; finally `-60 / 6 = -10` (truncated toward zero gives `-10`). |

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
