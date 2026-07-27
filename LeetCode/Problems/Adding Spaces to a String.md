# 2109. Adding Spaces to a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/adding-spaces-to-a-string](https://leetcode.com/problems/adding-spaces-to-a-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION addSpaces(s, spaces):
    result = []; j = 0
    FOR i, c IN enumerate(s):
        IF j < len(spaces) AND i == spaces[j]:
            result.ADD(' ')
            j += 1
        result.ADD(c)
    RETURN JOIN(result)
```
