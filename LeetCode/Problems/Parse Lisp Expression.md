# 736. Parse Lisp Expression

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/parse-lisp-expression](https://leetcode.com/problems/parse-lisp-expression)
**Companies:** Affirm, Attentive, Google

---

## Problem Description
Given a string `expression` representing a Lisp‑style expression, evaluate it and return the integer result. The expression may contain integer literals, variables, and the three forms:
- `(let v1 e1 v2 e2 ... expr)` defines variables `v1, v2, …` with values `e1, e2, …` in a new scope and evaluates `expr`.
- `(add e1 e2)` returns the sum of the evaluations of `e1` and `e2`.
- `(mult e1 e2)` returns the product of the evaluations of `e1` and `e2`.
Variables are scoped to the innermost `let` that defines them.

## Examples
**Example 1:**
```
Input: "(let x 2 (mult x (let x 3 y 4 (add x y))))"
Output: 14
Explanation: Inner let sets x=3, y=4, so (add x y)=7; outer mult => 2*7.
```
**Example 2:**
```
Input: "(let x 3 x 2 x)"
Output: 2
Explanation: The later definition of x shadows the earlier one.
```

## Approach
Parse recursively while maintaining a stack of scope dictionaries. When encountering `let`, push a new scope, evaluate each binding, then evaluate the final expression in that scope, and finally pop the scope. For `add` and `mult`, evaluate both sub‑expressions and combine. Tokens are separated by spaces and parentheses.

```text
FUNCTION evaluate(expression):
    index ← 0
    scopeStack ← []
    RETURN parse(expression, scopeStack)

FUNCTION parse(expr, stack):
    IF expr[index] = '(':
        index ← index + 1  // skip '('
        token ← READ_TOKEN(expr, index)
        IF token = 'let':
            PUSH empty MAP ONTO stack
            WHILE TRUE:
                nextToken ← PEEK_TOKEN(expr, index)
                IF nextToken = '(' OR IS_NUMBER(nextToken) OR IS_VARIABLE(nextToken):
                    // final expression
                    value ← parse(expr, stack)
                    POP stack
                    index ← index + 1  // skip ')'
                    RETURN value
                varName ← READ_TOKEN(expr, index)
                varValue ← parse(expr, stack)
                SET stack.TOP()[varName] ← varValue
        ELSE IF token = 'add':
            left ← parse(expr, stack)
            right ← parse(expr, stack)
            index ← index + 1  // skip ')'
            RETURN left + right
        ELSE IF token = 'mult':
            left ← parse(expr, stack)
            right ← parse(expr, stack)
            index ← index + 1
            RETURN left * right
    ELSE:
        token ← READ_TOKEN(expr, index)
        IF IS_NUMBER(token):
            RETURN TO_INTEGER(token)
        ELSE:
            // variable lookup from topmost scope downwards
            FOR scope IN REVERSE(stack):
                IF token IN scope:
                    RETURN scope[token]
            RETURN 0
```

## Walkthrough
Expression `(let x 2 (mult x (let x 3 y 4 (add x y))))`:
1. Enter outer `let`, push scope, bind `x=2`.
2. Evaluate inner `(mult ...)`:
   - `mult` parses left operand `x` → looks up in current scope → 2.
   - Parses right operand `(let x 3 y 4 (add x y))`:
     * Push new scope, bind `x=3`, `y=4`.
     * Evaluate `(add x y)` → 3+4=7.
     * Pop inner scope, result 7.
   - Multiply 2 * 7 = 14.
3. Pop outer scope, final result 14.

## Complexity Analysis
- **Time:** O(L) where L is the length of the expression, each character processed a constant number of times.
- **Space:** O(D) for the maximum depth of nested scopes (stack size).

## Follow‑Up Questions
1. How would you modify the parser to support additional operations like `sub` or `div`?
2. Can the solution be implemented iteratively using an explicit stack instead of recursion?
3. How would you handle variable shadowing when the same variable appears multiple times in the same `let` block?

## Key Takeaway
A recursive descent parser with a stack of scoped variable maps cleanly evaluates nested Lisp‑style expressions while respecting variable lifetimes.
