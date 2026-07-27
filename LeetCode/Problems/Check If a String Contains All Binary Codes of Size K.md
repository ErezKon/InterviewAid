# 1461. Check If a String Contains All Binary Codes of Size K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k](https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k)
**Companies:** Amazon, Google, Grammarly, Meta, Microsoft

---

```
FUNCTION hasAllCodes(s, k):
    seen = set()
    FOR i ← 0 TO len(s) - k:
        seen.ADD(s[i:i+k])
    RETURN len(seen) == 2^k
```
