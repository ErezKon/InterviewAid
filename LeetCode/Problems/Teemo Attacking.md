# 495. Teemo Attacking

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/teemo-attacking](https://leetcode.com/problems/teemo-attacking)
**Companies:** Amazon, Google, Jane Street, Riot Games, Tcs

---

```
FUNCTION findPoisonedDuration(timeSeries, duration):
    total = 0
    FOR i ← 0 TO n - 2:
        total += MIN(duration, timeSeries[i+1] - timeSeries[i])
    RETURN total + duration
```
