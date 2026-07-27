# 158. Read N Characters Given read4 II - Call Multiple Times

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/read-n-characters-given-read4-ii-call-multiple-times](https://leetcode.com/problems/read-n-characters-given-read4-ii-call-multiple-times)
**Companies:** Apple, Bloomberg, Google, Lyft, Meta

---

```
CLASS Solution:
    CONSTRUCTOR:
        buf4 = [0] * 4
        i4 = 0; n4 = 0

    FUNCTION read(buf, n):
        total = 0
        WHILE total < n:
            IF i4 == n4:
                n4 = read4(buf4)
                i4 = 0
                IF n4 == 0: BREAK
            buf[total] = buf4[i4]
            total += 1
            i4 += 1
        RETURN total
```

Buffer leftover from read4. On next call, consume buffer first, then read more.
