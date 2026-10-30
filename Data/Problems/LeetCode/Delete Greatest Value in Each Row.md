# 2500. Delete Greatest Value in Each Row

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-greatest-value-in-each-row](https://leetcode.com/problems/delete-greatest-value-in-each-row)
**Companies:** Amazon, Google

---

## Problem Description

You are given an `m x n` matrix `grid` consisting of positive integers.

Perform the following operation until `grid` becomes empty:

- Delete the element with the greatest value from each row. If multiple such elements exist, delete any of them.
- Add the maximum of deleted elements to the answer.

**Note** that the number of columns decreases by one after each operation.

Return *the answer after performing the operations described above*.

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `1 <= grid[i][j] <= 100`

---

## Examples

```
Example 1:
  Input: grid = [[1,2,4],[3,3,1]]
  Output: 8
  Explanation:
  - In the first operation, we remove 4 from the first row and 3 from the second row (notice that,
    there are two cells with value 3 and we can remove any of them). We add 4 to the answer.
  - In the second operation, we remove 2 from the first row and 3 from the second row. We add 3 to the answer.
  - In the third operation, we remove 1 from the first row and 1 from the second row. We add 1 to the answer.
  The final answer = 4 + 3 + 1 = 8.
```

```
Example 2:
  Input: grid = [[10]]
  Output: 10
  Explanation:
  - In the first operation, we remove 10 from the first row. We add 10 to the answer.
  The final answer = 10.
```

---

## Approach

```text
FUNCTION deleteGreatestValue(grid):
    // Sort each row in ascending order
    FOR each row IN grid:
        SORT(row)
    answer ← 0
    // Number of columns after sorting
    m ← length of grid[0]
    // Iterate columns from rightmost to leftmost
    FOR col ← m-1 DOWN TO 0:
        maxVal ← -∞
        FOR each row IN grid:
            maxVal ← MAX(maxVal, row[col])
        answer ← answer + maxVal
    RETURN answer
```

---

## Walkthrough

| Step | Grid State (rows sorted) | Column Index | Max of Column | Cumulative Sum |
|------|--------------------------|--------------|---------------|----------------|
| 1 | [[1,2,5],[4,6,7]] | 2 (rightmost) | 7 | 7 |
| 2 | Same rows | 1 | 6 | 13 |
| 3 | Same rows | 0 | 5 | 18 |

The algorithm sorts rows once, then simply picks the maximum of each column from right to left, which matches the process of repeatedly removing row maxima.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × m log m) for sorting each of the n rows of length m |
| **Space** | O(1) extra space (in‑place sorting) |

---

## Follow-Up Questions

1. How would the solution change if rows could have different lengths?
2. Can you solve the problem without sorting, using a max‑heap for each row?
3. What is the time‑space trade‑off when using a priority queue versus sorting?

---

## Key Takeaway

> **Sort each row once; then the maximum removed at step `i` corresponds to the `(m‑i)`‑th largest element of each row. Iterating columns right‑to‑left and taking the column max yields the final answer efficiently.**