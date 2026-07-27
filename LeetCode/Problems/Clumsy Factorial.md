# 1006. Clumsy Factorial

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/clumsy-factorial](https://leetcode.com/problems/clumsy-factorial)
**Companies:** Amazon, Bloomberg, Meta, Microsoft

---

```
FUNCTION clumsy(n):
    ops = ['*', '/', '+', '-']
    stack = [n]; opIdx = 0
    FOR i ← n - 1 DOWN TO 1:
        op = ops[opIdx % 4]
        IF op == '*': stack[-1] *= i
        ELSE IF op == '/': stack[-1] = int(stack[-1] / i)
        ELSE IF op == '+': stack.PUSH(i)
        ELSE: stack.PUSH(-i)
        opIdx += 1
    RETURN SUM(stack)
```
