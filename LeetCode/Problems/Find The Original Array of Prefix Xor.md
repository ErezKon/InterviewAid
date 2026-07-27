# 2433. Find The Original Array of Prefix Xor

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-original-array-of-prefix-xor](https://leetcode.com/problems/find-the-original-array-of-prefix-xor)
**Companies:** Google, Microsoft, Morgan Stanley, Nvidia

---

```
FUNCTION findArray(pref):
    result = [pref[0]]
    FOR i ← 1 TO len(pref) - 1:
        result.ADD(pref[i] ^ pref[i-1])
    RETURN result
```
