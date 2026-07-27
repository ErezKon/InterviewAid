# 2434. Using a Robot to Print the Lexicographically Smallest String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string](https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string)
**Companies:** Amazon, De Shaw, Meta, Nagarro, Salesforce, Tower Research

---

## Approach: Stack + Suffix Min — O(n) ✅

```
FUNCTION robotWithString(s):
    n = len(s)
    // suffixMin[i] = min char in s[i:]
    suffixMin = [0] * n
    suffixMin[-1] = s[-1]
    FOR i ← n - 2 DOWN TO 0:
        suffixMin[i] = MIN(s[i], suffixMin[i + 1])

    stack = []
    result = []

    FOR i ← 0 TO n - 1:
        stack.PUSH(s[i])
        nextMin = suffixMin[i + 1] IF i + 1 < n ELSE 'z' + 1
        WHILE stack AND stack[-1] <= nextMin:
            result.ADD(stack.POP())

    RETURN JOIN(result)
```
