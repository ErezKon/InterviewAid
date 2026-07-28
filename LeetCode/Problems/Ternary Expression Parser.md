# 439. Ternary Expression Parser

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ternary-expression-parser](https://leetcode.com/problems/ternary-expression-parser)
**Companies:** Snapchat
---

## Problem Description
You are given a string `expression` representing a valid ternary expression. The expression contains digits, the characters `?` and `:` and follows the format `condition ? trueExpr : falseExpr`. The `condition` is a single digit `'0'` (false) or `'1'` (true). The expression may be nested. Evaluate the expression and return the resulting digit as a string.

## Examples
**Example 1:**
```
Input: expression = "1?2:3"
Output: "2"
Explanation: Since condition is 1 (true), result is the true branch.
```
**Example 2:**
```
Input: expression = "0?1:0?1:2"
Output: "2"
Explanation: The outer condition is 0 (false), so evaluate the false branch "0?1:2" which yields 2.
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

## Follow‑Up Questions
1. How would you modify the algorithm to support multi‑digit numbers?
2. Can the expression be evaluated using recursion instead of a stack?
3. What changes are needed if the condition can be any boolean expression rather than a single digit?

## Key Takeaway
Scanning the ternary expression from right to left with a stack lets you resolve nested conditions without recursion.
