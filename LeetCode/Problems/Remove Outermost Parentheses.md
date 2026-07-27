# 1021. Remove Outermost Parentheses

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-outermost-parentheses](https://leetcode.com/problems/remove-outermost-parentheses)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

```
FUNCTION removeOuterParentheses(s):
    result = []; depth = 0
    FOR c IN s:
        IF c == '(':
            IF depth > 0: result.ADD(c)
            depth += 1
        ELSE:
            depth -= 1
            IF depth > 0: result.ADD(c)
    RETURN JOIN(result)
```
