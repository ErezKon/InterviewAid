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

```text
FUNCTION cheapestJump(coins, maxJump):
    n = LENGTH(coins)
    IF coins[n-1] == -1: RETURN []
    
    dp = ARRAY of size n filled with INF
    dp[n-1] = coins[n-1]
    next = ARRAY of size n filled with -1
    
    FOR i FROM n-2 DOWN TO 0:
        IF coins[i] == -1: CONTINUE
        FOR j FROM i+1 TO MIN(i + maxJump, n-1):
            IF dp[j] == INF: CONTINUE
            SET cost ← coins[i] + dp[j]
            IF cost < dp[i] OR (cost == dp[i] AND j < next[i]):
                dp[i] = cost
                next[i] = j
    
    IF dp[0] == INF: RETURN []
    // reconstruct path
    path = []
    i = 0
    WHILE i != -1:
        APPEND (i + 1) TO path   // 1-indexed positions
        i = next[i]
    RETURN path
```

| Time | Space |
|------|-------|
| O(n × maxJump) | O(n) |

---

## 4. Examples

| coins | maxJump | output |
|-------|---------|--------|
| [1,2,3,4,5] | 2 | [1,3,5] |
| [1,-1,2,3] | 3 | [] |
| [0,0,0,0] | 1 | [1,2,3,4] |

*Explanation*: In the first example, the cheapest path with jumps ≤2 is 0→2→4 (1‑indexed: 1,3,5).

---

## 5. Walkthrough

Consider `coins = [1,2,3,4,5]`, `maxJump = 2`.

1. Initialize `dp[4] = 5`, `next[4] = -1`.
2. `i = 3`: possible jumps to `j=4` → cost = 4+5=9 → `dp[3]=9`, `next[3]=4`.
3. `i = 2`: jumps to `j=3` (cost 3+9=12) and `j=4` (cost 3+5=8). Choose smaller → `dp[2]=8`, `next[2]=4`.
4. `i = 1`: jumps to `j=2` (2+8=10) and `j=3` (2+9=11) → pick `j=2` → `dp[1]=10`, `next[1]=2`.
5. `i = 0`: jumps to `j=1` (1+10=11) and `j=2` (1+8=9) → pick `j=2` → `dp[0]=9`, `next[0]=2`.
6. Reconstruct: start at 0 → 2 → 4 → end. Convert to 1‑indexed: `[1,3,5]`.

---

## 6. Complexity Analysis

- **Time:** O(n × maxJump) – each index scans up to `maxJump` forward positions.
- **Space:** O(n) for `dp` and `next` arrays.

---

## 7. Follow-Up Questions

- How would the solution change if jumps could be of variable lengths given by another array?
- Can you optimize the DP using a monotonic queue to achieve O(n) time?
- What if you need to return the *maximum* cost path instead of the minimum?

---

## Key Takeaway

> Reverse DP builds optimal costs from the end, and storing the next index enables reconstruction of the lexicographically smallest minimum‑cost path.
