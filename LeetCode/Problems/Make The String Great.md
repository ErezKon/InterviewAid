# 1544. Make The String Great

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-the-string-great](https://leetcode.com/problems/make-the-string-great)
**Companies:** Amazon, Blackstone, Bloomberg, Google

---

## 1. Problem Description

Remove adjacent characters that are the same letter but different case (e.g., "aA"). Repeat until no more such pairs exist.

---

## 2. Approach: Stack — O(n) ✅

```
FUNCTION makeGood(s):
    stack = []
    FOR c IN s:
        IF stack AND stack[-1] != c AND stack[-1].lower() == c.lower():
            stack.POP()
        ELSE:
            stack.PUSH(c)
    RETURN JOIN(stack)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Stack-based removal: if top of stack and current char are same letter but different case, pop. Otherwise push. Same pattern as removing adjacent duplicates.
