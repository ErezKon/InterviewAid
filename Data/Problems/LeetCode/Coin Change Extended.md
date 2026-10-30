# DP Knapsack Patterns

Related: #322, #518, #416, #494, #474, #1049
---

## Problem Description
This page summarizes the classic **knapsack** dynamic programming patterns used across many LeetCode problems. It distinguishes between the 0/1 knapsack (each item can be used at most once) and the unbounded knapsack (items can be used unlimited times), showing the core recurrence and iteration order.

Two representative tasks:

- **0/1 Knapsack (max value):** Given `n` items where item `i` has weight `weights[i]` and value `values[i]`, and a capacity `target`, return the maximum total value of a subset of items whose total weight does not exceed `target`. Each item can be chosen **at most once**.
- **Unbounded Knapsack (min count):** Given an array `coins` of distinct denominations and an integer `target`, return the minimum number of coins needed to make exactly `target`. Each coin may be used **an unlimited number of times**. If `target` cannot be formed, return `-1`.

**Constraints:**
- `1 <= n, coins.length <= 100`
- `1 <= weights[i], coins[i] <= 10^4`
- `0 <= values[i] <= 10^4`
- `0 <= target <= 10^4`

> *Note: constraints and examples are derived, not from an official LeetCode source.*

## Examples
```
Example 1 (0/1 Knapsack):
  Input: weights = [2,3,4], values = [3,4,5], target = 5
  Output: 7
  Explanation: Choose the items with weights 2 and 3 (values 3 + 4 = 7). Total weight 5 <= 5. Any subset containing the weight-4 item can hold nothing else.
```
```
Example 2 (Unbounded Knapsack):
  Input: coins = [1,3,4], target = 6
  Output: 2
  Explanation: 6 = 3 + 3 uses 2 coins. The greedy choice 4 + 1 + 1 uses 3 coins, so it is not optimal.
```
```
Example 3 (Unbounded Knapsack, impossible):
  Input: coins = [2], target = 3
  Output: -1
  Explanation: Only even amounts can be formed with coin 2, so 3 is unreachable.
```

## Approach
1. **Define DP array** `dp[j]` representing the best achievable value (or minimum count) for capacity/target `j`.
2. **Choose iteration direction**:
   - For 0/1 knapsack, iterate `j` **downwards** to avoid reusing the same item.
   - For unbounded knapsack, iterate `j` **upwards** to allow unlimited reuse.
3. **Update recurrence** based on problem objective (max, min, count, boolean).

### Pseudocode for 0/1 Knapsack (max value)
```text
FUNCTION knapsack01(items, target):
    dp ← ARRAY OF (target + 1) FILLED WITH 0
    FOR each item IN items:
        weight ← item.weight; value ← item.value
        FOR j ← target DOWN TO weight:
            dp[j] ← MAX(dp[j], dp[j - weight] + value)
    RETURN dp[target]
```

### Pseudocode for Unbounded Knapsack (min count)
```text
FUNCTION unboundedKnapsack(coins, target):
    INF ← LARGE_NUMBER
    dp ← ARRAY OF (target + 1) FILLED WITH INF
    dp[0] ← 0
    FOR coin IN coins:
        FOR j ← coin TO target:
            dp[j] ← MIN(dp[j], dp[j - coin] + 1)
    RETURN dp[target] IF dp[target] ≠ INF ELSE -1
```

## Walkthrough
Consider the unbounded example with `coins = [1,3,4]`, `target = 6`:
1. Initialize `dp = [0, INF, INF, INF, INF, INF, INF]`.
2. Process `coin = 1`: fill `dp[1..6]` with values `1,2,3,4,5,6`.
3. Process `coin = 3`: update `dp[3] = MIN(3, dp[0]+1) = 1`; `dp[4] = MIN(4, dp[1]+1) = 2`; `dp[5] = MIN(5, dp[2]+1) = 3`; `dp[6] = MIN(6, dp[3]+1) = 2`.
4. Process `coin = 4`: further improve `dp[4] = 1`, `dp[5] = 2`, `dp[6] = 2`.
5. Final answer `dp[6] = 2` (e.g., `3+3`).

## Complexity Analysis
- **Time:** O(N × target) where N is the number of items/coins.
- **Space:** O(target) for the DP array (can be reduced to O(1) for some variants).

## Follow-Up Questions
- How would you adapt the DP for a **subset sum** decision problem (boolean answer)?
- Can you extend the pattern to handle **multiple constraints** (e.g., weight and volume)?
- What optimizations exist for very large targets (e.g., using meet‑in‑the‑middle or binary lifting)?

---

## Key Takeaway

> The direction of DP iteration (downward vs. upward) is the decisive factor that distinguishes 0/1 from unbounded knapsack, enabling a single unified framework for many classic optimization problems.
