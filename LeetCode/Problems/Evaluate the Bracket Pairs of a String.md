# 1807. Evaluate the Bracket Pairs of a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string](https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string)
**Companies:** Google, Remitly

---

## Problem Description

Given a string `s` containing bracket pairs like `(key)` and a list of `knowledge` pairs `[key, value]`, replace each `(key)` with its value, or `"?"` if the key is unknown.

---

## Key Insight

> Build a hashmap from knowledge pairs. Scan the string — when you see `(`, collect characters until `)` to get the key, then look it up.

---

## Approach: HashMap + Linear Scan — O(n) ✅

```
FUNCTION evaluate(s, knowledge):
    lookup = {k: v for k, v in knowledge}
    result = []
    i = 0
    WHILE i < len(s):
        IF s[i] == '(':
            j = s.INDEX(')', i)
            key = s[i+1 : j]
            result.ADD(lookup.GET(key, "?"))
            i = j + 1
        ELSE:
            result.ADD(s[i])
            i += 1
    RETURN "".JOIN(result)
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n + k) — n = string length, k = total knowledge chars |
| **Space** | O(n + k) |

---

## Key Takeaway

> **Template substitution: build a lookup map, scan for delimiters, replace keys with values. Straightforward string processing.**
