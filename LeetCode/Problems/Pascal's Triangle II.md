# 119. Pascal's Triangle II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/pascals-triangle-ii](https://leetcode.com/problems/pascals-triangle-ii)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft

---

## Problem Description
Given a non‑negative integer `rowIndex`, return the `rowIndex`‑th (0‑indexed) row of Pascal's Triangle.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `rowIndex = 3` | `[1,3,3,1]` | The fourth row of Pascal's Triangle. |
| `rowIndex = 0` | `[1]` | First row. |
| `rowIndex = 1` | `[1,1]` | Second row.

## Approach
Build the row in‑place from right to left so that previously computed values are not overwritten.

```text
FUNCTION getRow(rowIndex):
    SET row ← ARRAY of (rowIndex + 1) elements, each = 1
    FOR i ← 1 TO rowIndex - 1:
        // update current row using values from previous iteration
        FOR j ← i DOWNTO 1:
            row[j] ← row[j] + row[j - 1]
    RETURN row
```

## Walkthrough
For `rowIndex = 3`:

| i (outer) | j (inner) | row before | operation | row after |
|-----------|-----------|------------|-----------|-----------|
| 1 | 1 | [1,1,1,1] | row[1]=1+1 → 2 | [1,2,1,1] |
| 2 | 2 | [1,2,1,1] | row[2]=1+2 → 3 | [1,2,3,1] |
|   | 1 | [1,2,3,1] | row[1]=2+1 → 3 | [1,3,3,1] |

Result `[1,3,3,1]`.

## Complexity Analysis
- **Time:** O(rowIndex²) due to the nested loops.
- **Space:** O(rowIndex) for the output array.

## Follow‑Up Questions
1. How would you generate the entire Pascal's Triangle up to `rowIndex`?
2. Can you compute a specific element `C(row, col)` in O(min(col, row‑col)) time?
3. How does the problem change if you need results modulo a large prime?

## Key Takeaway
Updating the row from right to left preserves previously computed values, enabling O(rowIndex) extra space construction of any Pascal's Triangle row.
