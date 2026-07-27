# 657. Robot Return to Origin

**Difficulty:** 🟢 Easy
**Acceptance:** 76.0%
**LeetCode:** [https://leetcode.com/problems/robot-return-to-origin](https://leetcode.com/problems/robot-return-to-origin)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Microsoft

---

## Approach: Count Moves — O(n) ✅

```
FUNCTION judgeCircle(moves):
    x = y = 0
    FOR move IN moves:
        IF move == 'U': y += 1
        ELSE IF move == 'D': y -= 1
        ELSE IF move == 'L': x -= 1
        ELSE: x += 1
    RETURN x == 0 AND y == 0
```

Or simply: `count('U') == count('D') AND count('L') == count('R')`.
