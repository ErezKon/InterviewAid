# 554. Brick Wall

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/brick-wall](https://leetcode.com/problems/brick-wall)
**Companies:** Amazon, Bloomberg, Google, Kla, Meta, Microsoft

---

## Approach: Hash Map — O(total bricks) ✅

```
FUNCTION leastBricks(wall):
    edgeCount = Counter()
    FOR row IN wall:
        pos = 0
        FOR i ← 0 TO len(row) - 2:    // skip last brick
            pos += row[i]
            edgeCount[pos] += 1

    RETURN len(wall) - MAX(edgeCount.values(), default=0)
```

Count edge positions. A vertical line through the most edges crosses the fewest bricks.
