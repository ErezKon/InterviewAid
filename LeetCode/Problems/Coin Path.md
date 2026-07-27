# 656. Coin Path

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/coin-path](https://leetcode.com/problems/coin-path)
**Companies:** Google

---

## 1. Problem Description

Given an array `coins` where `coins[i]` is the cost to step on index `i` (-1 means blocked), and a max jump length `maxJump`, find the lexicographically smallest path from index 0 to index `n-1` with minimum total cost.

---

## 2. Key Insight

> DP from right to left: `dp[i]` = min cost to reach `n-1` from `i`. For lexicographic smallest path, process from right to left and prefer the farthest valid jump (since we're building the path backwards). Track the next index on the optimal path.

---

## 3. Approach: Reverse DP — O(n × maxJump) ✅

```
FUNCTION cheapestJump(coins, maxJump):
    n = len(coins)
    IF coins[n-1] == -1: RETURN []
    
    dp = [INF] * n
    dp[n-1] = coins[n-1]
    next = [-1] * n
    
    FOR i FROM n-2 DOWN TO 0:
        IF coins[i] == -1: CONTINUE
        FOR j FROM i+1 TO MIN(i + maxJump, n-1):
            IF dp[j] == INF: CONTINUE
            cost = coins[i] + dp[j]
            IF cost < dp[i] OR (cost == dp[i] AND j < next[i]):
                dp[i] = cost
                next[i] = j
    
    IF dp[0] == INF: RETURN []
    // reconstruct path
    path = []
    i = 0
    WHILE i != -1:
        path.ADD(i + 1)  // 1-indexed
        i = next[i]
    RETURN path
```

| Time | Space |
|------|-------|
| O(n × maxJump) | O(n) |

---

## Key Takeaway

> Reverse DP naturally produces lexicographically smallest paths when ties are broken by choosing the smallest next index. Reconstruct by following the `next` pointers.
