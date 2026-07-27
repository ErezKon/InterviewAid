# 1422. Maximum Score After Splitting a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-score-after-splitting-a-string](https://leetcode.com/problems/maximum-score-after-splitting-a-string)
**Companies:** Amazon, Google, Meta

---

```
FUNCTION maxScore(s):
    ones = s.count('1'); zeros = 0; maxS = 0
    FOR i ← 0 TO len(s) - 2:
        IF s[i] == '0': zeros += 1
        ELSE: ones -= 1
        maxS = MAX(maxS, zeros + ones)
    RETURN maxS
```
