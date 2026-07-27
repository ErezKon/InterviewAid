# 3110. Score of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/score-of-a-string](https://leetcode.com/problems/score-of-a-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Return the sum of absolute differences between ASCII values of adjacent characters in string `s`.

---

## Approach

```
FUNCTION scoreOfString(s):
    RETURN SUM(ABS(ord(s[i]) - ord(s[i+1])) for i in range(len(s) - 1))
```

| Time | Space |
|------|-------|
| O(n) | O(1) |
