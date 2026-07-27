# 1463. Cherry Pickup II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cherry-pickup-ii](https://leetcode.com/problems/cherry-pickup-ii)
**Companies:** Amazon, Flipkart, Google, Meta, Microsoft, Rubrik, Sprinklr

---

## Approach: 3D DP — O(m·n²) ✅

```
FUNCTION cherryPickup(grid):
    m, n = dimensions
    // dp[r][c1][c2] = max cherries with robot1 at col c1, robot2 at col c2, at row r
    dp = current row state

    // Start: robot1 at (0,0), robot2 at (0,n-1)
    dp[0][n-1] = grid[0][0] + grid[0][n-1]

    FOR r ← 1 TO m - 1:
        newDp = -1 everywhere
        FOR c1 ← 0 TO MIN(n-1, r):
            FOR c2 ← MAX(0, n-1-r) TO n - 1:
                FOR dc1 IN [-1, 0, 1]:
                    FOR dc2 IN [-1, 0, 1]:
                        pc1 = c1 - dc1; pc2 = c2 - dc2
                        IF valid prev AND dp[pc1][pc2] >= 0:
                            cherries = grid[r][c1] + (grid[r][c2] IF c1 != c2 ELSE 0)
                            newDp[c1][c2] = MAX(newDp[c1][c2], dp[pc1][pc2] + cherries)
        dp = newDp

    RETURN MAX(all dp values)
```
