# 401. Binary Watch

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-watch](https://leetcode.com/problems/binary-watch)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION readBinaryWatch(turnedOn):
    result = []
    FOR h ← 0 TO 11:
        FOR m ← 0 TO 59:
            IF bin(h).count('1') + bin(m).count('1') == turnedOn:
                result.ADD(f"{h}:{m:02d}")
    RETURN result
```
