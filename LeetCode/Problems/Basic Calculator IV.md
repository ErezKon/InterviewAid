# 770. Basic Calculator IV

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/basic-calculator-iv](https://leetcode.com/problems/basic-calculator-iv)
**Companies:** Google, Intuit, Roblox

---

## Problem Description
Given a string `expression` that represents a polynomial expression containing variables, integers, `+`, `-`, `*`, and parentheses, evaluate the expression. You are also given two arrays `evalvars` and `evalints` of equal length, where each variable in `evalvars[i]` should be replaced by the integer `evalints[i]`. Return the resulting expression as a list of terms sorted by descending degree and lexicographically.

## Examples
- **Input:** `expression = "e+8‑pow(2,3)"`, `evalvars = []`, `evalints = []` **Output:** `["e+8‑pow(2,3)"]` (placeholder example)
- **Input:** `expression = "a+b+c"`, `evalvars = ["b"], evalints = [2]` **Output:** `["a+2+c"]`

## Approach
Parse the expression into a polynomial represented as a map from term (sorted variable tuple) to coefficient. Implement recursive descent handling `+`, `-`, `*`, and parentheses. When a variable appears in `evalvars`, replace it with its integer value before combining terms. After evaluation, convert the map to a list of strings `coeff*var1*var2...` and sort by degree then lexicographically.

```text
FUNCTION basicCalculatorIV(expression, evalvars, evalints):
    // Build substitution map
    SET subs ← DICTIONARY()
    FOR i FROM 0 TO LENGTH(evalvars) - 1:
        subs[evalvars[i]] ← evalints[i]

    // Recursive parser returning polynomial map
    FUNCTION parseExpr():
        SET term ← parseTerm()
        WHILE nextToken IN ['+', '-']:
            SET op ← nextToken
            ADVANCE()
            SET nextTerm ← parseTerm()
            IF op == '+': term ← ADD_POLYNOMIALS(term, nextTerm)
            ELSE: term ← SUBTRACT_POLYNOMIALS(term, nextTerm)
        RETURN term

    FUNCTION parseTerm():
        SET factor ← parseFactor()
        WHILE nextToken == '*':
            ADVANCE()
            SET nextFactor ← parseFactor()
            factor ← MULTIPLY_POLYNOMIALS(factor, nextFactor)
        RETURN factor

    FUNCTION parseFactor():
        IF nextToken == '(':
            ADVANCE()
            SET sub ← parseExpr()
            EXPECT ')'
            ADVANCE()
            RETURN sub
        ELSE IF nextToken IS DIGIT:
            RETURN POLYNOMIAL_FROM_CONSTANT(INTEGER(nextToken))
        ELSE: // variable
            SET var ← nextToken
            ADVANCE()
            IF var IN subs:
                RETURN POLYNOMIAL_FROM_CONSTANT(subs[var])
            ELSE:
                RETURN POLYNOMIAL_FROM_TERM(1, [var])

    SET resultPoly ← parseExpr()
    RETURN FORMAT_POLYNOMIAL(resultPoly)
```

## Walkthrough
| Step | token | action | polynomial representation |
|------|-------|--------|---------------------------|
| 1 | `a` | variable term | {("a",):1}
| 2 | `+` | add next factor | ... |
| ... | after full parse | combined map of terms |

## Complexity Analysis
- **Time:** O(L · log L) where L is the length of the expression, due to sorting term keys during multiplication.
- **Space:** O(T) where T is the number of distinct terms generated.

## Follow‑Up Questions
1. How would you extend the parser to support exponentiation `^`?
2. Can the algorithm be optimized to avoid full term sorting by using a canonical representation?
3. How would you handle division of polynomials?

## Key Takeaway
Representing a polynomial as a map of sorted variable tuples allows systematic addition, subtraction, and multiplication while supporting variable substitution.
