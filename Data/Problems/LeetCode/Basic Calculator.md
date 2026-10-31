# 224. Basic Calculator

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/basic-calculator](https://leetcode.com/problems/basic-calculator)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Boeing, Bytedance, Canva, Coupang, Doordash, Ericsson, Google, Meta, Microsoft, Oracle, Palo Alto Networks, Ripple, Rokt, Salesforce, Snapchat, Snowflake, Squarepoint Capital, Tiktok, Uber

---

## 1. Problem Description

Given a string `s` representing a valid expression, implement a basic calculator to evaluate it, and return *the result of the evaluation*.

**Note:** You are **not** allowed to use any built-in function which evaluates strings as mathematical expressions, such as `eval()`.

**Constraints:**
- `1 ≤ s.length ≤ 3 * 10⁵`
- `s` consists of digits, `'+'`, `'-'`, `'('`, `')'`, and `' '`.
- `s` represents a valid expression.
- `'+'` is **not** used as a unary operation (i.e., `"+1"` and `"+(2 + 3)"` is invalid).
- `'-'` could be used as a unary operation (i.e., `"-1"` and `"-(2 + 3)"` is valid).
- There will be no two consecutive operators in the input.
- Every number and running calculation will fit in a signed 32-bit integer.

---

## 2. Examples

```
Example 1:
  Input: s = "1 + 1"
  Output: 2

Example 2:
  Input: s = " 2-1 + 2 "
  Output: 3

Example 3:
  Input: s = "(1+(4+5+2)-3)+(6+8)"
  Output: 23
```

---

## 3. Approach: Stack for Parentheses — O(n) ✅

```text
FUNCTION calculate(s):
    SET stack ← []
    SET result ← 0
    SET num ← 0
    SET sign ← 1

    FOR char IN s:
        IF char IS DIGIT:
            SET num ← num * 10 + INT(char)
        ELSE IF char == '+':
            SET result ← result + sign * num
            SET num ← 0
            SET sign ← 1
        ELSE IF char == '-':
            SET result ← result + sign * num
            SET num ← 0
            SET sign ← -1
        ELSE IF char == '(':
            stack.PUSH(result)
            stack.PUSH(sign)
            SET result ← 0
            SET sign ← 1
        ELSE IF char == ')':
            SET result ← result + sign * num
            SET num ← 0
            SET sign_before ← stack.POP()
            SET result_before ← stack.POP()
            SET result ← result_before + sign_before * result
    SET result ← result + sign * num
    RETURN result
```

---

## 4. Walkthrough

| Step | Char | Action | Result | Stack |
|------|------|--------|--------|-------|
| 1 | '2' | BUILD num = 2 | result=0, num=2 | [] |
| 2 | '-' | APPLY previous sign: result+=1*2 → 2, sign=-1, num=0 | result=2 | [] |
| 3 | '(' | PUSH result(2), sign(-1) | result=0, sign=1 | [2, -1] |
| 4 | '3' | num=3 | … | … |
| 5 | '+' | result+=1*3 → 3, sign=1, num=0 | result=3 | [2, -1] |
| 6 | '(' | PUSH result(3), sign(1) | result=0 | [2, -1, 3, 1] |
| 7 | '4' | num=4 | … | … |
| 8 | '-' | result+=1*4 → 4, sign=-1, num=0 | result=4 | [2, -1, 3, 1] |
| 9 | '5' | num=5 | … | … |
|10 | ')' | result+=-1*5 → -1, POP sign(1), POP prevResult(3) → result=3 + 1*(-1)=2 | result=2 | [2, -1] |
|11 | ')' | result+=-1*0 → 2, POP sign(-1), POP prevResult(2) → result=2 + (-1)*2 = 0 | result=0 | [] |

---

## 5. Complexity Analysis

- **Time:** O(n) – each character processed once.
- **Space:** O(k) where k is the maximum nesting depth of parentheses (stack size).

---

## 6. Follow-Up Questions

- How would you extend the solution to support `*` and `/` operators (Basic Calculator II)?
- Can you evaluate the expression without using an explicit stack, e.g., by converting to Reverse Polish Notation?
- How would you handle unary operators or floating-point numbers?

---

## Key Takeaway

> Push the current `result` and `sign` onto a stack at each `(`. When encountering `)`, combine the computed sub-expression with the popped sign and previous result. This pattern cleanly handles nested parentheses.
