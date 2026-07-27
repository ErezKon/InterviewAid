# 741. Cherry Pickup

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cherry-pickup](https://leetcode.com/problems/cherry-pickup)
**Companies:** Akuna Capital, Amazon, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Phonepe, Uber

---

## Approach: 3D DP (Two Paths Simultaneously) — O(n³) ✅

```
FUNCTION cherryPickup(grid):
    n = len(grid)
    // Two people walk from (0,0) to (n-1,n-1) simultaneously
    // State: (steps, r1, r2) where c1 = steps-r1, c2 = steps-r2
    dp = n×n×n of -infinity
    dp[0][0][0] = grid[0][0]

    FOR t ← 1 TO 2*n - 2:
        FOR r1 ← MAX(0, t-n+1) TO MIN(n-1, t):
            FOR r2 ← r1 TO MIN(n-1, t):
                c1 = t - r1; c2 = t - r2
                IF grid[r1][c1] == -1 OR grid[r2][c2] == -1: CONTINUE
                cherries = grid[r1][c1]
                IF r1 != r2: cherries += grid[r2][c2]

                // Try all 4 predecessor combinations
                FOR prev in previous states:
                    dp[t][r1][r2] = MAX(dp[t][r1][r2], prev + cherries)

    RETURN MAX(0, dp[2*n-2][n-1][n-1])
```

Two simultaneous paths avoid the greedy trap. Equivalent to one round trip.
