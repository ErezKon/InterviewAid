# 2267. Check if There Is a Valid Parentheses String Path

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path](https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path)
**Companies:** Google

---

## 1. Problem Description

Given an `m × n` grid where each cell contains either `'('` or `')'`, determine whether there exists a path from the top‑left corner to the bottom‑right corner moving only right or down such that the concatenated characters along the path form a **valid parentheses string**.

---

## 2. Examples

| Grid | Path | Valid |
|------|------|-------|
| `[(, (), (]`<br>`[(, ), )]` | `(0,0) → (0,1) → (1,1) → (1,2)` | **true** |
| `[(, )]`<br>`[), (]` | any path | **false** |

*Explanation*: In the first grid, the path yields the string `(() )` which is balanced. In the second grid, every possible path creates an unbalanced string.

---

## 3. Approach: DP with Balance — O(m·n·(m+n)) ✅

```text
FUNCTION hasValidPath(grid):
    m ← number of rows, n ← number of columns
    IF (m + n) MOD 2 = 0: RETURN false  // odd length cannot be balanced
    maxBal ← (m + n) / 2
    // dp[r][c] = set of reachable balances at cell (r,c)
    CREATE dp as 2‑D array of empty sets
    startBal ← 1 IF grid[0][0] = '(' ELSE -1
    IF startBal < 0: RETURN false
    dp[0][0].ADD(startBal)
    FOR r FROM 0 TO m-1:
        FOR c FROM 0 TO n-1:
            FOR bal IN dp[r][c]:
                // move right
                IF c+1 < n:
                    nBal ← bal + (1 IF grid[r][c+1] = '(' ELSE -1)
                    IF 0 ≤ nBal ≤ maxBal: dp[r][c+1].ADD(nBal)
                // move down
                IF r+1 < m:
                    nBal ← bal + (1 IF grid[r+1][c] = '(' ELSE -1)
                    IF 0 ≤ nBal ≤ maxBal: dp[r+1][c].ADD(nBal)
    RETURN 0 IN dp[m-1][n-1]
```

---

## 4. Walkthrough

Consider the grid:
```
( ( )
( ) )
```
1. Start at `(0,0)` with balance = 1.
2. Move right to `(0,1)`: char `'('` → balance = 2.
3. Move down to `(1,1)`: char `')'` → balance = 1.
4. Move right to `(1,2)`: char `')'` → balance = 0 (valid end).
The DP records these balances at each cell and finally finds a zero balance at the destination.

---

## 5. Complexity Analysis

- **Time**: O(m × n × (m+n)) – each cell stores up to `maxBal` possible balances.
- **Space**: O(m × n × (m+n)) for the DP sets (can be optimized with bitsets).

---

## 6. Follow‑Up Questions

- How would the solution change if diagonal moves were allowed?
- Can the algorithm be adapted to return the actual path, not just a boolean?
- What is the complexity if the grid size is very large but the alphabet contains more than two characters?

---

## Key Takeaway

> By treating the parentheses balance as a DP state, we can explore all feasible paths while keeping the balance non‑negative and ending at zero.
