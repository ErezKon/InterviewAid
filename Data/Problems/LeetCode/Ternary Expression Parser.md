# 439. Ternary Expression Parser

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ternary-expression-parser](https://leetcode.com/problems/ternary-expression-parser)
**Companies:** Snapchat
---

## Problem Description
Given a string `expression` representing arbitrarily nested ternary expressions, evaluate the expression, and return *the result of it*.

You can always assume that the given expression is valid and only contains digits, `'?'`, `':'`, `'T'`, and `'F'` where `'T'` is true and `'F'` is false. All the numbers in the expression are **one-digit** numbers (i.e., in the range `[0, 9]`).

The conditional expressions group right-to-left (as usual in most languages), and the result of the expression will always evaluate to either a digit, `'T'` or `'F'`.

**Constraints:**
- `5 <= expression.length <= 10^4`
- `expression` consists of digits, `'T'`, `'F'`, `'?'`, and `':'`.
- It is **guaranteed** that `expression` is a valid ternary expression and that each number is a **one-digit number**.

## Examples
```
Example 1:
  Input: expression = "T?2:3"
  Output: "2"
  Explanation: If true, then result is 2; otherwise result is 3.
```
```
Example 2:
  Input: expression = "F?1:T?4:5"
  Output: "4"
  Explanation: The conditional expressions group right-to-left. Using parenthesis, it is read/evaluated as:
  "(F ? 1 : (T ? 4 : 5))" --> "(F ? 1 : 4)" --> "4"
  or "(F ? 1 : (T ? 4 : 5))" --> "(T ? 4 : 5)" --> "4"
```
```
Example 3:
  Input: expression = "T?T?F:5:3"
  Output: "F"
  Explanation: The conditional expressions group right-to-left. Using parenthesis, it is read/evaluated as:
  "(T ? (T ? F : 5) : 3)" --> "(T ? F : 3)" --> "F"
  "(T ? (T ? F : 5) : 3)" --> "(T ? F : 5)" --> "F"
```

## Approach
Parse the expression from right to left using a stack. Whenever a `?` is encountered, pop the top two elements (true and false results) and the next character (condition). Push back the selected result based on the condition.

```text
FUNCTION parseTernary(expression):
    stack ← []
    FOR i FROM LENGTH(expression) - 1 DOWNTO 0:
        ch ← expression[i]
        IF ch == '?':
            trueVal ← POP(stack)
            falseVal ← POP(stack)
            condition ← POP(stack)   // should be '0' or '1'
            selected ← IF condition == '1' THEN trueVal ELSE falseVal
            PUSH(stack, selected)
        ELSE IF ch != ':':
            // digits are pushed directly
            PUSH(stack, ch)
    RETURN POP(stack)
```

## Walkthrough
Expression: "0?1:0?1:2"
| Step | Char | Stack after step |
|------|------|------------------|
| start | (rightmost) 2 | [2] |
| 1 | ':' | [2] |
| 2 | 1 | [2,1] |
| 3 | '?' | pop true=1, false=2, cond=0 → push 2 → [2] |
| 4 | ':' | [2] |
| 5 | 1 | [2,1] |
| 6 | '?' | pop true=1, false=2, cond=0 → push 2 → [2] |
| End | result = 2 |

## Complexity Analysis
- Time: O(n) where n is the length of the expression.
- Space: O(n) for the stack (worst case when all characters are digits).

## Follow-Up Questions
1. How would you modify the algorithm to support multi-digit numbers?
2. Can the expression be evaluated using recursion instead of a stack?
3. What changes are needed if the condition can be any boolean expression rather than a single digit?

## Key Takeaway
Scanning the ternary expression from right to left with a stack lets you resolve nested conditions without recursion.
