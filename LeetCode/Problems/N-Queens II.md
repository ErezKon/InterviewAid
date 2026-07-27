# 52. N-Queens II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/n-queens-ii](https://leetcode.com/problems/n-queens-ii)
**Companies:** Amazon, Bloomberg, Deutsche Bank, Google, Liftoff, Meta, Microsoft, Snowflake, Walmart Labs, Zenefits

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Backtracking — O(n!)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Return the **number** of distinct N-Queens solutions (same as N-Queens #51, but count only).

---

## 2. Key Insight

> Same backtracking as N-Queens. Track columns and diagonals with sets. Increment counter at base case instead of storing the board.

---

## 3. Approach: Backtracking — O(n!) ✅

```
FUNCTION totalNQueens(n):
    count = 0
    cols = set()
    diag1 = set()    // r - c
    diag2 = set()    // r + c

    FUNCTION backtrack(row):
        IF row == n:
            count += 1
            RETURN

        FOR col ← 0 TO n - 1:
            IF col IN cols OR (row-col) IN diag1 OR (row+col) IN diag2:
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

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n!) |
| **Space** | O(n) — sets + recursion stack |

---

## 5. Key Takeaway

> **Count-only variant of N-Queens.** Same backtracking logic, just increment a counter instead of building board representations. O(n) space without board storage.
