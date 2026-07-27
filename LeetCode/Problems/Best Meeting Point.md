# 296. Best Meeting Point

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/best-meeting-point](https://leetcode.com/problems/best-meeting-point)
**Companies:** Amazon, Applied Intuition, Doordash, Google, Linkedin, Meta, Microsoft, Snapchat, Twitter

---

## Approach: Median — O(mn) ✅

```
FUNCTION minTotalDistance(grid):
    rows = [r for r, c in all 1-cells sorted by r]
    cols = [c for r, c in all 1-cells sorted by c]

    medianR = rows[len(rows) / 2]
    medianC = cols[len(cols) / 2]

    RETURN SUM(ABS(r - medianR) for r in rows) + SUM(ABS(c - medianC) for c in cols)
```

Manhattan distance decomposes into independent x and y components. Median minimizes each.
