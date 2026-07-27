# 682. Baseball Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/baseball-game](https://leetcode.com/problems/baseball-game)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Turing

---

```
FUNCTION calPoints(operations):
    stack = []
    FOR op IN operations:
        IF op == '+': stack.PUSH(stack[-1] + stack[-2])
        ELSE IF op == 'D': stack.PUSH(2 * stack[-1])
        ELSE IF op == 'C': stack.POP()
        ELSE: stack.PUSH(int(op))
    RETURN SUM(stack)
```
