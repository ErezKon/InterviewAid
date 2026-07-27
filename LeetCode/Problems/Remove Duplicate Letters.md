# 316. Remove Duplicate Letters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-duplicate-letters](https://leetcode.com/problems/remove-duplicate-letters)
**Companies:** Amazon, Bloomberg, Bytedance, De Shaw, Expedia, Factset, Google, Increff, Meta, Microsoft, Paytm, Tiktok, Zoho

---

## Approach: Monotonic Stack + Greedy — O(n) ✅

```
FUNCTION removeDuplicateLetters(s):
    lastIndex = {c: i for i, c in enumerate(s)}
    stack = []
    inStack = set()

    FOR i, char IN enumerate(s):
        IF char IN inStack: CONTINUE

        WHILE stack AND char < stack.TOP() AND lastIndex[stack.TOP()] > i:
            inStack.REMOVE(stack.POP())

        stack.PUSH(char)
        inStack.ADD(char)

    RETURN JOIN(stack)
```

Greedy: keep lexicographically smallest result. Pop a char from stack if it's larger than current AND appears later.

Same as #1081 Smallest Subsequence of Distinct Characters.
