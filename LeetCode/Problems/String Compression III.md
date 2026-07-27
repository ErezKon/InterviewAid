# 3163. String Compression III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/string-compression-iii](https://leetcode.com/problems/string-compression-iii)
**Companies:** Amazon, Apple, Google, Meta, Microsoft, Qualcomm, Tcs

---

```
FUNCTION compressedString(word):
    result = ""
    i = 0
    WHILE i < len(word):
        c = word[i]
        count = 0
        WHILE i < len(word) AND word[i] == c AND count < 9:
            count += 1
            i += 1
        result += str(count) + c
    RETURN result
```

Group consecutive same chars, max group size 9.
