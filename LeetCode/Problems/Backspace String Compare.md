# 844. Backspace String Compare

**Difficulty:** 🟢 Easy
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/backspace-string-compare](https://leetcode.com/problems/backspace-string-compare)
**Companies:** Agoda, Amazon, Bloomberg, Goldman Sachs, Google, Ibm, Meta, Microsoft, Microstrategy, Oracle, Roku, Salesforce, Wayfair, Wells Fargo

---

## 1. Problem Description

Given two strings `s` and `t`, return `true` if they are equal when both are typed into empty text editors (`#` = backspace).

---

## 2. Approach 1: Stack — O(n)

```
FUNCTION process(s):
    stack = []
    FOR char IN s:
        IF char != '#': stack.PUSH(char)
        ELSE IF stack: stack.POP()
    RETURN stack

RETURN process(s) == process(t)
```

### Approach 2: Two Pointers from End — O(n), O(1) ✅

```
FUNCTION backspaceCompare(s, t):
    i, j = len(s)-1, len(t)-1

    WHILE i >= 0 OR j >= 0:
        i = getNextChar(s, i)
        j = getNextChar(t, j)

        IF i >= 0 AND j >= 0 AND s[i] != t[j]: RETURN false
        IF (i >= 0) != (j >= 0): RETURN false

        i -= 1; j -= 1

    RETURN true

FUNCTION getNextChar(s, i):
    skip = 0
    WHILE i >= 0:
        IF s[i] == '#': skip += 1; i -= 1
        ELSE IF skip > 0: skip -= 1; i -= 1
        ELSE: BREAK
    RETURN i
```

| Approach | Time | Space |
|----------|------|-------|
| Stack | O(n) | O(n) |
| **Two Pointers** | **O(n)** | **O(1)** |

---

## Key Takeaway

> Process from the end to handle backspaces without a stack. Count consecutive `#`s and skip that many characters.
