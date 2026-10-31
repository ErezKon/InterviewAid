# 1896. Minimum Cost to Change the Final Value of Expression

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-change-the-final-value-of-expression](https://leetcode.com/problems/minimum-cost-to-change-the-final-value-of-expression)
**Companies:** Google

---

## Problem Description

You are given a **valid** boolean expression as a string `expression` consisting of the characters `'1'`, `'0'`, `'&'` (bitwise **AND** operator), `'|'` (bitwise **OR** operator), `'('`, and `')'`.
- For example, `"()1|1"` and `"(1)&()"` are **not valid** while `"1"`, `"(((1))|(0))"`, and `"1|(0&(1))"` are **valid** expressions.

Return *the **minimum cost** to change the final value of the expression*.
- For example, if `expression = "1|1|(0&0)&1"`, its **value** is `1|1|(0&0)&1 = 1|1|0&1 = 1|0&1 = 1&1 = 1`. We want to apply operations so that the **new** expression evaluates to `0`.

The **cost** of changing the final value of an expression is the **number of operations** performed on the expression. The types of **operations** are described as follows:
- Turn a `'1'` into a `'0'`.
- Turn a `'0'` into a `'1'`.
- Turn a `'&'` into a `'|'`.
- Turn a `'|'` into a `'&'`.

**Note:** `'&'` does **not** take precedence over `'|'` in the **order of calculation**. Evaluate parentheses **first**, then in **left-to-right** order.

**Constraints:**
- `1 ≤ expression.length ≤ 10^5`
- `expression` only contains `'1'`, `'0'`, `'&'`, `'|'`, `'('`, and `')'`
- All parentheses are properly matched.
- There will be no empty parentheses (i.e: `"()"` is not a substring of `expression`).

## Examples

```
Example 1:
  Input: expression = "1&(0|1)"
  Output: 1
  Explanation: We can turn "1&(0|1)" into "1&(0&1)" by changing the '|' to a '&' using 1 operation.
  The new expression evaluates to 0.
```

```
Example 2:
  Input: expression = "(0&0)&(0&0&0)"
  Output: 3
  Explanation: We can turn "(0&0)&(0&0&0)" into "(0|1)|(0&0&0)" using 3 operations.
  The new expression evaluates to 1.
```

```
Example 3:
  Input: expression = "(0|(1|0&1))"
  Output: 1
  Explanation: We can turn "(0|(1|0&1))" into "(0|(0|0&1))" using 1 operation.
  The new expression evaluates to 0.
```

## Approach

**Algorithm:** Stack-based parsing with DP on sub-expressions

We parse the expression from left to right using two stacks:
- **valueStack** stores a pair `(value, minFlip)` for each sub-expression, where `value` is the current boolean result and `minFlip` is the minimum cost to toggle that result.
- **opStack** stores pending operators `'&'` or `'|'` and parentheses.

When we encounter a closing parenthesis `')'` or when the top of `opStack` has higher precedence, we pop two operands and an operator, combine them using truth-table logic, and push the resulting pair back onto `valueStack`.

Combination rules (pseudocode):
```
FUNCTION combine(left, right, op):
    IF op = '&' THEN
        resultVal ← left.value AND right.value
        // To flip result:
        //   - Flip one operand (cost = left.minFlip or right.minFlip)
        //   - Or flip the operator (cost = 1) and possibly adjust operands
        flipCost ← MIN(
            IF resultVal = 1 THEN MIN(left.minFlip, right.minFlip)      // make one operand 0
            ELSE MIN(1 + MIN(left.minFlip, right.minFlip),            // flip operator to '|'
                     left.minFlip + right.minFlip)                 // flip both operands
        )
    ELSE // op = '|'
        resultVal ← left.value OR right.value
        flipCost ← MIN(
            IF resultVal = 0 THEN MIN(left.minFlip, right.minFlip)
            ELSE MIN(1 + MIN(left.minFlip, right.minFlip),
                     left.minFlip + right.minFlip)
        )
    RETURN (resultVal, flipCost)
```

The algorithm proceeds until the entire string is processed; the final pair on `valueStack` gives the answer `minFlip`.

```text
FUNCTION minCostToFlip(expression):
    valStack ← []   // stores (value, minFlip)
    opStack ← []    // stores '&', '|', '('
    FOR token IN expression DO
        IF token = '(' THEN
            opStack.PUSH(token)
        ELSE IF token = ')' THEN
            WHILE opStack.TOP() ≠ '(' DO
                right ← valStack.POP()
                left  ← valStack.POP()
                op    ← opStack.POP()
                valStack.PUSH(combine(left, right, op))
            END WHILE
            opStack.POP()   // remove '('
        ELSE IF token IN '&|' THEN
            // operators have equal precedence, evaluate left-to-right
            WHILE opStack.NOT_EMPTY() AND opStack.TOP() ≠ '(' DO
                right ← valStack.POP()
                left  ← valStack.POP()
                op    ← opStack.POP()
                valStack.PUSH(combine(left, right, op))
            END WHILE
            opStack.PUSH(token)
        ELSE // token is '0' or '1'
            val ← IF token = '1' THEN 1 ELSE 0
            // flipping a literal costs 1
            valStack.PUSH((val, 1))
        END IF
    END FOR
    // Resolve remaining operators
    WHILE opStack.NOT_EMPTY() DO
        right ← valStack.POP()
        left  ← valStack.POP()
        op    ← opStack.POP()
        valStack.PUSH(combine(left, right, op))
    END WHILE
    RETURN valStack.TOP().minFlip
```

## Walkthrough

Consider the expression `1&0|1`:
| Step | Token | Action | Stack `valStack` (value, flip) | Stack `opStack` |
|------|-------|--------|------------------------------|----------------|
| 1 | `1` | push literal | [(1,1)] | [] |
| 2 | `&` | push op | [(1,1)] | [&] |
| 3 | `0` | push literal | [(1,1),(0,1)] | [&] |
| 4 | `|` | combine `1&0` → (0,1) then push `|` | [(0,1)] | [|] |
| 5 | `1` | push literal | [(0,1),(1,1)] | [|] |
| 6 | end | combine `0|1` → (1,1) | [(1,1)] | [] |
Result `minFlip = 1`.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(n)** – single pass over the expression with stack operations |
| Space  | **O(n)** – stacks store at most the length of the expression |

## Follow-Up Questions

1. How would the solution change if flipping an operator had a different cost than flipping a literal?
2. Can the algorithm be extended to support additional operators such as XOR (`^`)?
3. What if the expression length exceeds memory limits; can it be processed in a streaming fashion?

## Key Takeaway

By parsing the expression with stacks and maintaining for each sub-expression both its current value and the cheapest way to invert it, we can compute the minimum cost to flip the overall result in linear time.
