# 1106. Parsing A Boolean Expression

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/parsing-a-boolean-expression](https://leetcode.com/problems/parsing-a-boolean-expression)
**Companies:** Affinity, Amazon, Bloomberg, Goldman Sachs, Google, Hilabs, Meta, Microsoft

---

## Approach: Stack — O(n) ✅

```
FUNCTION parseBoolExpr(expression):
    stack = []

    FOR char IN expression:
        IF char == ',': CONTINUE
        ELSE IF char != ')':
            stack.PUSH(char)
        ELSE:
            // Collect operands until '('
            operands = []
            WHILE stack.TOP() != '(':
                operands.ADD(stack.POP())
            stack.POP()    // remove '('
            operator = stack.POP()

            IF operator == '!':
                result = 'f' IF operands[0] == 't' ELSE 't'
            ELSE IF operator == '&':
                result = 'f' IF 'f' IN operands ELSE 't'
            ELSE:    // '|'
                result = 't' IF 't' IN operands ELSE 'f'

            stack.PUSH(result)

    RETURN stack[0] == 't'
```
