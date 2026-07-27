# 65. Valid Number

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/valid-number](https://leetcode.com/problems/valid-number)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft, Nutanix

---

## Approach: DFA / State Machine — O(n) ✅

```
FUNCTION isNumber(s):
    seenDigit = false
    seenDot = false
    seenE = false

    FOR i, char IN enumerate(s):
        IF char.isdigit():
            seenDigit = true
        ELSE IF char == '.':
            IF seenDot OR seenE: RETURN false
            seenDot = true
        ELSE IF char in 'eE':
            IF seenE OR NOT seenDigit: RETURN false
            seenE = true
            seenDigit = false    // need digit after e
        ELSE IF char in '+-':
            IF i > 0 AND s[i-1] NOT IN 'eE': RETURN false
        ELSE:
            RETURN false

    RETURN seenDigit
```

Track what we've seen. Key rules: dot before e, sign only at start or after e, digit required before e and at end.
