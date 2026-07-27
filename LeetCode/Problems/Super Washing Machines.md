# 517. Super Washing Machines

**Difficulty:** 🔴 Hard

**Companies:** Amazon, Google
---

```
FUNCTION findMinMoves(machines):
    total = SUM(machines); n = len(machines)
    IF total % n != 0: RETURN -1
    target = total // n; maxMoves = 0; runningSum = 0
    FOR m IN machines:
        runningSum += m - target
        maxMoves = MAX(maxMoves, ABS(runningSum), m - target)
    RETURN maxMoves
```
