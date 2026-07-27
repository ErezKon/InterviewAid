# 3816. Lexicographically Smallest String After Deleting Duplicate Characters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-deleting-duplicate-characters](https://leetcode.com/problems/lexicographically-smallest-string-after-deleting-duplicate-characters)
**Companies:** Meta, Paytm

---

## 1. Problem Description

Remove duplicate characters so each appears at most once, producing the lexicographically smallest result while preserving relative order.

---

## 2. Approach: Monotonic Stack + Last Occurrence — O(n) ✅

Same pattern as "Remove Duplicate Letters" (LC 316).

```
FUNCTION removeDuplicateLetters(s):
    lastIdx = {c: i for i, c in enumerate(s)}
    stack = []; inStack = set()
    FOR i, c IN enumerate(s):
        IF c IN inStack: CONTINUE
        WHILE stack AND c < stack[-1] AND lastIdx[stack[-1]] > i:
            inStack.REMOVE(stack.POP())
        stack.PUSH(c); inStack.ADD(c)
    RETURN JOIN(stack)
```

| Time | Space |
|------|-------|
| O(n) | O(26) = O(1) |

---

## 3. Key Takeaway

> Monotonic stack: pop larger chars if they appear later. Track last occurrence to know if a char can be safely removed. Classic greedy + stack pattern.
