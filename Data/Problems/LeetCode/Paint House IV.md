# 3429. Paint House IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/paint-house-iv](https://leetcode.com/problems/paint-house-iv)
**Companies:** Amazon, Bloomberg, Chargebee

---

## Problem Description
You are given an **even** integer `n` representing the number of houses arranged in a straight line, and a 2D array `cost` of size `n x 3`, where `cost[i][j]` represents the cost of painting house `i` with color `j + 1`.

The houses will look **beautiful** if they satisfy the following conditions:

- No **two** adjacent houses are painted the same color.
- Houses **equidistant** from the ends of the row are **not** painted the same color. For example, if `n = 6`, houses at positions `(0, 5)`, `(1, 4)`, and `(2, 3)` are considered equidistant.

Return the **minimum** cost to paint the houses such that they look **beautiful**.

**Constraints:**

- `2 <= n <= 10^5`
- `n` is even.
- `cost.length == n`
- `cost[i].length == 3`
- `0 <= cost[i][j] <= 10^5`

## Examples
```
Example 1:
  Input: n = 4, cost = [[3,5,7],[6,2,9],[4,8,1],[7,3,5]]
  Output: 9
  Explanation: The optimal painting sequence is [1, 2, 3, 2] with corresponding costs [3, 2, 1, 3]. This satisfies the following conditions:
    - No adjacent houses have the same color.
    - Houses at positions 0 and 3 (equidistant from the ends) are not painted the same color (1 != 2).
    - Houses at positions 1 and 2 (equidistant from the ends) are not painted the same color (2 != 3).
  The minimum cost to paint the houses so that they look beautiful is 3 + 2 + 1 + 3 = 9.
```

```
Example 2:
  Input: n = 6, cost = [[2,4,6],[5,3,8],[7,1,9],[4,6,2],[3,5,7],[8,2,4]]
  Output: 18
  Explanation: The optimal painting sequence is [1, 3, 2, 3, 1, 2] with corresponding costs [2, 8, 1, 2, 3, 2]. This satisfies the following conditions:
    - No adjacent houses have the same color.
    - Houses at positions 0 and 5 (equidistant from the ends) are not painted the same color (1 != 2).
    - Houses at positions 1 and 4 (equidistant from the ends) are not painted the same color (3 != 1).
    - Houses at positions 2 and 3 (equidistant from the ends) are not painted the same color (2 != 3).
  The minimum cost to paint the houses so that they look beautiful is 2 + 8 + 1 + 2 + 3 + 2 = 18.
```
<!-- choose color 2 (cost 4) to avoid matching the previous house. -->

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
