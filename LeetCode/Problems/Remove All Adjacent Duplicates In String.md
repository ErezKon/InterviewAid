# 1047. Remove All Adjacent Duplicates In String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string)
**Companies:** Amazon, Apple, Bloomberg, Cisco, Deloitte, Fynd, Geico, Google, Grammarly, Meta, Microsoft, Oracle, Paytm, Ripple, Whatnot, Zoho

---

## Approach: Stack — O(n) ✅

```
FUNCTION removeDuplicates(s):
    stack = []
    FOR char IN s:
        IF stack AND stack.TOP() == char:
            stack.POP()
        ELSE:
            stack.PUSH(char)
    RETURN JOIN(stack)
```
