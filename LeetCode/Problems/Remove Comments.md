# 722. Remove Comments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-comments](https://leetcode.com/problems/remove-comments)
**Companies:** Google, Microsoft, Uber

---

```
FUNCTION removeComments(source):
    inBlock = false; result = []; buf = []
    FOR line IN source:
        i = 0
        IF NOT inBlock: buf = []
        WHILE i < len(line):
            IF inBlock:
                IF line[i:i+2] == '*/': inBlock = false; i += 2
                ELSE: i += 1
            ELSE:
                IF line[i:i+2] == '/*': inBlock = true; i += 2
                ELSE IF line[i:i+2] == '//': BREAK
                ELSE: buf.ADD(line[i]); i += 1
        IF NOT inBlock AND buf: result.ADD(JOIN(buf))
    RETURN result
```
