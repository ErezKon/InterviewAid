# 1106. Parsing A Boolean Expression

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/parsing-a-boolean-expression](https://leetcode.com/problems/parsing-a-boolean-expression)
**Companies:** Affinity, Amazon, Bloomberg, Goldman Sachs, Google, Hilabs, Meta, Microsoft

---

## Problem Description
A **boolean expression** is an expression that evaluates to either `true` or `false`. It can be in one of the following shapes:

- `'t'` that evaluates to `true`.
- `'f'` that evaluates to `false`.
- `'!(subExpr)'` that evaluates to **the logical NOT** of the inner expression `subExpr`.
- `'&(subExpr1, subExpr2, ..., subExprn)'` that evaluates to **the logical AND** of the inner expressions `subExpr1, subExpr2, ..., subExprn` where `n >= 1`.
- `'|(subExpr1, subExpr2, ..., subExprn)'` that evaluates to **the logical OR** of the inner expressions `subExpr1, subExpr2, ..., subExprn` where `n >= 1`.

Given a string `expression` that represents a **boolean expression**, return *the evaluation of that expression*.

It is **guaranteed** that the given expression is valid and follows the given rules.

**Constraints:**

- `1 <= expression.length <= 2 * 10^4`
- `expression[i]` is one following characters: `'('`, `')'`, `'&'`, `'|'`, `'!'`, `'t'`, `'f'`, and `','`.

## Examples

```
Example 1:
  Input: expression = "&(|(f))"
  Output: false
  Explanation:
  First, evaluate |(f) --> f. The expression is now "&(f)".
  Then, evaluate &(f) --> f. The expression is now "f".
  Finally, return false.
```

```
Example 2:
  Input: expression = "|(f,f,f,t)"
  Output: true
  Explanation: The evaluation of (false OR false OR false OR true) is true.
```

```
Example 3:
  Input: expression = "!(&(f,t))"
  Output: true
  Explanation:
  First, evaluate &(f,t) --> (false AND true) --> false --> f. The expression is now "!(f)".
  Then, evaluate !(f) --> NOT false --> true. We return true.
```

## Approach
Stack‑based evaluation — O(n) ✅

```text
FUNCTION parseBoolExpr(expression):
    stack ← []
    FOR ch IN expression:
        IF ch = ',' : CONTINUE
        ELSE IF ch ≠ ')':
            stack.PUSH(ch)
        ELSE:
            operands ← []
            WHILE stack.TOP() ≠ '(':
                operands.APPEND(stack.POP())
            stack.POP()               // remove '('
            operator ← stack.POP()
            IF operator = '!':
                result ← 'f' IF operands[0] = 't' ELSE 't'
            ELSE IF operator = '&':
                result ← 'f' IF 'f' IN operands ELSE 't'
            ELSE: // '|'
                result ← 't' IF 't' IN operands ELSE 'f'
            stack.PUSH(result)
    RETURN stack[0] = 't'
```
The stack stores characters until a closing parenthesis triggers evaluation of the most recent sub‑expression.

## Walkthrough
Expression: `|(&(t,f,t),!(f))`
1. Push `|`, `(`, `&`, `(`, `t`, `,`, `f`, `,`, `t`.
2. Encounter `)`: pop `t,f,t` → operands `[t,f,t]`, operator `&` → result `f`, push `f`.
3. Push `,`, `!`, `(`, `f`.
4. Encounter `)`: pop `f` → operands `[f]`, operator `!` → result `t`, push `t`.
5. Encounter final `)`: pop `t,f` → operands `[t,f]`, operator `|` → result `t`.
Stack ends with `t` → expression evaluates to true.

## Complexity Analysis
- **Time:** O(n) – each character is processed once.
- **Space:** O(n) – stack holds at most the characters of the current nested sub‑expression.

## Follow‑Up Questions
1. How would you modify the algorithm to support additional operators like XOR (`^`)?
2. Can you evaluate the expression without using extra space, e.g., by recursion?
3. How would you handle invalid expressions or mismatched parentheses?

## Key Takeaway
A stack efficiently evaluates nested boolean expressions by postponing computation until a closing parenthesis signals that all operands for the current operator are available.
