# 1003. Check If Word Is Valid After Substitutions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-word-is-valid-after-substitutions](https://leetcode.com/problems/check-if-word-is-valid-after-substitutions)
**Companies:** Nutanix

---

## 1. Problem Description

A string is valid if it can be built by repeatedly inserting `"abc"` into itself (starting from empty). Given a string `s`, check if it's valid.

---

## 2. Approach: Stack — O(n) ✅

```
FUNCTION isValid(s):
    stack = []
    FOR ch IN s:
        stack.PUSH(ch)
        IF len(stack) >= 3 AND stack[-3:] == ['a','b','c']:
            stack.POP(); stack.POP(); stack.POP()
    RETURN len(stack) == 0
```

Similar to removing matching parentheses, but we remove `"abc"` sequences.

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Stack-based reduction: push characters and pop when the last 3 form `"abc"`. If the stack empties, the string is valid. Same pattern as valid parentheses but with a 3-char sequence.
