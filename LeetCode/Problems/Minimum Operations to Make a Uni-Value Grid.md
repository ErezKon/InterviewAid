# 2033. Minimum Operations to Make a Uni-Value Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid](https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid)
**Companies:** Amazon, Epam Systems, Google, Meta, Microsoft

---

```
FUNCTION minOperations(grid, x):
    flat = sorted(all values in grid)
    // Check if all values have the same remainder mod x
    IF any((v - flat[0]) % x != 0 for v in flat): RETURN -1

    median = flat[len(flat) / 2]
    RETURN SUM(ABS(v - median) / x for v in flat)
```

Target the median. All diffs must be divisible by x.
