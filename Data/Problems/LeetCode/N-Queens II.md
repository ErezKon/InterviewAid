# 52. N-Queens II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/n-queens-ii](https://leetcode.com/problems/n-queens-ii)
**Companies:** Amazon, Bloomberg, Deutsche Bank, Google, Liftoff, Meta, Microsoft, Snowflake, Walmart Labs, Zenefits

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Return the **number** of distinct N-Queens solutions (same as N-Queens #51, but count only).

---

## 2. Examples

| Input | Output |
|-------|--------|
| `n = 4` | `2` |
| `n = 1` | `1` |
| `n = 2` | `0` |

**Explanation:** For `n = 4` there are two valid board configurations; for `n = 2` none exist.

---

## 3. Approach

**Backtracking** – place queens row by row, ensuring no two share a column or diagonal. Use three sets to track occupied columns, major diagonals (`row - col`), and minor diagonals (`row + col`). Increment a counter when a placement reaches row `n`.

```text
FUNCTION totalNQueens(n):
    count ← 0
    cols ← empty set
    diag1 ← empty set   // row - col
    diag2 ← empty set   // row + col

    FUNCTION backtrack(row):
        IF row = n:
            count ← count + 1
            RETURN
        FOR col FROM 0 TO n - 1:
            IF col IN cols OR (row - col) IN diag1 OR (row + col) IN diag2:
                CONTINUE
            cols.ADD(col)
            diag1.ADD(row - col)
            diag2.ADD(row + col)
            backtrack(row + 1)
            cols.REMOVE(col)
            diag1.REMOVE(row - col)
            diag2.REMOVE(row + col)

    backtrack(0)
    RETURN count
```

---

## 4. Walkthrough

Consider `n = 4`.

| Row | Placed Column | cols | diag1 | diag2 |
|-----|---------------|------|-------|-------|
| 0   | 1             | {1}  | {-1}  | {1} |
| 1   | 3             | {1,3}| {-2,-1}| {1,4} |
| 2   | 0             | {0,1,3}| {-2,-1,2}| {0,1,4,5} |
| 3   | 2 → solution found (all rows placed) |

Backtracking then explores alternative placements, ultimately finding the second solution with queens at columns `[2,0,3,1]`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n!) — explores all permutations of queen placements |
| **Space** | O(n) — sets for columns and diagonals plus recursion stack |

---

## 6. Follow-Up Questions

* How would you modify the algorithm to **return all board configurations** instead of just the count?
* Can you improve the time complexity using **bitmasking** for the sets?
* What is the impact on performance when `n` grows beyond 14?

---

## 7. Key Takeaway

> **Count-only variant of N-Queens.** Same backtracking logic, just increment a counter instead of building board representations. O(n) space without board storage.
