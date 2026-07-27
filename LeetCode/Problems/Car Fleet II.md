# 1776. Car Fleet II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/car-fleet-ii](https://leetcode.com/problems/car-fleet-ii)
**Companies:** Amazon, Google, Microsoft

---

```
FUNCTION getCollisionTimes(cars):
    n = len(cars); result = [-1.0] * n
    stack = []
    FOR i ← n - 1 DOWN TO 0:
        WHILE stack:
            j = stack[-1]
            IF cars[i][1] <= cars[j][1]: stack.POP(); CONTINUE
            t = (cars[j][0] - cars[i][0]) / (cars[i][1] - cars[j][1])
            IF result[j] < 0 OR t <= result[j]: BREAK
            stack.POP()
        IF stack: result[i] = (cars[stack[-1]][0] - cars[i][0]) / (cars[i][1] - cars[stack[-1]][1])
        stack.PUSH(i)
    RETURN result
```
