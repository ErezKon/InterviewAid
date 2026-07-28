# 2019. The Score of Students Solving Math Expression

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-score-of-students-solving-math-expression](https://leetcode.com/problems/the-score-of-students-solving-math-expression)
**Companies:** Flipkart, Meta

---

## Problem Description
Given a string `expression` that represents a valid arithmetic expression containing non‑negative integers, `+`, `-`, `*`, `/` and parentheses, and an array `answers` of students' evaluated results, compute the score of the students. The score is the sum of points: a correct answer gets 5 points, an answer that differs from the correct result by exactly 1 gets 2 points, otherwise 0 points.

## Examples
**Example 1:**
```
expression = "2+3*4"
answers = [14, 20, 13]
Correct result = 14
Score = 5 (exact) + 0 + 2 (diff 1) = 7
```
**Example 2:**
```
expression = "(1+2)*(3-1)"
answers = [6,5,7]
Correct result = 6
Score = 5 + 2 + 0 = 7
```

## Approach
1. Evaluate the arithmetic expression using a stack‑based Shunting‑Yard algorithm to handle operator precedence and parentheses, obtaining the correct integer result.
2. Iterate over `answers` and award points based on the difference to the correct result.

```text
FUNCTION evaluate(expr):
    opStack ← STACK()
    valStack ← STACK()
    FOR token IN tokenize(expr):
        IF token IS number:
            PUSH valStack, token
        ELSE IF token IS '(':
            PUSH opStack, token
        ELSE IF token IS ')':
            WHILE TOP(opStack) ≠ '(':
                APPLY_TOP_OPERATOR(opStack, valStack)
            POP opStack   // remove '('
        ELSE: // operator + - * /
            WHILE opStack NOT EMPTY AND precedence(TOP(opStack)) ≥ precedence(token):
                APPLY_TOP_OPERATOR(opStack, valStack)
            PUSH opStack, token
    WHILE opStack NOT EMPTY:
        APPLY_TOP_OPERATOR(opStack, valStack)
    RETURN POP valStack

FUNCTION APPLY_TOP_OPERATOR(opStack, valStack):
    op ← POP opStack
    b ← POP valStack
    a ← POP valStack
    IF op = '+': PUSH valStack, a + b
    IF op = '-': PUSH valStack, a - b
    IF op = '*': PUSH valStack, a * b
    IF op = '/': PUSH valStack, a / b   // integer division

FUNCTION scoreStudents(expression, answers):
    correct ← evaluate(expression)
    total ← 0
    FOR ans IN answers:
        diff ← ABS(ans - correct)
        IF diff = 0: total ← total + 5
        ELSE IF diff = 1: total ← total + 2
    RETURN total
```
The helper `APPLY_TOP_OPERATOR` performs the arithmetic for the top operator.

## Walkthrough
| Step | Token | Action | valStack | opStack |
|------|-------|--------|----------|----------|
| 1 | 2 | push 2 | [2] | [] |
| 2 | + | push '+' | [2] | ['+'] |
| 3 | 3 | push 3 | [2,3] | ['+'] |
| 4 | * | precedence higher than '+' → push '*' | [2,3] | ['+','*'] |
| 5 | 4 | push 4 | [2,3,4] | ['+','*'] |
| 6 | end | apply '*' → 3*4=12, then '+' → 2+12=14 | [14] | [] |
| 7 | scoring answers | correct=14, answers [14,20,13] → points 5+0+2 = 7 |

## Complexity Analysis
- **Time:** O(L) to evaluate the expression where L is its length, plus O(m) for scoring m answers.
- **Space:** O(L) for operator and value stacks.

## Follow‑Up Questions
1. How would you modify the evaluator to support floating‑point numbers and rounding rules?
2. Can the scoring be extended to give partial credit for answers off by more than 1 (e.g., quadratic penalty)?
3. How would you handle very large expressions that exceed typical integer ranges?

## Key Takeaway
Use a stack‑based evaluator to compute the exact result, then compare each student answer to award points based on proximity.
