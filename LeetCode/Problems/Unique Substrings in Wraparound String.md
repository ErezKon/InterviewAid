# 467. Unique Substrings in Wraparound String

**Difficulty:** 🟡 Medium

**Companies:** Google, Maq Software
---

```
FUNCTION findSubstringInWraproundString(s):
    maxLen = defaultdict(int); length = 0
    FOR i ← 0 TO len(s) - 1:
        IF i > 0 AND (ord(s[i]) - ord(s[i-1])) % 26 == 1: length += 1
        ELSE: length = 1
        maxLen[s[i]] = MAX(maxLen[s[i]], length)
    RETURN SUM(maxLen.values())
```
