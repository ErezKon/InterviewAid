# 833. Find And Replace in String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-and-replace-in-string](https://leetcode.com/problems/find-and-replace-in-string)
**Companies:** Bloomberg, Google

---

## Problem Description

Simultaneously apply replacements to string `s`. For each `(index, source, target)`: if `source` matches at `index`, replace it with `target`. Replacements don't affect each other.

---

## Approach: Process Right to Left — O(n) ✅

```
FUNCTION findReplaceString(s, indices, sources, targets):
    ops = sorted(zip(indices, sources, targets), reverse=True)
    FOR idx, src, tgt IN ops:
        IF s[idx:idx+len(src)] == src:
            s = s[:idx] + tgt + s[idx+len(src):]
    RETURN s
```

Processing right-to-left ensures earlier indices remain valid.

---

## Key Takeaway

> **Sort replacements by index descending and apply right-to-left so earlier positions aren't shifted. Classic string mutation pattern.**
