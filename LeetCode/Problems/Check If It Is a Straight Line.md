# 1232. Check If It Is a Straight Line

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-it-is-a-straight-line](https://leetcode.com/problems/check-if-it-is-a-straight-line)
**Companies:** Amazon, Datadog, Palantir

---

```
FUNCTION checkStraightLine(coordinates):
    dx = coordinates[1][0] - coordinates[0][0]
    dy = coordinates[1][1] - coordinates[0][1]
    FOR i ← 2 TO len(coordinates) - 1:
        x = coordinates[i][0] - coordinates[0][0]
        y = coordinates[i][1] - coordinates[0][1]
        IF dy * x != dx * y: RETURN false
    RETURN true
```
