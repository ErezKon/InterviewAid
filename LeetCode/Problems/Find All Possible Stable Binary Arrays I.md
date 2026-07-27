# 3129. Find All Possible Stable Binary Arrays I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-all-possible-stable-binary-arrays-i](https://leetcode.com/problems/find-all-possible-stable-binary-arrays-i)
**Companies:** Amazon, Google, Meta

---

## Problem Description

Count binary arrays with exactly `zero` 0s and `one` 1s such that no `limit` or more consecutive identical elements appear. Return count mod 10⁹+7.

---

## Approach: DP — O(zero × one × 2) ✅

```
FUNCTION numberOfStableArrays(zero, one, limit):
    MOD = 10^9 + 7
    // dp[i][j][last] = ways using i zeros and j ones, ending with last (0 or 1)
    dp = 3D array initialized to 0
    
    FOR i ← 1 TO min(zero, limit): dp[i][0][0] = 1
    FOR j ← 1 TO min(one, limit): dp[0][j][1] = 1
    
    FOR i ← 0 TO zero:
        FOR j ← 0 TO one:
            // End with 0: extend from ending-with-1, or continue 0-run
            dp[i][j][0] += dp[i-1][j][1]  // switch from 1
            dp[i][j][0] += dp[i-1][j][0]  // continue 0
            IF i > limit: dp[i][j][0] -= dp[i-limit-1][j][1]  // exceeded limit
            
            // End with 1: similar logic
            dp[i][j][1] += dp[i][j-1][0]
            dp[i][j][1] += dp[i][j-1][1]
            IF j > limit: dp[i][j][1] -= dp[i][j-limit-1][0]
    
    RETURN (dp[zero][one][0] + dp[zero][one][1]) % MOD
```

---

## Key Takeaway

> **3D DP tracking (zeros used, ones used, last digit). The `limit` constraint is handled by subtracting overcounted runs that exceed the consecutive limit.**
