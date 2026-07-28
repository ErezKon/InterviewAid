# 3429. Paint House IV

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Bloomberg, Chargebee

---

## Problem Description
Given `m` houses in a line and `n` possible colors, each house may already be painted with a fixed color or be unpainted (represented by 0). You must repaint the houses so that no two adjacent houses share the same color while minimizing the total repaint cost. The cost of painting house `i` with color `c` is provided in a matrix `cost[i][c]`. Return the minimum possible total cost.

## Examples
- **Input:** `houses = [0,0,0]`, `cost = [[1,2],[2,1],[1,2]]`
  **Output:** `3`
  **Explanation:** Paint houses as `[1,2,1]` with total cost `1+1+1 = 3`.
- **Input:** `houses = [1,2,0]`, `cost = [[0,0],[0,0],[5,4]]`
  **Output:** `4`
  **Explanation:** Only the last house is unpainted; choose color 2 (cost 4) to avoid matching the previous house.

## Approach
Perform two DP passes:
1. **Forward pass** – compute the minimum cost to paint up to each house assuming the left neighbor's color.
2. **Backward pass** – compute the minimum cost from the right side.
Combine the two passes to ensure both left and right adjacency constraints are satisfied.
The state `dp[i][c]` stores the minimum cost to paint houses `0..i` with house `i` colored `c`.
For each house, transition from any color `p` of the previous house where `p != c`.
After the forward pass, run a similar backward pass to enforce the right‑side constraint and take the minimum combined cost.

```text
FUNCTION minCostPaint(houses, cost):
    SET m ← LENGTH of houses
    SET n ← NUMBER OF colors per house
    CREATE forward[m][n] FILLED WITH INF
    CREATE backward[m][n] FILLED WITH INF
    // Initialize first house
    FOR c ← 0 TO n-1:
        IF houses[0] == 0 OR houses[0] == c+1:
            SET forward[0][c] ← cost[0][c]
    // Forward DP
    FOR i ← 1 TO m-1:
        FOR c ← 0 TO n-1:
            IF houses[i] != 0 AND houses[i] != c+1: CONTINUE
            SET paintCost ← cost[i][c]
            FOR p ← 0 TO n-1:
                IF p == c: CONTINUE
                SET forward[i][c] ← MIN(forward[i][c], forward[i-1][p] + paintCost)
    // Initialize last house for backward DP
    FOR c ← 0 TO n-1:
        IF houses[m-1] == 0 OR houses[m-1] == c+1:
            SET backward[m-1][c] ← cost[m-1][c]
    // Backward DP
    FOR i ← m-2 DOWNTO 0:
        FOR c ← 0 TO n-1:
            IF houses[i] != 0 AND houses[i] != c+1: CONTINUE
            SET paintCost ← cost[i][c]
            FOR p ← 0 TO n-1:
                IF p == c: CONTINUE
                SET backward[i][c] ← MIN(backward[i][c], backward[i+1][p] + paintCost)
    // Combine passes
    SET answer ← INF
    FOR i ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            SET answer ← MIN(answer, forward[i][c] + backward[i][c] - cost[i][c])
    RETURN answer
```

## Walkthrough
Consider `houses = [0,0]`, `cost = [[1,2],[2,1]]` (2 houses, 2 colors).
1. Forward DP:
   - House 0: `forward[0] = [1,2]`.
   - House 1: for color 0, take min from previous color 1 → `1 + 2 = 3`; for color 1, take min from previous color 0 → `2 + 1 = 3`.
   Result `forward[1] = [3,3]`.
2. Backward DP mirrors the same values.
3. Combine: `answer = min( forward[0][c] + backward[0][c] - cost[0][c], forward[1][c] + backward[1][c] - cost[1][c] ) = 3`.
Thus the minimum cost is `3`.

## Complexity Analysis
- **Time:** O(m · n²) – each house considers all pairs of different colors.
- **Space:** O(m · n) – two DP tables; can be reduced to O(n) with rolling arrays.

## Follow-Up Questions
1. How would you adapt the algorithm if the number of colors `n` is very large (e.g., 10⁵)?
2. Can the solution be extended to allow a maximum of `k` consecutive houses of the same color?
3. What changes are needed to output the actual painting sequence, not just the cost?

## Key Takeaway
Two directional DP passes let you enforce adjacency constraints from both sides while keeping the state simple: minimum cost for each possible color at each position.
