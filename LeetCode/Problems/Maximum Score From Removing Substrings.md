# 1717. Maximum Score From Removing Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-score-from-removing-substrings](https://leetcode.com/problems/maximum-score-from-removing-substrings)
**Companies:** Amazon, Bloomberg, Google, Juspay, Meta, Microsoft, Swiggy

---

## Approach: Greedy Stack — O(n) ✅

```
FUNCTION maximumGain(s, x, y):
    // Remove higher-value pair first
    IF x < y:
        SWAP(x, y)
        first, second = "ba", "ab"
    ELSE:
        first, second = "ab", "ba"

    score = 0
    // Pass 1: remove higher-value pair
    stack1 = []
    FOR c IN s:
        IF stack1 AND stack1[-1] + c == first:
            stack1.POP()
            score += x
        ELSE:
            stack1.PUSH(c)

    // Pass 2: remove lower-value pair from remainder
    stack2 = []
    FOR c IN stack1:
        IF stack2 AND stack2[-1] + c == second:
            stack2.POP()
            score += y
        ELSE:
            stack2.PUSH(c)

    RETURN score
```
