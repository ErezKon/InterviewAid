# 1473. Paint House III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/paint-house-iii](https://leetcode.com/problems/paint-house-iii)
**Companies:** Google, Linkedin, Paypal

---

## Problem Description
There is a row of `m` houses in a small city, each house must be painted with one of the `n` colors (labeled from `1` to `n`), some houses that have been painted last summer should not be painted again.

A neighborhood is a maximal group of continuous houses that are painted with the same color.

- For example: `houses = [1,2,2,3,3,2,1,1]` contains `5` neighborhoods `[{1}, {2,2}, {3,3}, {2}, {1,1}]`.

Given an array `houses`, an `m x n` matrix `cost` and an integer `target` where:

- `houses[i]`: is the color of the house `i`, and `0` if the house is not painted yet.
- `cost[i][j]`: is the cost of paint the house `i` with the color `j + 1`.

Return *the minimum cost of painting all the remaining houses in such a way that there are exactly* `target` *neighborhoods*. If it is not possible, return `-1`.

**Constraints:**

- `m == houses.length == cost.length`
- `n == cost[i].length`
- `1 <= m <= 100`
- `1 <= n <= 20`
- `1 <= target <= m`
- `0 <= houses[i] <= n`
- `1 <= cost[i][j] <= 10^4`

## Examples

```
Example 1:
  Input: houses = [0,0,0,0,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3
  Output: 9
  Explanation: Paint houses of this way [1,2,2,1,1]
  This array contains target = 3 neighborhoods, [{1}, {2,2}, {1,1}].
  Cost of paint all houses (1 + 1 + 1 + 1 + 5) = 9.
```

```
Example 2:
  Input: houses = [0,2,1,2,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3
  Output: 11
  Explanation: Some houses are already painted, Paint the houses of this way [2,2,1,2,2]
  This array contains target = 3 neighborhoods, [{2,2}, {1}, {2,2}].
  Cost of paint the first and last house (10 + 1) = 11.
```

```
Example 3:
  Input: houses = [3,1,2,3], cost = [[1,1,1],[1,1,1],[1,1,1],[1,1,1]], m = 4, n = 3, target = 3
  Output: -1
  Explanation: Houses are already painted with a total of 4 neighborhoods [{3},{1},{2},{3}] different of target = 3.
```

## Approach
Dynamic programming with three dimensions:
- `i` – index of the current house (0-based).
- `j` – color used for house `i` (1-based).
- `k` – number of neighborhoods formed so far.
`dp[i][j][k]` stores the minimum cost for the prefix `0..i` ending with color `j` and `k` neighborhoods.
Transition:
1. If `houses[i]` is already painted (`houses[i] != 0`), only that color is allowed.
2. Otherwise iterate over all colors `j`.
3. For each previous color `p` at `i-1`:
   - If `j == p`, neighborhoods count stays `k`.
   - Else neighborhoods count becomes `k-1`.
Take the minimum over all valid transitions.
Finally, answer = min over `dp[m-1][j][target]` for all colors `j`.

```text
FUNCTION minCost(houses, cost, m, n, target):
    SET INF ← 10^9
    CREATE dp[m][n+1][target+1] FILLED WITH INF
    // Initialize first house
    IF houses[0] != 0:
        SET dp[0][houses[0]][1] ← 0
    ELSE:
        FOR color ← 1 TO n:
            SET dp[0][color][1] ← cost[0][color-1]
    // Fill DP
    FOR i ← 1 TO m-1:
        FOR color ← 1 TO n:
            IF houses[i] != 0 AND houses[i] != color: CONTINUE
            SET paintCost ← 0 IF houses[i] != 0 ELSE cost[i][color-1]
            FOR prevColor ← 1 TO n:
                FOR k ← 1 TO target:
                    IF dp[i-1][prevColor][k] == INF: CONTINUE
                    SET newK ← k + (1 IF color != prevColor ELSE 0)
                    IF newK > target: CONTINUE
                    SET dp[i][color][newK] ← MIN(dp[i][color][newK], dp[i-1][prevColor][k] + paintCost)
    SET answer ← MIN(dp[m-1][color][target] FOR color ← 1 TO n)
    RETURN -1 IF answer == INF ELSE answer
```

## Walkthrough
Example 2: `houses = [0,2,1,2,0]`, `cost = [[1,10],[10,1],[10,1],[1,10],[5,1]]`, `n = 2`, `target = 3`.
Notation: `dp[i][color] = [k=1, k=2, k=3]` (INF shown as `-`).
1. House 0 (unpainted): `dp[0][1] = [1,-,-]`, `dp[0][2] = [10,-,-]`.
2. House 1 (fixed color 2, paint cost 0):
   - From color 2, k=1 (same) -> `dp[1][2][1] = 10`.
   - From color 1, k=1 (different) -> `dp[1][2][2] = 1`.
   - `dp[1][2] = [10,1,-]`, `dp[1][1]` all INF.
3. House 2 (fixed color 1): from color 2 (different) -> k shifts by 1: `dp[2][1] = [-,10,1]`.
4. House 3 (fixed color 2): from color 1 (different), `dp[2][1][2] = 10` -> `dp[3][2][3] = 10`; `dp[2][1][3] = 1` would need k=4 > target, dropped. `dp[3][2] = [-,-,10]`.
5. House 4 (unpainted):
   - Color 2 (same as prev): `dp[4][2][3] = 10 + cost[4][1] = 11`.
   - Color 1 (different): would need k=4, dropped.
6. Answer = `min(dp[4][1][3], dp[4][2][3]) = 11` (painting `[2,2,1,2,2]`).

## Complexity Analysis
- **Time:** O(m · n² · target) – three nested loops over houses, colors, and neighborhoods.
- **Space:** O(m · n · target) – can be reduced to O(n · target) by rolling arrays.

## Follow-Up Questions
1. How would you optimize space to O(n · target) using two layers of DP?
2. Can the solution be adapted if each house has a limited set of allowable colors?
3. What changes are needed to output the actual painting plan, not just the cost?

## Key Takeaway
Model the problem with DP over house index, color, and neighborhoods, and use the smallest-and-second-smallest trick only when colors are unrestricted; otherwise a full three-dimensional DP is required.
