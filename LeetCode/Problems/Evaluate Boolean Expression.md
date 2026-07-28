# 1440. Evaluate Boolean Expression

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/evaluate-boolean-expression](https://leetcode.com/problems/evaluate-boolean-expression)
**Companies:** Point72

---

## Problem Description
Given a string `expression` consisting of the characters `'0'`, `'1'`, `'&'`, `'|'`, `'!'`, and parentheses `'('`, `')'`, evaluate the expression and return its boolean value (`true` for 1, `false` for 0). The operators have the usual precedence: `!` (NOT) highest, then `&` (AND), then `|` (OR). Parentheses may override precedence.

## Examples
```text
Input: expression = "|(f|t)&!(f)"
Output: true
Explanation: (f|t) → true, !(f) → true, true & true → true.

Input: expression = "!(&(t|f)&(f|!(t)))"
Output: false
```

## Approach
Use two stacks: one for operands (`0`/`1`) and one for operators. Scan the string left‑to‑right.
1. When encountering a digit, push its boolean value.
2. When encountering `'!'`, push it onto the operator stack (unary).
3. When encountering `'&'` or `'|'`, resolve any operators on the stack with **higher or equal** precedence before pushing the new operator.
4. `'('` is pushed to mark a new sub‑expression. When `')'` is seen, pop and evaluate until the matching `'('` is removed.
5. After the scan, evaluate any remaining operators.
The evaluation of a unary `!` pops one operand, flips it, and pushes the result. Binary operators pop two operands, apply the operation, and push the result.

## Pseudocode
```text
FUNCTION evaluate(expression):
    SET ops ← empty stack   // operators
    SET vals ← empty stack  // boolean values
    FOR ch IN expression:
        IF ch == ' ':
            CONTINUE
        IF ch == '0' OR ch == '1':
            SET vals.PUSH(ch == '1')
        ELSE IF ch == '!':
            ops.PUSH('!')
        ELSE IF ch == '&' OR ch == '|':
            WHILE NOT ops.IS_EMPTY() AND precedence(ops.TOP()) >= precedence(ch):
                APPLY_TOP_OPERATOR(ops, vals)
            ops.PUSH(ch)
        ELSE IF ch == '(':
            ops.PUSH('(')
        ELSE IF ch == ')':
            WHILE ops.TOP() != '(':
                APPLY_TOP_OPERATOR(ops, vals)
            ops.POP()   // remove '('
    // finish remaining operators
    WHILE NOT ops.IS_EMPTY():
        APPLY_TOP_OPERATOR(ops, vals)
    RETURN vals.POP()

FUNCTION precedence(op):
    IF op == '!': RETURN 3
    IF op == '&': RETURN 2
    IF op == '|': RETURN 1
    RETURN 0

FUNCTION APPLY_TOP_OPERATOR(ops, vals):
    SET op ← ops.POP()
    IF op == '!':
        SET v ← vals.POP()
        vals.PUSH(NOT v)
    ELSE:
        SET right ← vals.POP()
        SET left ← vals.POP()
        IF op == '&': vals.PUSH(left AND right)
        ELSE IF op == '|': vals.PUSH(left OR right)
```

## Walkthrough
| Step | Char | ops stack | vals stack | Action |
|------|------|-----------|-----------|--------|
| 1 | '(' | ['('] | – | push '(' |
| 2 | '|' | ['(','|'] | – | push operator |
| 3 | '(' | ['(','|','('] | – | push '(' |
| 4 | 'f' | ['(','|','('] | [false] | push value |
| 5 | '|' | ['(','|','(','|'] | [false] | push operator |
| 6 | 't' | … | [false,true] | push value |
| 7 | ')' | ['(','|','('] | [true] | evaluate '|' → true |
| 8 | '&' | ['(','&'] | [true] | push '&' (precedence lower than '|', so previous resolved) |
| … | continue until end |
Result → true.

## Complexity Analysis
- **Time:** O(n) where n is the length of the expression – each character is processed once.
- **Space:** O(n) for the two stacks in the worst case (deeply nested parentheses).

## Follow‑Up Questions
- How would you modify the algorithm to support additional operators such as XOR (`^`)?
- Can you evaluate the expression in a single pass without explicit stacks (e.g., using recursion)?
- What changes are needed if the expression may contain whitespace or invalid characters?

## Key Takeaway
A pair of operand and operator stacks allow systematic handling of precedence and parentheses, turning a complex boolean expression into a linear‑time evaluation.
