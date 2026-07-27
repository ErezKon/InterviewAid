# 1392. Longest Happy Prefix

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-happy-prefix](https://leetcode.com/problems/longest-happy-prefix)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Find the longest prefix of string `s` that is also a suffix (non-empty, not the entire string).

---

## 2. Approach: KMP Failure Function — O(n) ✅

```
FUNCTION longestPrefix(s):
    n = len(s)
    lps = [0] * n
    j = 0

    FOR i ← 1 TO n - 1:
        WHILE j > 0 AND s[i] != s[j]: j = lps[j - 1]
        IF s[i] == s[j]: j += 1
        lps[i] = j

    RETURN s[:lps[-1]]
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> The KMP failure function `lps[n-1]` directly gives the length of the longest proper prefix that is also a suffix. Also solvable with rolling hash (Rabin-Karp).
