# 1351. Count Negative Numbers in a Sorted Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix](https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix)
**Companies:** Amazon, Arista Networks, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION countNegatives(grid):
    count = 0
    col = len(grid[0]) - 1
    FOR row IN grid:
        WHILE col >= 0 AND row[col] < 0: col -= 1
        count += len(grid[0]) - col - 1
    RETURN count
```

Staircase pattern: O(m + n).
