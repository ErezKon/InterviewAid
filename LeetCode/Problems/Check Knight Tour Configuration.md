# 2596. Check Knight Tour Configuration

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-knight-tour-configuration](https://leetcode.com/problems/check-knight-tour-configuration)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION checkValidGrid(grid):
    IF grid[0][0] != 0: RETURN false
    n = len(grid)
    pos = [None] * (n * n)
    FOR r, c: pos[grid[r][c]] = (r, c)

    FOR i ← 1 TO n * n - 1:
        dr = ABS(pos[i][0] - pos[i-1][0])
        dc = ABS(pos[i][1] - pos[i-1][1])
        IF NOT ((dr == 1 AND dc == 2) OR (dr == 2 AND dc == 1)):
            RETURN false
    RETURN true
```
