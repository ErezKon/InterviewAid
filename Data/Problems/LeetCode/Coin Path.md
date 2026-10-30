# 656. Coin Path

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/coin-path](https://leetcode.com/problems/coin-path)
**Companies:** Google

---

## 1. Problem Description

You are given an integer array `coins` (**1-indexed**) of length `n` and an integer `maxJump`. You can jump to any index `i` of the array `coins` if `coins[i] != -1` and you have to pay `coins[i]` when you visit index `i`. In addition to that, if you are currently at index `i`, you can only jump to any index `i + k` where `i + k <= n` and `k` is a value in the range `[1, maxJump]`.

You are initially positioned at index `1` (`coins[1]` is not `-1`). You want to find the path that reaches index `n` with the minimum cost.

Return an integer array of the indices that you will visit in order so that you can reach index `n` with the minimum cost. If there are multiple paths with the same cost, return the **lexicographically smallest** such path. If it is not possible to reach index `n`, return an empty array.

A path `p1 = [Pa1, Pa2, ..., Pax]` of length `x` is **lexicographically smaller** than `p2 = [Pb1, Pb2, ..., Pbx]` of length `y`, if and only if at the first `j` where `Paj` and `Pbj` differ, `Paj < Pbj`; when no such `j` exists, then `x < y`.

**Constraints:**
- `1 <= coins.length <= 1000`
- `-1 <= coins[i] <= 100`
- `coins[1] != -1`
- `1 <= maxJump <= 100`

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

```
Example 1:
  Input: coins = [1,2,4,-1,2], maxJump = 2
  Output: [1,3,5]
```
```
Example 2:
  Input: coins = [1,2,4,-1,2], maxJump = 1
  Output: []
```

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
