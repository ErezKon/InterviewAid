# 1595. Minimum Cost to Connect Two Groups of Points

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points](https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points)
**Companies:** Google

---

## Problem Description

You are given two groups of points where the first group has `size1` points, the second group has `size2` points, and `size1 >= size2`.

The `cost` of the connection between any two points are given in an `size1 x size2` matrix where `cost[i][j]` is the cost of connecting point `i` of the first group and point `j` of the second group. The groups are connected if **each point in both groups is connected to one or more points in the opposite group**. In other words, each point in the first group must be connected to at least one point in the second group, and each point in the second group must be connected to at least one point in the first group.

Return *the minimum cost it takes to connect the two groups*.

**Constraints:**
- `size1 == cost.length`
- `size2 == cost[i].length`
- `1 ≤ size1, size2 ≤ 12`
- `size1 >= size2`
- `0 ≤ cost[i][j] ≤ 100`

## Examples

```
Example 1:
  Input: cost = [[15, 96], [36, 2]]
  Output: 17
  Explanation: The optimal way of connecting the groups is:
  1--A
  2--B
  This results in a total cost of 17.
```

```
Example 2:
  Input: cost = [[1, 3, 5], [4, 1, 1], [1, 5, 3]]
  Output: 4
  Explanation: The optimal way of connecting the groups is:
  1--A
  2--B
  2--C
  3--A
  This results in a total cost of 4.
  Note that there are multiple points connected to point 2 in the first group and point A in the second group. This does not matter as there is no limit to the number of points that can be connected. We only care about the minimum total cost.
```

```
Example 3:
  Input: cost = [[2, 5, 1], [3, 4, 7], [8, 1, 2], [6, 2, 4], [3, 8, 8]]
  Output: 10
```

## Approach

**Algorithm:** Bitmask Dynamic Programming on the smaller group

We iterate over points of the first group, maintaining a DP map from a bitmask of already connected points in group 2 to the minimum cost incurred so far.

For each point `i` in group 1 we consider connecting it to every point `j` in group 2, updating the mask `mask | (1 << j)` with the new cost `dp[mask] + cost[i][j]`.

After processing all points of group 1, some points of group 2 may still be unconnected. For each such point we add its cheapest possible connection (pre-computed `minCost2[j]`). The final answer is the minimum over all masks.

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
        // add cheapest connections for any still-unconnected points in group2
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

## Follow-Up Questions

1. How would the solution change if the groups had different size limits (e.g., `m` up to 100, `n` up to 12)?
2. Can we adapt the DP to also output the actual set of connections achieving the minimum cost?
3. What if each connection also had a capacity constraint, turning the problem into a flow formulation?

## Key Takeaway

Bitmask DP efficiently enumerates all ways to cover the smaller group while remembering which points of the larger group are already connected; uncovered points are then attached using their cheapest individual edges.
