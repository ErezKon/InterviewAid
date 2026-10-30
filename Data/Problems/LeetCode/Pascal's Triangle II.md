# 119. Pascal's Triangle II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/pascals-triangle-ii](https://leetcode.com/problems/pascals-triangle-ii)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft

---

## Problem Description

Given an integer `rowIndex`, return the `rowIndex^th` (**0-indexed**) row of the **Pascal's triangle**.

In **Pascal's triangle**, each number is the sum of the two numbers directly above it as shown:
![img](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)

**Follow up:** Could you optimize your algorithm to use only `O(rowIndex)` extra space?

**Constraints:**
- `0 <= rowIndex <= 33`

## Examples

**Example 1:**
```
Input: rowIndex = 3
Output: [1,3,3,1]
```

**Example 2:**
```
Input: rowIndex = 0
Output: [1]
```

**Example 3:**
```
Input: rowIndex = 1
Output: [1,1]
```

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
