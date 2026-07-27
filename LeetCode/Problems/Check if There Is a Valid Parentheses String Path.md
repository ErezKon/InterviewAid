# 2267. Check if There Is a Valid Parentheses String Path

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path](https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path)
**Companies:** Google

---

## 1. Problem Description

Given an `m × n` grid where each cell is `'('` or `')'`, determine if there's a path from top-left to bottom-right (moving only right or down) that forms a **valid parentheses string**.

---

## 2. Key Insight

> DP with state `(row, col, balance)` where balance = count of unmatched `'('`. At each cell, update balance (+1 for `'('`, -1 for `')'`). Valid if balance never goes negative and equals 0 at the end. Max balance ≤ (m+n)/2.

---

## 3. Approach: DP with Balance — O(m × n × (m+n)) ✅

```
FUNCTION hasValidPath(grid):
    m, n = grid dimensions
    IF (m + n) % 2 == 0: RETURN false    // odd length can't be valid
    
    dp = set of (row, col, balance) reachable states
    start_balance = 1 IF grid[0][0] == '(' ELSE -1
    IF start_balance < 0: RETURN false
    dp = {(0, 0, start_balance)}
    
    // BFS/DP expanding right and down
    FOR each state (r, c, bal) in order:
        FOR (nr, nc) IN [(r+1,c), (r,c+1)]:
            IF in bounds:
                nbal = bal + (1 IF grid[nr][nc] == '(' ELSE -1)
                IF nbal >= 0 AND nbal <= (m+n)/2:
                    dp.ADD((nr, nc, nbal))
    
    RETURN (m-1, n-1, 0) IN dp
```

| Time | Space |
|------|-------|
| O(m × n × (m+n)) | O(m × n × (m+n)) |

---

## Key Takeaway

> Grid path + parentheses validation = DP with a balance dimension. The balance can't exceed `(m+n)/2`, bounding the state space. Path must end with balance 0.
