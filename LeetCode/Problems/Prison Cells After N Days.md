# 957. Prison Cells After N Days

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/prison-cells-after-n-days](https://leetcode.com/problems/prison-cells-after-n-days)
**Companies:** Amazon

---

## Approach: Cycle Detection — O(2^6) ✅

```
FUNCTION prisonAfterNDays(cells, n):
    seen = {}

    FOR day ← 0 TO n - 1:
        state = tuple(cells)
        IF state IN seen:
            cycleLen = day - seen[state]
            remaining = (n - day) % cycleLen
            FOR _ ← 0 TO remaining - 1:
                cells = nextDay(cells)
            RETURN cells
        seen[state] = day
        cells = nextDay(cells)

    RETURN cells

FUNCTION nextDay(cells):
    new = [0] * 8
    FOR i ← 1 TO 6:
        new[i] = 1 IF cells[i-1] == cells[i+1] ELSE 0
    RETURN new
```

Only 2^6 = 64 possible states for the 6 inner cells → cycle guaranteed within 64 steps.
