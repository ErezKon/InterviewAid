# 2742. Painting the Walls

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/painting-the-walls](https://leetcode.com/problems/painting-the-walls)
**Companies:** Amazon, De Shaw, Google, Meesho, Meta, Snowflake

---

## Problem Description
You are given two **0-indexed** integer arrays, `cost` and `time`, of size `n` representing the costs and the time taken to paint `n` different walls respectively. There are two painters available:

- A **paid painter** that paints the `i`-th wall in `time[i]` units of time and takes `cost[i]` units of money.
- A **free painter** that paints **any** wall in `1` unit of time at a cost of `0`. But the free painter can only be used if the paid painter is already **occupied**.

Return *the minimum amount of money required to paint the* `n` *walls.*

**Constraints:**

- `1 <= cost.length <= 500`
- `cost.length == time.length`
- `1 <= cost[i] <= 10^6`
- `1 <= time[i] <= 500`

## Examples

```
Example 1:
  Input: cost = [1,2,3,2], time = [1,2,3,2]
  Output: 3
  Explanation: The walls at index 0 and 1 will be painted by the paid painter, and it will take 3 units of time; meanwhile, the free painter will paint the walls at index 2 and 3, free of cost in 2 units of time. Thus, the total cost is 1 + 2 = 3.
```

```
Example 2:
  Input: cost = [2,3,4,2], time = [1,1,1,1]
  Output: 4
  Explanation: The walls at index 0 and 3 will be painted by the paid painter, and it will take 2 units of time; meanwhile, the free painter will paint the walls at index 1 and 2, free of cost in 2 units of time. Thus, the total cost is 2 + 2 = 4.
```

## Approach
Dynamic Programming – treat `dp[j]` as the minimum cost to have `j` walls painted using paid painters, leveraging the free painter's coverage.

```text
FUNCTION paintWalls(cost, time):
    n ← LENGTH(cost)
    dp ← ARRAY of size n+1 filled with INFINITY
    dp[0] ← 0
    FOR i ← 0 TO n-1:
        // When we pay for wall i, we can cover up to (1 + time[i]) new walls
        FOR j ← n DOWN TO 1:
            covered ← MAX(0, j - 1 - time[i])
            dp[j] ← MIN(dp[j], dp[covered] + cost[i])
    RETURN dp[n]
```

The inner loop iterates backwards to avoid reusing the same paid painter multiple times.

## Walkthrough
Example 1: `cost = [1,2,3,2]`, `time = [1,2,3,2]`, `n = 4`. Start `dp = [0,INF,INF,INF,INF]`.

| i | cost[i] | time[i] | Covers (1 + time[i]) | dp after processing |
|---|---------|---------|----------------------|---------------------|
| 0 | 1 | 1 | 2 | `[0,1,1,INF,INF]` |
| 1 | 2 | 2 | 3 | `[0,1,1,2,3]` |
| 2 | 3 | 3 | 4 | `[0,1,1,2,3]` |
| 3 | 2 | 2 | 3 | `[0,1,1,2,3]` |

- At `i = 1`: `dp[4] = dp[max(0, 4-3)] + 2 = dp[1] + 2 = 3`, `dp[3] = dp[0] + 2 = 2`.
- Later walls cannot beat these (e.g. `i = 2` gives `dp[4] = dp[0] + 3 = 3`, a tie).
- Answer `dp[4] = 3`: pay for walls 0 and 1 (3 time units), free painter does walls 2 and 3.

## Complexity Analysis
- **Time:** O(n²) – nested loops over `n` walls and up to `n` painted count.
- **Space:** O(n) – the `dp` array.

## Follow-Up Questions
1. How can the solution be optimized for larger `n` (e.g., using monotonic queues)?
2. What changes if the free painter can only paint immediately adjacent walls?
3. Can you extend the DP to output the actual sequence of walls paid for?

## Key Takeaway
Modeling the problem as a knapsack-style DP where each paid painter contributes a variable coverage allows us to compute the minimal total cost efficiently.
