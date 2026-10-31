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
<!-- choose color 2 (cost 4) to avoid matching the previous house. -->

## Approach
Paint the row from both ends toward the middle, one **mirror pair** `(i, n-1-i)` at a time.
- State `dp[a][b]` = minimum cost to paint houses `0..i` and `n-1-i..n-1` where house `i` has color `a` and house `n-1-i` has color `b`.
- A pair is valid only if `a != b` (equidistant constraint). For the innermost pair `(n/2-1, n/2)` this same check also covers their adjacency.
- Transition from pair `i-1` with colors `(pa, pb)` to pair `i` with `(a, b)` requires `a != pa` (left neighbors) and `b != pb` (right neighbors).
- With 3 colors there are only 6 valid pair states, so each step is constant work.
- Answer = `min(dp[a][b])` after processing pair `n/2 - 1`.

```text
FUNCTION minCost(n, cost):
    dp ← {}
    FOR a IN 0..2, b IN 0..2 WITH a != b:
        dp[(a,b)] ← cost[0][a] + cost[n-1][b]
    FOR i ← 1 TO n/2 - 1:
        j ← n - 1 - i
        nd ← {}
        FOR a IN 0..2, b IN 0..2 WITH a != b:
            best ← MIN(dp[(pa,pb)] FOR (pa,pb) IN dp IF pa != a AND pb != b)
            nd[(a,b)] ← best + cost[i][a] + cost[j][b]
        dp ← nd
    RETURN MIN(dp.values())
```

## Walkthrough
Example 1: `n = 4`, `cost = [[3,5,7],[6,2,9],[4,8,1],[7,3,5]]` (colors 0-indexed below).
1. Pair `(0, 3)`: `dp[(a,b)] = cost[0][a] + cost[3][b]`:
   - `(0,1)=3+3=6`, `(0,2)=3+5=8`, `(1,0)=5+7=12`, `(1,2)=5+5=10`, `(2,0)=7+7=14`, `(2,1)=7+3=10`.
2. Pair `(1, 2)` (also the adjacent middle pair):
   - `(1,2)`: previous states with `pa != 1`, `pb != 2`: `(0,1)=6`, `(2,0)=14`, `(2,1)=10` -> best 6; add `cost[1][1] + cost[2][2] = 2 + 1` -> **9**.
   - Others: `(0,1)=24`, `(0,2)=17`, `(1,0)=12`, `(2,0)=19`, `(2,1)=25`.
3. Answer = `min = 9`, colors `[1,2,3,2]` (1-indexed), matching the expected output.

## Complexity Analysis
- **Time:** O(n) - n/2 pairs, each with a constant 6 x 6 state transition.
- **Space:** O(1) - only the previous pair's 6 states are kept.

## Follow-Up Questions
1. How would you generalize to `k` colors (O(n * k^4) naive; how to speed up with best/second-best tricks)?
2. How would you handle an odd `n`, where the middle house has no mirror partner?
3. What changes are needed to output the actual painting sequence, not just the cost?

## Key Takeaway
When constraints link position `i` with `n-1-i`, process mirror pairs together from the outside in; the state becomes the colors of both ends, and adjacency plus symmetry constraints are both checked locally.
