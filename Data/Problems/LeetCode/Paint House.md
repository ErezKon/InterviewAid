# 256. Paint House

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/paint-house](https://leetcode.com/problems/paint-house)
**Companies:** Amazon, Citadel, Google, Linkedin, Microsoft, Navan, Shopify, Uber

---

## Problem Description
There is a row of `n` houses, where each house can be painted one of three colors: red, blue, or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by an `n x 3` cost matrix `costs`.

- For example, `costs[0][0]` is the cost of painting house `0` with the color red; `costs[1][2]` is the cost of painting house 1 with color green, and so on...

Return *the minimum cost to paint all houses*.

**Constraints:**

- `costs.length == n`
- `costs[i].length == 3`
- `1 <= n <= 100`
- `1 <= costs[i][j] <= 20`

## Examples

```
Example 1:
  Input: costs = [[17,2,17],[16,16,5],[14,3,19]]
  Output: 10
  Explanation: Paint house 0 into blue, paint house 1 into green, paint house 2 into blue.
  Minimum cost: 2 + 5 + 3 = 10.
```

```
Example 2:
  Input: costs = [[7,6,2]]
  Output: 2
```

## Approach
Dynamic Programming – accumulate the minimum cost for each color while respecting the adjacency rule.

```text
FUNCTION minCost(costs):
    n ← LENGTH(costs)
    FOR i ← 1 TO n - 1:
        // Paint house i red, cannot use previous red
        costs[i][0] ← costs[i][0] + MIN(costs[i-1][1], costs[i-1][2])
        // Paint house i blue
        costs[i][1] ← costs[i][1] + MIN(costs[i-1][0], costs[i-1][2])
        // Paint house i green
        costs[i][2] ← costs[i][2] + MIN(costs[i-1][0], costs[i-1][1])
    RETURN MIN(costs[n-1][0], costs[n-1][1], costs[n-1][2])
```

The DP transition uses the optimal cost of the previous house for the two allowed colors.

## Walkthrough
Consider `costs = [[17,2,17],[16,16,5],[14,3,19]]`:
| House | Red | Blue | Green |
|-------|-----|------|-------|
| 0 | 17 | **2** | 17 |
| 1 | 16+min(2,17)=18 | 16+min(17,17)=33 | 5+min(17,2)=7 |
| 2 | 14+min(33,7)=21 | 3+min(18,7)=10 | 19+min(18,33)=37 |
Minimum of last row = **10**.

## Complexity Analysis
- **Time:** O(n) – one pass through the houses.
- **Space:** O(1) extra if we modify `costs` in‑place; otherwise O(n) for a separate DP table.

## Follow‑Up Questions
1. How would you extend the solution to `k` colors?
2. How can you reconstruct the actual color choices for each house?
3. What if the adjacency restriction applies to a sliding window of size > 1?

## Key Takeaway
By storing the best cumulative cost for each color and updating it iteratively, we avoid recomputation and achieve linear time with constant extra space.
