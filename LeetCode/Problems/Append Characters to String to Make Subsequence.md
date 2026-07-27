# 2486. Append Characters to String to Make Subsequence

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Microsoft
---

```
FUNCTION appendCharacters(s, t):
    j = 0
    FOR c IN s:
        IF j < len(t) AND c == t[j]: j += 1
    RETURN len(t) - j
```
