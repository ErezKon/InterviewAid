# 1981. Minimize the Difference Between Target and Chosen Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-the-difference-between-target-and-chosen-elements](https://leetcode.com/problems/minimize-the-difference-between-target-and-chosen-elements)
**Companies:** Amazon

---

## Problem Description

You are given an `m x n` integer matrix `mat` and an integer `target`.

Choose one integer from **each row** in the matrix such that the **absolute difference** between `target` and the **sum** of the chosen elements is **minimized**.

Return *the **minimum absolute difference***.

The **absolute difference** between two numbers `a` and `b` is the absolute value of `a - b`.

**Constraints:**
- `m == mat.length`
- `n == mat[i].length`
- `1 ≤ m, n ≤ 70`
- `1 ≤ mat[i][j] ≤ 70`
- `1 ≤ target ≤ 800`

---

## Examples

```
Example 1:
  Input: mat = [[1,2,3],[4,5,6],[7,8,9]], target = 13
  Output: 0
  Explanation: One possible choice is to:
  - Choose 1 from the first row.
  - Choose 5 from the second row.
  - Choose 7 from the third row.
  The sum of the chosen elements is 13, which equals the target, so the absolute difference is 0.
```

```
Example 2:
  Input: mat = [[1],[2],[3]], target = 100
  Output: 94
  Explanation: The best possible choice is to:
  - Choose 1 from the first row.
  - Choose 2 from the second row.
  - Choose 3 from the third row.
  The sum of the chosen elements is 6, and the absolute difference is 94.
```

```
Example 3:
  Input: mat = [[1,2,9,8,7]], target = 6
  Output: 1
  Explanation: The best choice is to choose 7 from the first row.
  The absolute difference is 1.
```

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