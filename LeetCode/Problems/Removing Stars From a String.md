# 2390. Removing Stars From a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/removing-stars-from-a-string](https://leetcode.com/problems/removing-stars-from-a-string)
**Companies:** Amazon, Google, Ibm, Microsoft

---

## Approach: Stack — O(n) ✅

```
FUNCTION removeStars(s):
    stack = []
    FOR char IN s:
        IF char == '*':
            stack.POP()
        ELSE:
            stack.PUSH(char)
    RETURN JOIN(stack)
```
