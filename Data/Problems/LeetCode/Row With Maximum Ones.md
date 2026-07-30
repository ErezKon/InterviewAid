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

---

## Examples

| Input matrix | Output |
|--------------|--------|
| `[[0,1,0],[1,1,1],[0,0,0]]` | `[1,3]` |
| `[[1,0],[1,0],[0,1]]` | `[0,1]` |

---

## Walkthrough

Consider the first example `[[0,1,0],[1,1,1],[0,0,0]]`:

| Row index | Row values | Ones count | Max so far |
|-----------|------------|------------|-----------|
| 0 | 0 1 0 | 1 | maxOnes=1, maxRow=0 |
| 1 | 1 1 1 | 3 | maxOnes=3, maxRow=1 |
| 2 | 0 0 0 | 0 | unchanged |

Result `[1,3]`.

---

## Complexity Analysis

- **Time:** O(m·n) – each element visited once to count ones.
- **Space:** O(1) – only constant extra variables.

---

## Follow-Up Questions

1. How would you modify the solution if rows are sorted (all 1s come before 0s) to achieve O(m + n)?
2. Can you return all rows that share the maximum count of 1s?

---

## Key Takeaway

Scanning each row and tracking the maximum count yields a simple O(m·n) solution; leveraging row ordering can further reduce complexity.
