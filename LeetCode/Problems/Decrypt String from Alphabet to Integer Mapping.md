# 1309. Decrypt String from Alphabet to Integer Mapping

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping](https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping)
**Companies:** Bloomberg, Google, Meta, Microsoft, Oracle

---

## Problem Description

Decode a string where `1-9` map to `a-i` and `10#-26#` map to `j-z`.

---

## Approach

```
FUNCTION freqAlphabets(s):
    result = []
    i = len(s) - 1
    WHILE i >= 0:
        IF s[i] == '#':
            result.ADD(chr(int(s[i-2:i]) + ord('a') - 1))
            i -= 3
        ELSE:
            result.ADD(chr(int(s[i]) + ord('a') - 1))
            i -= 1
    RETURN JOIN(reversed(result))
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Parse from right to left: if current char is `#`, consume 3 characters (two-digit number), else consume 1. Map number to letter via ASCII offset.**
