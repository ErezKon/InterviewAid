# 119. Pascal's Triangle II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/pascals-triangle-ii](https://leetcode.com/problems/pascals-triangle-ii)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft

---

```
FUNCTION getRow(rowIndex):
    row = [1] * (rowIndex + 1)
    FOR i ← 1 TO rowIndex - 1:
        FOR j ← i DOWN TO 1:
            row[j] += row[j - 1]
    RETURN row
```

Build in-place from right to left to avoid overwriting.
