# 3174. Clear Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/clear-digits](https://leetcode.com/problems/clear-digits)
**Companies:** Amazon, Bloomberg, Flexera, Google, Meta

---

```
FUNCTION clearDigits(s):
    stack = []
    FOR c IN s:
        IF c.isdigit() AND stack:
            stack.POP()
        ELSE:
            stack.PUSH(c)
    RETURN JOIN(stack)
```
