# 3271. Hash Divided String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/hash-divided-string](https://leetcode.com/problems/hash-divided-string)
**Companies:** Google

---

## 1. Problem Description

Divide string into groups of size `k`, hash each group by summing character values mod 26, and build result string from hash values.

## 2. Approach: Chunk + Hash — O(n) ✅

```
FUNCTION stringHash(s, k):
    result ← ""
    FOR i ← 0 TO LENGTH(s) - 1 STEP k DO
        hashVal ← SUM(ord(c) - ord('a') for c in s[i:i+k]) % 26
        result += chr(ord('a') + hashVal)
    RETURN result
```

## Key Takeaway

> Process string in chunks of size `k`, sum char values mod 26, convert back to character.
