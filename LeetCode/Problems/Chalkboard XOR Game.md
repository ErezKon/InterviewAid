# 810. Chalkboard XOR Game

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/chalkboard-xor-game](https://leetcode.com/problems/chalkboard-xor-game)
**Companies:** Garena, Google, Hashedin

---

```
FUNCTION xorGame(nums):
    xorAll = XOR of all nums
    RETURN xorAll == 0 OR len(nums) % 2 == 0
```

If XOR is 0, current player wins. If even count, Alice can always force a win.
