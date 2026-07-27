# 130. Surrounded Regions

**Difficulty:** 🟡 Medium
**Acceptance:** 40.0%
**LeetCode:** [https://leetcode.com/problems/surrounded-regions](https://leetcode.com/problems/surrounded-regions)
**Companies:** Adobe, Amazon, Anduril, Bloomberg, Google, Meta, Microsoft, Moloco, Nutanix, Oracle, Tiktok, Uber

---

## 1. Problem Description

Given an m×n board with `'X'` and `'O'`, capture all regions surrounded by `'X'` (flip to `'X'`). `'O'`s on the border or connected to border `'O'`s are NOT captured.

---

## 2. Approach: Border DFS — O(m·n) ✅

```
FUNCTION solve(board):
    // Step 1: Mark border-connected 'O's as safe ('S')
    FOR each border cell (r, c):
        IF board[r][c] == 'O':
            dfs(board, r, c)    // mark as 'S'

    // Step 2: Flip remaining 'O' to 'X', 'S' back to 'O'
    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            IF board[r][c] == 'O': board[r][c] = 'X'
            ELSE IF board[r][c] == 'S': board[r][c] = 'O'

FUNCTION dfs(board, r, c):
    IF out of bounds OR board[r][c] != 'O': RETURN
    board[r][c] = 'S'
    dfs in 4 directions
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) stack |

---

## Key Takeaway

> Invert the problem: instead of finding surrounded regions, find UN-surrounded ones (connected to border). Mark them safe, then flip everything else.
