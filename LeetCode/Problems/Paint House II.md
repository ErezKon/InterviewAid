# 265. Paint House II

**Difficulty:** 🔴 Hard
**Companies:** Linkedin, Meta

---

## Problem Description
Given an `n × k` matrix `costs` where `costs[i][j]` is the cost of painting house `i` with color `j`, paint all houses such that no two adjacent houses have the same color. Return the minimum total cost.

## Examples
- **Input:** costs = [[1,5,3],[2,9,4]]
  **Output:** 5
  **Explanation:** Paint house 0 with color 0 (cost 1) and house 1 with color 2 (cost 4).
- **Input:** costs = [[1,3],[2,4],[3,5]]
  **Output:** 5
  **Explanation:** Choose colors 0,1,0 respectively.

## Approach
Use dynamic programming while keeping only the smallest and second‑smallest costs from the previous row.
1. For the first house, store its costs.
2. For each subsequent house, for each color `j`:
   - If `j` is not the index of the previous row's minimum, add that minimum.
   - Otherwise add the previous row's second minimum.
3. After processing all houses, the answer is the minimum value in the last row.

```text
FUNCTION minCostII(costs):
    SET n ← NUMBER OF rows in costs
    SET k ← NUMBER OF columns in costs[0]
    SET prev ← costs[0]
    FOR i ← 1 TO n-1:
        // Find smallest and second smallest in prev
        SET min1 ← INF, min2 ← INF, idx1 ← -1
        FOR j ← 0 TO k-1:
            IF prev[j] < min1:
                SET min2 ← min1
                SET min1 ← prev[j]
                SET idx1 ← j
            ELSE IF prev[j] < min2:
                SET min2 ← prev[j]
        SET curr ← ARRAY OF SIZE k
        FOR j ← 0 TO k-1:
            IF j != idx1:
                SET curr[j] ← costs[i][j] + min1
            ELSE:
                SET curr[j] ← costs[i][j] + min2
        SET prev ← curr
    RETURN MIN(prev)
```

## Walkthrough
Consider `costs = [[1,5,3],[2,9,4]]` (n=2, k=3).
| House | prev (costs) | min1 | idx1 | min2 |
|-------|--------------|------|------|------|
|0|[1,5,3]|1|0|3|
|1|Compute curr: for j=0 use min2 → 2+3=5; j=1 use min1 → 9+1=10; j=2 use min1 → 4+1=5| → curr = [5,10,5]
Result = min(curr) = 5.

## Complexity Analysis
- **Time:** O(n · k) – each house scans all colors twice.
- **Space:** O(k) – only two rows are stored.

## Follow-Up Questions
1. How would you adapt the solution if the number of colors `k` is very large (e.g., 10⁵)?
2. Can the algorithm be extended to enforce a maximum of `m` consecutive houses with the same color?
3. What changes are needed if each house has a list of forbidden colors?

## Key Takeaway
By tracking only the smallest and second‑smallest costs of the previous row, the DP runs in O(nk) time with O(k) space, avoiding the O(nk²) naïve approach.
