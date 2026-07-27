# 1478. Allocate Mailboxes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/allocate-mailboxes](https://leetcode.com/problems/allocate-mailboxes)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google

---

## Approach: DP — O(n²k) ✅

```
FUNCTION minDistance(houses, k):
    SORT houses
    n = len(houses)
    // cost[i][j] = min total distance for houses[i..j] with 1 mailbox (median)
    cost = precompute for all pairs

    dp = n × (k+1) of infinity
    FOR i: dp[i][1] = cost[0][i]

    FOR j ← 2 TO k:
        FOR i ← j - 1 TO n - 1:
            FOR m ← j - 2 TO i - 1:
                dp[i][j] = MIN(dp[i][j], dp[m][j-1] + cost[m+1][i])

    RETURN dp[n-1][k]
```
