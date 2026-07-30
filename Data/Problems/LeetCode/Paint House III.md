# 1473. Paint House III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/paint-house-iii](https://leetcode.com/problems/paint-house-iii)
**Companies:** Google, Linkedin, Paypal

---

## Problem Description
You are given `houses`, an array of length `m` where `houses[i]` is the color of the `i`‑th house (0 if not painted). `cost[i][j]` is the cost to paint house `i` with color `j` (1‑indexed). There are `n` possible colors. Paint all unpainted houses so that exactly `target` neighborhoods are formed (a neighborhood is a maximal contiguous segment of houses with the same color) while minimizing total cost. Return the minimum cost, or `-1` if impossible.

## Examples
- **Input:** `houses = [0,0,0,0,0]`, `cost = [[1,10],[10,1],[10,1],[1,10],[5,1]]`, `m = 5`, `n = 2`, `target = 3`
  **Output:** `9`
  **Explanation:** Paint houses as `[1,2,2,1,1]` forming three neighborhoods with total cost 9.
- **Input:** `houses = [0,2,1,2,0]`, `cost = [[1,10],[10,1],[10,1],[1,10],[5,1]]`, `target = 3`
  **Output:** `-1`
  **Explanation:** Already painted houses prevent achieving exactly 3 neighborhoods.

## Approach
Dynamic programming with three dimensions:
- `i` – index of the current house (0‑based).
- `j` – color used for house `i` (1‑based).
- `k` – number of neighborhoods formed so far.
`dp[i][j][k]` stores the minimum cost for the prefix `0..i` ending with color `j` and `k` neighborhoods.
Transition:
1. If `houses[i]` is already painted (`houses[i] != 0`), only that color is allowed.
2. Otherwise iterate over all colors `j`.
3. For each previous color `p` at `i‑1`:
   - If `j == p`, neighborhoods count stays `k`.
   - Else neighborhoods count becomes `k‑1`.
Take the minimum over all valid transitions.
Finally, answer = min over `dp[m‑1][j][target]` for all colors `j`.

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
Consider `houses = [0,0]`, `cost = [[5,1],[4,2]]`, `n = 2`, `target = 2`.
1. Initialize `dp[0][1][1] = 5`, `dp[0][2][1] = 1`.
2. For house 1, color 1:
   - From prevColor 1 (same) → `newK = 1`, cost = 5+4 = 9.
   - From prevColor 2 (different) → `newK = 2`, cost = 1+4 = 5.
   Store minima accordingly.
3. For house 1, color 2 similarly.
4. Minimum cost for exactly 2 neighborhoods is `5`.

## Complexity Analysis
- **Time:** O(m · n² · target) – three nested loops over houses, colors, and neighborhoods.
- **Space:** O(m · n · target) – can be reduced to O(n · target) by rolling arrays.

## Follow-Up Questions
1. How would you optimize space to O(n · target) using two layers of DP?
2. Can the solution be adapted if each house has a limited set of allowable colors?
3. What changes are needed to output the actual painting plan, not just the cost?

## Key Takeaway
Model the problem with DP over house index, color, and neighborhoods, and use the smallest‑and‑second‑smallest trick only when colors are unrestricted; otherwise a full three‑dimensional DP is required.
