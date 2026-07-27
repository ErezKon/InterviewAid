# 292. Nim Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/nim-game](https://leetcode.com/problems/nim-game)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION canWinNim(n):
    RETURN n % 4 != 0
```

If n is a multiple of 4, you always lose. Otherwise, take enough to leave opponent a multiple of 4.
