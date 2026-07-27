# 1945. Sum of Digits of String After Convert

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-digits-of-string-after-convert](https://leetcode.com/problems/sum-of-digits-of-string-after-convert)
**Companies:** Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION getLucky(s, k):
    numStr = "".join(str(ord(c) - ord('a') + 1) for c in s)
    FOR _ ← 0 TO k - 1:
        numStr = str(sum(int(d) for d in numStr))
    RETURN int(numStr)
```
