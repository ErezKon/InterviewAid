# 1981. Minimize the Difference Between Target and Chosen Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-the-difference-between-target-and-chosen-elements](https://leetcode.com/problems/minimize-the-difference-between-target-and-chosen-elements)
**Companies:** Amazon

---

## Problem Description

Given an `m × n` matrix, pick exactly one element from each row. Minimize `|sum - target|`.

**Constraints:**
- `1 ≤ m, n ≤ 70`
- `1 ≤ matrix[i][j] ≤ 70`

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `matrix = [[1,2,3],[4,5,6]], target = 7` | `0` | Choose 3 from first row and 4 from second row, sum = 7, difference = 0. |
| `matrix = [[1,2],[3,4]], target = 10` | `4` | Best sum is 6 (2+4), difference = |6-10| = 4. |
| `matrix = [[5]], target = 3` | `2` | Only one choice, sum = 5, difference = 2.

---

## Approach

Use dynamic programming to track all reachable sums after processing each row. Represent reachable sums as a set. For each row, add each element to every previously reachable sum, forming a new set. After processing all rows, compute the minimal absolute difference to the target.

```text
FUNCTION minimizeDifference(matrix, target):
    SET reachable ← {0}
    FOR each row IN matrix DO
        SET next ← EMPTY SET
        FOR each sum IN reachable DO
            FOR each val IN row DO
                ADD (sum + val) TO next
        SET reachable ← next
    RETURN MIN(ABS(s - target) FOR s IN reachable)
```

---

## Walkthrough

Consider `matrix = [[1,2,3],[4,5,6]], target = 7`:

1. Start with `reachable = {0}`.
2. After first row, `next = {1,2,3}`.
3. After second row, combine each of `{1,2,3}` with `{4,5,6}` → `{5,6,7,8,9,10}`.
4. Compute differences to target 7: `{2,1,0,1,2,3}` → minimum is `0`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP with sets | **O(m · n · S)** | **O(S)** |

`S` is the number of distinct reachable sums (bounded by `m·70`).

---

## Follow-Up Questions

- How would you modify the algorithm if you could pick up to two elements per row?
- Can you reduce space usage by using a boolean array instead of a set?
- What if the matrix size is much larger (e.g., `m, n ≤ 500`)?

---

## Key Takeaway

> **DP over reachable sums** — track all possible sums row by row using a set, then pick the sum closest to the target.

---