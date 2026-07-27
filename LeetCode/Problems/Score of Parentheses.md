# 856. Score of Parentheses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/score-of-parentheses](https://leetcode.com/problems/score-of-parentheses)
**Companies:** Bloomberg, Google, Meta, Snapchat, Tiktok

---

## Problem Description

Given a balanced parentheses string, compute its score: `()` = 1, `(A)` = 2×A, `AB` = A+B.

- **Example:** `"(()(()))"` → `2*(1 + 2*1)` = `6`

---

## Approach

```
FUNCTION scoreOfParentheses(s):
    stack = [0]
    FOR c IN s:
        IF c == '(':
            stack.PUSH(0)
        ELSE:
            inner = stack.POP()
            stack[-1] += MAX(2 * inner, 1)
    RETURN stack[0]
```

`() = 1`, `(A) = 2*A`, `AB = A+B`. Stack tracks current depth score.

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Stack-based expression evaluation: `(` pushes a new scope, `)` pops and doubles (or uses 1 if empty). The stack bottom accumulates the final answer.
