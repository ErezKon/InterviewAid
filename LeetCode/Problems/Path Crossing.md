# 1496. Path Crossing

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/path-crossing](https://leetcode.com/problems/path-crossing)
**Companies:** Amazon, Google, Yandex

---

```
FUNCTION isPathCrossing(path):
    x = y = 0; visited = {(0, 0)}
    FOR d IN path:
        IF d == 'N': y += 1
        ELSE IF d == 'S': y -= 1
        ELSE IF d == 'E': x += 1
        ELSE: x -= 1
        IF (x, y) IN visited: RETURN true
        visited.ADD((x, y))
    RETURN false
```
