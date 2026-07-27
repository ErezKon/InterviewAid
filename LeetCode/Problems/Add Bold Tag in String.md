# 616. Add Bold Tag in String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/add-bold-tag-in-string](https://leetcode.com/problems/add-bold-tag-in-string)
**Companies:** Google, Gusto, Meta, Tiktok

---

```
FUNCTION addBoldTag(s, words):
    bold = [false] * len(s)
    FOR word IN words:
        start = s.find(word)
        WHILE start != -1:
            FOR i ← start TO start + len(word) - 1:
                bold[i] = true
            start = s.find(word, start + 1)

    result = []
    FOR i, c IN enumerate(s):
        IF bold[i] AND (i == 0 OR NOT bold[i-1]): result.ADD("<b>")
        result.ADD(c)
        IF bold[i] AND (i == len(s)-1 OR NOT bold[i+1]): result.ADD("</b>")

    RETURN JOIN(result)
```
