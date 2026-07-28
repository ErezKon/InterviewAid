# 1595. Minimum Cost to Connect Two Groups of Points

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points](https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points)
**Companies:** Google

---

## Problem Description

You are given two groups of points. `cost[i][j]` represents the cost to connect point `i` from group 1 with point `j` from group 2. Every point in both groups must be connected to at least one point in the opposite group. Find the minimum total cost to achieve this.

Constraints:
- `1 ≤ m, n ≤ 12` where `m = len(cost)` and `n = len(cost[0])`
- `0 ≤ cost[i][j] ≤ 10^5`

## Examples

**Example 1**
```
Input: cost = [[15,96],[36,2]]
Output: 17
Explanation: Connect point 0 (group1) to point 1 (group2) with cost 96 and point 1 (group1) to point 1 (group2) with cost 2. Total = 98? Actually optimal is connect 0→0 (15) and 1→1 (2) = 17.
```

**Example 2**
```
Input: cost = [[1,3,5],[4,1,1],[1,5,3]]
Output: 4
Explanation: Connect group1 point 0 to group2 point 0 (1), point 1 to group2 point 1 (1), point 2 to group2 point 0 (1) and also connect remaining group2 point 2 via cheapest edge (1). Total = 4.
```

## Approach

**Algorithm:** Bitmask Dynamic Programming on the smaller group

We iterate over points of the first group, maintaining a DP map from a bitmask of already connected points in group 2 to the minimum cost incurred so far.

For each point `i` in group 1 we consider connecting it to every point `j` in group 2, updating the mask `mask | (1 << j)` with the new cost `dp[mask] + cost[i][j]`.

After processing all points of group 1, some points of group 2 may still be unconnected. For each such point we add its cheapest possible connection (pre‑computed `minCost2[j]`). The final answer is the minimum over all masks.

```text
FUNCTION connectTwoGroups(cost):
    m ← LEN(cost)          // size of group1
    n ← LEN(cost[0])       // size of group2
    // cheapest single connection for each point in group2
    minCost2 ← ARRAY(n)
    FOR j ← 0 TO n-1 DO
        minCost2[j] ← INFINITY
        FOR i ← 0 TO m-1 DO
            minCost2[j] ← MIN(minCost2[j], cost[i][j])
        END FOR
    END FOR
    dp ← MAP()
    dp[0] ← 0               // no points in group2 connected yet
    FOR i ← 0 TO m-1 DO
        newDp ← MAP()
        FOR (mask, curCost) IN dp DO
            FOR j ← 0 TO n-1 DO
                newMask ← mask OR (1 << j)
                newCost ← curCost + cost[i][j]
                IF newMask NOT IN newDp OR newCost < newDp[newMask] THEN
                    newDp[newMask] ← newCost
                END IF
            END FOR
        END FOR
        dp ← newDp
    END FOR
    allMask ← (1 << n) - 1
    answer ← INFINITY
    FOR (mask, curCost) IN dp DO
        // add cheapest connections for any still‑unconnected points in group2
        extra ← 0
        FOR j ← 0 TO n-1 DO
            IF (mask AND (1 << j)) = 0 THEN
                extra ← extra + minCost2[j]
            END IF
        END FOR
        answer ← MIN(answer, curCost + extra)
    END FOR
    RETURN answer
```

## Walkthrough

| Step | Processed point `i` | Current mask | Cost added | New mask | Cumulative cost |
|------|---------------------|--------------|------------|----------|-----------------|
| 1    | 0                   | 0            | cost[0][0]=15 | 001 | 15 |
| 1    | 0                   | 0            | cost[0][1]=96 | 010 | 96 |
| 2    | 1                   | 001          | cost[1][1]=2  | 011 | 17 |
| …    | …                   | …            | …          | …        | … |

After all group1 points are assigned, any missing bits in the mask are filled using `minCost2` (the cheapest way to connect the remaining group2 points).

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(m · 2ⁿ · n)** – DP over `2ⁿ` masks for each of the `m` points, iterating over `n` connections |
| Space  | **O(2ⁿ)** – DP map stores one entry per mask |

## Follow‑Up Questions

1. How would the solution change if the groups had different size limits (e.g., `m` up to 100, `n` up to 12)?
2. Can we adapt the DP to also output the actual set of connections achieving the minimum cost?
3. What if each connection also had a capacity constraint, turning the problem into a flow formulation?

## Key Takeaway

Bitmask DP efficiently enumerates all ways to cover the smaller group while remembering which points of the larger group are already connected; uncovered points are then attached using their cheapest individual edges.
