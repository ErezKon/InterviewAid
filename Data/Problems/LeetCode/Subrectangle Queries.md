# 1476. Subrectangle Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/subrectangle-queries](https://leetcode.com/problems/subrectangle-queries)
**Companies:** Google, Info Edge, Nuro

---

## Problem Description
You are given a 2D integer matrix `rectangle`. Implement a class that supports two operations:
1. `updateSubrectangle(r1, c1, r2, c2, newValue)`: set every element in the sub‑rectangle bounded by rows `r1`‑`r2` and columns `c1`‑`c2` to `newValue`.
2. `getValue(row, col)`: return the current value at position `(row, col)`, reflecting all prior updates.
Constraints include matrix dimensions up to 100 × 100 and up to 500 operations.

## Examples
- **Input:** Initialize with `[[1,2,1],[4,3,4],[3,2,1],[1,1,1]]`
  - `updateSubrectangle(0,0,3,2,5)` → matrix becomes all 5s.
  - `getValue(0,2)` → returns `5`.
- **Input:** After previous updates, `updateSubrectangle(3,0,3,2,10)` then `getValue(3,1)` → returns `10`.

## Approach
Store the original rectangle and a list of updates. For a query, scan the updates list in reverse order; the first update covering the cell provides its value. If none cover it, return the original cell value.

```text
CLASS SubrectangleQueries:
    FUNCTION Constructor(rectangle):
        SET self.original ← rectangle
        SET self.updates ← empty list

    FUNCTION updateSubrectangle(r1, c1, r2, c2, newValue):
        APPEND (r1, c1, r2, c2, newValue) TO self.updates

    FUNCTION getValue(row, col):
        FOR (ur1, uc1, ur2, uc2, val) IN REVERSED(self.updates):
            IF ur1 ≤ row ≤ ur2 AND uc1 ≤ col ≤ uc2:
                RETURN val
        RETURN self.original[row][col]
```

## Walkthrough
| Step | Operation | Affected Cells | Updates List After Step |
|------|-----------|----------------|------------------------|
| 1 | `updateSubrectangle(0,0,3,2,5)` | all cells | `[(0,0,3,2,5)]` |
| 2 | `getValue(2,1)` | – | scans list, finds first update → returns `5` |
| 3 | `updateSubrectangle(3,0,3,2,10)` | row 3 cells | `[(0,0,3,2,5), (3,0,3,2,10)]` |
| 4 | `getValue(3,1)` | – | reverse scan hits second update → returns `10` |

## Complexity Analysis
- **Time:** `updateSubrectangle` O(1); `getValue` O(U) where U is number of updates (≤ 500).
- **Space:** O(U) for storing updates plus O(M·N) for the original matrix.

## Follow-Up Questions
- How would you modify the design to achieve O(1) query time?
- Can you support undo operations for the most recent update?
- What if the matrix size and number of updates were both up to 10⁵?

## Key Takeaway
Recording updates lazily and checking them in reverse during queries provides a simple solution with constant‑time updates and acceptable query performance for modest numbers of updates.
