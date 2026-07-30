# 772. Basic Calculator III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/basic-calculator-iii](https://leetcode.com/problems/basic-calculator-iii)
**Companies:** Amazon, Coupang, Doordash, Google, Houzz, Hulu, Intuit, Jingchi, Meta, Microsoft, Motive, Oracle, Pocket Gems, Snapchat, Tiktok, Verkada

---

## Problem Description
Implement a calculator to evaluate a string expression `s` containing non‑negative integers, the operators `+`, `-`, `*`, `/`, and parentheses `(`, `)`. The expression may contain spaces. Division should truncate toward zero.

## Examples
- **Input:** `s = "3+2*2"` **Output:** `7`
- **Input:** `s = " 3/2 "` **Output:** `1`
- **Input:** `s = "(1+(4+5+2)-3)+(6+8)"` **Output:** `23`

## Approach
Use a recursive descent parser (or explicit stack) that respects operator precedence. The parser evaluates sub‑expressions inside parentheses recursively. Multiplication and division are applied immediately, while addition and subtraction are deferred using a stack.

```text
FUNCTION calculate(s):
    SET idx ← 0

    FUNCTION parseExpression():
        SET stack ← []
        SET num ← 0
        SET sign ← '+'
        WHILE idx < LENGTH(s):
            SET ch ← s[idx]
            SET idx ← idx + 1
            IF ch IS DIGIT:
                SET num ← num * 10 + INT(ch)
            IF ch == '(':
                SET num ← parseExpression()  // evaluate inner parentheses
            IF ch IN ['+', '-', '*', '/', ')'] OR idx == LENGTH(s):
                IF sign == '+':
                    APPEND num TO stack
                ELSE IF sign == '-':
                    APPEND -num TO stack
                ELSE IF sign == '*':
                    SET prev ← POP(stack)
                    APPEND prev * num TO stack
                ELSE IF sign == '/':
                    SET prev ← POP(stack)
                    // Truncate toward zero
                    APPEND TRUNC(prev / num) TO stack
                SET sign ← ch
                SET num ← 0
                IF ch == ')':
                    BREAK
        RETURN SUM(stack)

    RETURN parseExpression()
```

## Walkthrough
| Step | char | action | stack | num | sign |
|------|------|--------|-------|-----|------|
| 1 | '(' | recurse | [] | 0 | '+' |
| ... | evaluate `1+(4+5+2)-3` | → 9 | ... |
| final | combine with `+(6+8)` | → 23 |

## Complexity Analysis
- **Time:** O(n) – each character processed once.
- **Space:** O(n) – recursion depth / stack size proportional to parentheses nesting.

## Follow‑Up Questions
1. How would you extend the parser to support exponentiation `^` with right‑associativity?
2. What changes are needed to handle unary `+`/`-` operators?
3. Can the algorithm be adapted to evaluate expressions in Reverse Polish Notation?

## Key Takeaway
A recursive descent parser combined with a stack for pending addition/subtraction cleanly handles operator precedence and parentheses in a single linear pass.
