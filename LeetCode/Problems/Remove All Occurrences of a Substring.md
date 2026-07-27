# 1910. Remove All Occurrences of a Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-all-occurrences-of-a-substring](https://leetcode.com/problems/remove-all-occurrences-of-a-substring)
**Companies:** Amazon, Arista Networks, Bloomberg, Geico, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Tcs, Twitter, Zoho

---

## Approach: Stack-based — O(n·m) ✅

```
FUNCTION removeOccurrences(s, part):
    stack = []
    FOR char IN s:
        stack.PUSH(char)
        IF len(stack) >= len(part) AND JOIN(stack[-len(part):]) == part:
            FOR _ ← 0 TO len(part) - 1:
                stack.POP()
    RETURN JOIN(stack)
```

Build result character by character. After each addition, check if the tail matches `part`.
