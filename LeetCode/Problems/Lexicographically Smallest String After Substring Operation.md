# 2734. Lexicographically Smallest String After Substring Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-substring-operation](https://leetcode.com/problems/lexicographically-smallest-string-after-substring-operation)
**Companies:** Agoda, Amazon, Goldman Sachs, Ibm

---

## 1. Problem Description

Choose a non-empty substring and decrement every character by 1 (wrapping 'a' → 'z'). Do this exactly once. Return the lex-smallest result.

---

## 2. Approach: Greedy — O(n) ✅

Skip leading 'a's, then decrement the contiguous non-'a' block. If all 'a's, change last char to 'z'.

```
FUNCTION smallestString(s):
    s = list(s)
    i = 0
    WHILE i < len(s) AND s[i] == 'a': i += 1
    IF i == len(s): s[-1] = 'z'; RETURN JOIN(s)
    WHILE i < len(s) AND s[i] != 'a':
        s[i] = chr(ord(s[i]) - 1); i += 1
    RETURN JOIN(s)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Skip leading 'a's (decrementing them makes them 'z', which is worse). Decrement the first contiguous non-'a' block. Edge case: all 'a's → change last to 'z'.
