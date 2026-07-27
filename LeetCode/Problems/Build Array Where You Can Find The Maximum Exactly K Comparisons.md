# 1420. Build Array Where You Can Find The Maximum Exactly K Comparisons

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons](https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons)
**Companies:** Dunzo, Google

---

## 1. Problem Description

Build an array of length `n` with elements in `[1, m]` such that the "search cost" (number of times a new maximum is encountered scanning left to right) is exactly `k`. Count the number of such arrays modulo 10^9+7.

---

## 2. Key Insight

> DP with state `(position, current_max, cost_so_far)`. At each position, either place a value ≤ current max (no new cost) or place a new max value (cost increases by 1).

---

## 3. Approach: 3D DP — O(n × m² × k) ✅

```
FUNCTION numOfArrays(n, m, k):
    MOD = 10^9 + 7
    // dp[i][j][c] = ways to fill positions 0..i-1 where current max = j, cost = c
    dp = 3D array, all 0
    
    FOR j FROM 1 TO m:
        dp[1][j][1] = 1  // single element, max = j, cost = 1
    
    FOR i FROM 2 TO n:
        FOR j FROM 1 TO m:
            FOR c FROM 1 TO k:
                // place value <= j (no new max): j choices
                dp[i][j][c] += dp[i-1][j][c] * j
                // place value j as new max: sum dp[i-1][j'][c-1] for j' < j
                FOR j2 FROM 1 TO j-1:
                    dp[i][j][c] += dp[i-1][j2][c-1]
                dp[i][j][c] %= MOD
    
    RETURN SUM(dp[n][j][k] for j in 1..m) % MOD
```

Optimize inner sum with prefix sums for O(n × m × k).

| Time | Space |
|------|-------|
| O(n × m × k) with prefix sum optimization | O(m × k) |

---

## Key Takeaway

> "Search cost" = number of left-to-right maxima. DP tracks (length, current max, cost). Prefix sums eliminate the inner loop over previous max values.
