# 130. Surrounded Regions

**Difficulty:** 🟡 Medium
**Acceptance:** 40.0%
**LeetCode:** [https://leetcode.com/problems/surrounded-regions](https://leetcode.com/problems/surrounded-regions)
**Companies:** Adobe, Amazon, Anduril, Bloomberg, Google, Meta, Microsoft, Moloco, Nutanix, Oracle, Tiktok, Uber

---

## 1. Problem Description

Given an `m × n` board containing `'X'` and `'O'`, capture all regions that are completely surrounded by `'X'`. A region is captured by flipping all `'O'` cells in it to `'X'`. `'O'` cells on the border, or connected to a border `'O'`, remain unchanged.

---

## 2. Approach: Border DFS — O(m·n) ✅

```text
FUNCTION solve(board):
    // Step 1: Mark border‑connected 'O's as safe ('S')
    FOR each cell (r, c) on the border:
        IF board[r][c] == 'O':
            dfs(board, r, c)

    // Step 2: Flip interior 'O's to 'X' and restore safe cells
    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            IF board[r][c] == 'O':
                board[r][c] ← 'X'
            ELSE IF board[r][c] == 'S':
                board[r][c] ← 'O'

FUNCTION dfs(board, r, c):
    IF r < 0 OR r ≥ m OR c < 0 OR c ≥ n OR board[r][c] != 'O':
        RETURN
    board[r][c] ← 'S'
    dfs(board, r-1, c)   // up
    dfs(board, r+1, c)   // down
    dfs(board, r, c-1)   // left
    dfs(board, r, c+1)   // right
```

---

## 3. Examples

| Board (input) | Board (output) |
|---------------|----------------|
| `[['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]` | `[['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']]` |
| `[['X','O','X'],['X','O','X'],['X','X','X']]` | `[['X','O','X'],['X','O','X'],['X','X','X']]` |

---

## 4. Walkthrough

Consider the first example board:

1. Border cells containing `'O'` are at `(3,1)`. DFS marks it as `'S'`.
2. After DFS, board becomes:
   `[['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','S','X','X']]`
3. Second pass flips remaining `'O'` to `'X'` and restores `'S'` to `'O'`.
4. Final board:
   `[['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']]`

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(m·n) — each cell visited at most twice |
| Space  | O(m·n) in worst‑case recursion stack (can be reduced to O(m·n) iterative) |

---

## 6. Follow‑Up Questions

- How would you implement the same algorithm iteratively using a queue (BFS) instead of recursion?
- Can you solve the problem with Union‑Find and what would be its time/space trade‑offs?
- How would the solution change if the board were extremely large and could not fit into memory?

---

## Key Takeaway

> Invert the problem: instead of searching for surrounded regions, first mark all border‑connected `'O'` cells as safe, then flip everything else.
