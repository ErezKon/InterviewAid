# 1446. Consecutive Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/consecutive-characters](https://leetcode.com/problems/consecutive-characters)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Meta

---

```
FUNCTION maxPower(s):
    maxLen = 1; curr = 1
    FOR i ← 1 TO len(s) - 1:
        IF s[i] == s[i-1]: curr += 1
        ELSE: curr = 1
        maxLen = MAX(maxLen, curr)
    RETURN maxLen
```
