# 3335. Total Characters in String After Transformations I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-characters-in-string-after-transformations-i](https://leetcode.com/problems/total-characters-in-string-after-transformations-i)
**Companies:** Amazon, Google, Mathworks, Meta

---

```
FUNCTION lengthAfterTransformations(s, t):
    MOD = 10^9 + 7
    count = [0] * 26
    FOR c IN s: count[ord(c) - ord('a')] += 1

    FOR _ ← 0 TO t - 1:
        newCount = [0] * 26
        FOR i ← 0 TO 24: newCount[i + 1] = count[i]
        newCount[0] = (newCount[0] + count[25]) % MOD
        newCount[1] = (newCount[1] + count[25]) % MOD
        count = newCount

    RETURN SUM(count) % MOD
```
