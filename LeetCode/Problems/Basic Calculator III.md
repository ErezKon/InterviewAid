# 772. Basic Calculator III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/basic-calculator-iii](https://leetcode.com/problems/basic-calculator-iii)
**Companies:** Amazon, Coupang, Doordash, Google, Houzz, Hulu, Intuit, Jingchi, Meta, Microsoft, Motive, Oracle, Pocket Gems, Snapchat, Tiktok, Verkada

---

## Approach: Recursive Descent or Stack — O(n) ✅

Handle `+`, `-`, `*`, `/` with parentheses.

```
FUNCTION calculate(s):
    idx = 0

    FUNCTION parseExpr():
        stack = []
        num = 0
        sign = '+'

        WHILE idx < len(s):
            char = s[idx]
            idx += 1

            IF char is digit:
                num = num * 10 + int(char)

            IF char == '(':
                num = parseExpr()

            IF char in "+-*/)" OR idx == len(s):
                IF sign == '+': stack.PUSH(num)
                ELSE IF sign == '-': stack.PUSH(-num)
                ELSE IF sign == '*': stack.PUSH(stack.POP() * num)
                ELSE IF sign == '/': stack.PUSH(TRUNCATE(stack.POP() / num))

                sign = char
                num = 0

                IF char == ')': BREAK

        RETURN SUM(stack)

    RETURN parseExpr()
```

Combines Basic Calculator (#224) and Basic Calculator II (#227).
