# 770. Basic Calculator IV

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/basic-calculator-iv](https://leetcode.com/problems/basic-calculator-iv)
**Companies:** Google, Intuit, Roblox

---

## Problem Description
Given an expression such as `expression = "e + 8 - a + 5"` and an evaluation map such as `{"e": 1}` (given in terms of `evalvars = ["e"]` and `evalints = [1]`), return a list of tokens representing the simplified expression, such as `["-1*a","14"]`

- An expression alternates chunks and symbols, with a space separating each chunk and symbol.
- A chunk is either an expression in parentheses, a variable, or a non-negative integer.
- A variable is a string of lowercase letters (not including digits.) Note that variables can be multiple letters, and note that variables never have a leading coefficient or unary operator like `"2x"` or `"-x"`.

Expressions are evaluated in the usual order: brackets first, then multiplication, then addition and subtraction.

- For example, `expression = "1 + 2 * 3"` has an answer of `["7"]`.

The format of the output is as follows:

- For each term of free variables with a non-zero coefficient, we write the free variables within a term in sorted order lexicographically.
  - For example, we would never write a term like `"b*a*c"`, only `"a*b*c"`.
- Terms have degrees equal to the number of free variables being multiplied, counting multiplicity. We write the largest degree terms of our answer first, breaking ties by lexicographic order ignoring the leading coefficient of the term.
  - For example, `"a*a*b*c"` has degree `4`.
- The leading coefficient of the term is placed directly to the left with an asterisk separating it from the variables (if they exist.) A leading coefficient of 1 is still printed.
- An example of a well-formatted answer is `["-2*a*a*a", "3*a*a*b", "3*b*b", "4*a", "5*c", "-6"]`.
- Terms (including constant terms) with coefficient `0` are not included.
  - For example, an expression of `"0"` has an output of `[]`.

**Note:** You may assume that the given expression is always valid. All intermediate results will be in the range of `[-2³¹, 2³¹ - 1]`.

**Constraints:**
- `1 ≤ expression.length ≤ 250`
- `expression` consists of lowercase English letters, digits, `'+'`, `'-'`, `'*'`, `'('`, `')'`, `' '`.
- `expression` does not contain any leading or trailing spaces.
- All the tokens in `expression` are separated by a single space.
- `0 ≤ evalvars.length ≤ 100`
- `1 ≤ evalvars[i].length ≤ 20`
- `evalvars[i]` consists of lowercase English letters.
- `evalints.length == evalvars.length`
- `-100 ≤ evalints[i] ≤ 100`

## Examples
```
Example 1:
  Input: expression = "e + 8 - a + 5", evalvars = ["e"], evalints = [1]
  Output: ["-1*a","14"]

Example 2:
  Input: expression = "e - 8 + temperature - pressure", evalvars = ["e", "temperature"], evalints = [1, 12]
  Output: ["-1*pressure","5"]

Example 3:
  Input: expression = "(e + 8) * (e - 8)", evalvars = [], evalints = []
  Output: ["1*e*e","-64"]
```

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
- **Time:** O(L · log L) where L is the length of the expression, due to sorting term keys during multiplication.
- **Space:** O(T) where T is the number of distinct terms generated.

## Follow-Up Questions
1. How would you extend the parser to support exponentiation `^`?
2. Can the algorithm be optimized to avoid full term sorting by using a canonical representation?
3. How would you handle division of polynomials?

## Key Takeaway
Representing a polynomial as a map of sorted variable tuples allows systematic addition, subtraction, and multiplication while supporting variable substitution.
