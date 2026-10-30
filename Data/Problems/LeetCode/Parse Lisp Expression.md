# 736. Parse Lisp Expression

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/parse-lisp-expression](https://leetcode.com/problems/parse-lisp-expression)
**Companies:** Affirm, Attentive, Google

---

## Problem Description
You are given a string expression representing a Lisp-like expression to return the integer value of.

The syntax for these expressions is given as follows.

- An expression is either an integer, let expression, add expression, mult expression, or an assigned variable. Expressions always evaluate to a single integer.
- (An integer could be positive or negative.)
- A let expression takes the form `"(let v1 e1 v2 e2 ... vn en expr)"`, where let is always the string `"let"`, then there are one or more pairs of alternating variables and expressions, meaning that the first variable `v1` is assigned the value of the expression `e1`, the second variable `v2` is assigned the value of the expression `e2`, and so on sequentially; and then the value of this let expression is the value of the expression `expr`.
- An add expression takes the form `"(add e1 e2)"` where add is always the string `"add"`, there are always two expressions `e1`, `e2` and the result is the addition of the evaluation of `e1` and the evaluation of `e2`.
- A mult expression takes the form `"(mult e1 e2)"` where mult is always the string `"mult"`, there are always two expressions `e1`, `e2` and the result is the multiplication of the evaluation of e1 and the evaluation of e2.
- For this question, we will use a smaller subset of variable names. A variable starts with a lowercase letter, then zero or more lowercase letters or digits. Additionally, for your convenience, the names `"add"`, `"let"`, and `"mult"` are protected and will never be used as variable names.
- Finally, there is the concept of scope. When an expression of a variable name is evaluated, within the context of that evaluation, the innermost scope (in terms of parentheses) is checked first for the value of that variable, and then outer scopes are checked sequentially. It is guaranteed that every expression is legal. Please see the examples for more details on the scope.

**Constraints:**

- `1 <= expression.length <= 2000`
- There are no leading or trailing spaces in `expression`.
- All tokens are separated by a single space in `expression`.
- The answer and all intermediate calculations of that answer are guaranteed to fit in a **32-bit** integer.
- The expression is guaranteed to be legal and evaluate to an integer.

## Examples

```
Example 1:
  Input: expression = "(let x 2 (mult x (let x 3 y 4 (add x y))))"
  Output: 14
  Explanation: In the expression (add x y), when checking for the value of the variable x,
  we check from the innermost scope to the outermost in the context of the variable we are trying to evaluate.
  Since x = 3 is found first, the value of x is 3.
```

```
Example 2:
  Input: expression = "(let x 3 x 2 x)"
  Output: 2
  Explanation: Assignment in let statements is processed sequentially.
```

```
Example 3:
  Input: expression = "(let x 1 y 2 x (add x y) (add x y))"
  Output: 5
  Explanation: The first (add x y) evaluates as 3, and is assigned to x.
  The second (add x y) evaluates as 3+2 = 5.
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
