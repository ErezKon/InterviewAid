# 3546. Equal Sum Grid Partition I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/equal-sum-grid-partition-i](https://leetcode.com/problems/equal-sum-grid-partition-i)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

```
FUNCTION canPartitionGrid(grid):
    total = SUM(all elements)
    IF total % 2 != 0: RETURN false
    half = total / 2
    // Try horizontal cuts
    rowSum = 0
    FOR r ← 0 TO m - 2:
        rowSum += SUM(grid[r])
        IF rowSum == half: RETURN true
    // Try vertical cuts
    colSum = 0
    FOR c ← 0 TO n - 2:
        colSum += SUM(grid[r][c] for r)
        IF colSum == half: RETURN true
    RETURN false
```
