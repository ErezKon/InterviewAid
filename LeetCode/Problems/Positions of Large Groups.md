# 830. Positions of Large Groups

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/positions-of-large-groups](https://leetcode.com/problems/positions-of-large-groups)
**Companies:** Google

---

```
FUNCTION largeGroupPositions(s):
    result = []
    i = 0
    WHILE i < len(s):
        j = i
        WHILE j < len(s) AND s[j] == s[i]: j += 1
        IF j - i >= 3: result.ADD([i, j - 1])
        i = j
    RETURN result
```
