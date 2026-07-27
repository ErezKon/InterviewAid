# 157. Read N Characters Given Read4

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/read-n-characters-given-read4](https://leetcode.com/problems/read-n-characters-given-read4)
**Companies:** Apple, Google, Meta

---

```
FUNCTION read(buf, n):
    total = 0
    buf4 = [' '] * 4
    WHILE total < n:
        count = read4(buf4)
        toRead = MIN(count, n - total)
        FOR i ← 0 TO toRead - 1:
            buf[total] = buf4[i]
            total += 1
        IF count < 4: BREAK
    RETURN total
```
