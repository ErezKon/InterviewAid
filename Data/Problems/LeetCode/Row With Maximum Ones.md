# 2643. Row With Maximum Ones

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/row-with-maximum-ones](https://leetcode.com/problems/row-with-maximum-ones)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Given a `m x n` binary matrix `mat`, find the **0-indexed** position of the row that contains the **maximum** count of **ones,** and the number of ones in that row.

In case there are multiple rows that have the maximum count of ones, the row with the **smallest row number** should be selected.

Return *an array containing the index of the row, and the number of ones in it.*

**Constraints:**
- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 100`
- `mat[i][j]` is either `0` or `1`.

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

**Example 1:**
```
Input: mat = [[0,1],[1,0]]
Output: [0,1]
Explanation: Both rows have the same number of 1's. So we return the index of the smaller row, 0, and the maximum count of ones (1). So, the answer is [0,1].
```

**Example 2:**
```
Input: mat = [[0,0,0],[0,1,1]]
Output: [1,2]
Explanation: The row indexed 1 has the maximum count of ones (2). So we return its index, 1, and the count. So, the answer is [1,2].
```

**Example 3:**
```
Input: mat = [[0,0],[1,1],[0,0]]
Output: [1,2]
Explanation: The row indexed 1 has the maximum count of ones (2). So the answer is [1,2].
```

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
