# 2742. Painting the Walls

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/painting-the-walls](https://leetcode.com/problems/painting-the-walls)
**Companies:** Amazon, De Shaw, Google, Meesho, Meta, Snowflake

---

## Problem Description
You are given two integer arrays `cost` and `time`, each of length `n`. Painting wall `i` with a paid painter costs `cost[i]` and takes `time[i] + 1` total wall units (the paid painter paints wall `i` while a free painter simultaneously paints `time[i]` additional walls). Determine the minimum total cost to have all `n` walls painted.

**Constraints** include:
- `1 <= n <= 10^3`
- `0 <= cost[i] <= 10^4`
- `0 <= time[i] <= n`

## Examples
**Example 1**
```
Input: cost = [1,2,3], time = [1,0,1]
Output: 3
Explanation: Paint wall 0 (cost 1, covers walls 0 and 1), then paint wall 2 (cost 3). Total cost = 4? Actually optimal cost = 3 by painting walls 0 and 2 with paid painter and free painter covering wall 1.
```

**Example 2**
```
Input: cost = [5,4,6], time = [0,0,0]
Output: 15
Explanation: No free painter benefit; must pay for each wall.
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
Consider `cost = [1,2,3]`, `time = [1,0,1]`:
| i | cost[i] | time[i] | Covers (including free) |
|---|---------|---------|--------------------------|
|0|1|1|2 walls (0 and 1)
|1|2|0|1 wall (1)
|2|3|1|2 walls (2 and maybe beyond) |
Processing backwards updates `dp` so that after wall 0, `dp[2] = 1` (paint 2 walls for cost 1). After wall 2, `dp[3] = 3`.

## Complexity Analysis
- **Time:** O(n²) – nested loops over `n` walls and up to `n` painted count.
- **Space:** O(n) – the `dp` array.

## Follow‑Up Questions
1. How can the solution be optimized for larger `n` (e.g., using monotonic queues)?
2. What changes if the free painter can only paint immediately adjacent walls?
3. Can you extend the DP to output the actual sequence of walls paid for?

## Key Takeaway
Modeling the problem as a knapsack‑style DP where each paid painter contributes a variable coverage allows us to compute the minimal total cost efficiently.
