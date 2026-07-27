# 2643. Row With Maximum Ones

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/row-with-maximum-ones](https://leetcode.com/problems/row-with-maximum-ones)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Given an `m × n` binary matrix, return `[rowIndex, onesCount]` for the row with the most 1s. If tied, return the smallest row index.

---

## Approach

```
FUNCTION rowAndMaximumOnes(mat):
    maxOnes = -1; maxRow = 0
    FOR i, row IN enumerate(mat):
        ones = SUM(row)
        IF ones > maxOnes: maxOnes = ones; maxRow = i
    RETURN [maxRow, maxOnes]
```

| Time | Space |
|------|-------|
| O(m·n) | O(1) |
