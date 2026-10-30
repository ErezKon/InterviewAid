# 2019. The Score of Students Solving Math Expression

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-score-of-students-solving-math-expression](https://leetcode.com/problems/the-score-of-students-solving-math-expression)
**Companies:** Flipkart, Meta

---

## Problem Description
You are given a string `s` that contains digits `0-9`, addition symbols `'+'`, and multiplication symbols `'*'` **only**, representing a **valid** math expression of **single digit numbers** (e.g., `3+5*2`). This expression was given to `n` elementary school students. The students were instructed to get the answer of the expression by following this **order of operations**:

1. Compute **multiplication**, reading from **left to right**; Then,
2. Compute **addition**, reading from **left to right**.

You are given an integer array `answers` of length `n`, which are the submitted answers of the students in no particular order. You are asked to grade the `answers`, by following these **rules**:

- If an answer **equals** the correct answer of the expression, this student will be rewarded `5` points;
- Otherwise, if the answer **could be interpreted** as if the student applied the operators **in the wrong order** but had **correct arithmetic**, this student will be rewarded `2` points;
- Otherwise, this student will be rewarded `0` points.

Return *the sum of the points of the students*.

**Constraints:**
- `3 <= s.length <= 31`
- `s` represents a valid expression that contains only digits `0-9`, `'+'`, and `'*'` only.
- All the integer operands in the expression are in the **inclusive** range `[0, 9]`.
- `1 <=` The count of all operators (`'+'` and `'*'`) in the math expression `<= 15`
- Test data are generated such that the correct answer of the expression is in the range of `[0, 1000]`.
- Test data are generated such that value never exceeds `10^9` in intermediate steps of multiplication.
- `n == answers.length`
- `1 <= n <= 10^4`
- `0 <= answers[i] <= 1000`

## Examples
```
Example 1:
  Input: s = "7+3*1*2", answers = [20,13,42]
  Output: 7
  Explanation: The correct answer of the expression is 13, therefore one student is rewarded 5 points: [20,13,42]
  A student might have applied the operators in this wrong order: ((7+3)*1)*2 = 20. Therefore one student
  is rewarded 2 points: [20,13,42]
  The points for the students are: [2,5,0]. The sum of the points is 2+5+0=7.
```
```
Example 2:
  Input: s = "3+5*2", answers = [13,0,10,13,13,16,16]
  Output: 19
  Explanation: The correct answer of the expression is 13, therefore three students are rewarded 5 points
  each: [13,0,10,13,13,16,16]
  A student might have applied the operators in this wrong order: ((3+5)*2 = 16. Therefore two students
  are rewarded 2 points: [13,0,10,13,13,16,16]
  The points for the students are: [5,0,0,5,5,2,2]. The sum of the points is 5+0+0+5+5+2+2=19.
```
```
Example 3:
  Input: s = "6+0*1", answers = [12,9,6,4,8,6]
  Output: 10
  Explanation: The correct answer of the expression is 6.
  If a student had incorrectly done (6+0)*1, the answer would also be 6.
  By the rules of grading, the students will still be rewarded 5 points (as they got the correct answer), not 2 points.
  The points for the students are: [0,0,5,0,0,5]. The sum of the points is 10.
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
