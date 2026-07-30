# 276. Paint Fence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/paint-fence](https://leetcode.com/problems/paint-fence)
**Companies:** Google, Meta, Rubrik, Snowflake

---

## Problem Description
Given **n** fence posts and **k** colors, compute the number of ways to paint all posts such that no more than two adjacent posts have the same color. The answer can be large; return it modulo any required value (not needed for this description).

## Examples
- **Input:** n = 3, k = 2
  **Output:** 6
  **Explanation:** All possible colorings respecting the rule are counted.
- **Input:** n = 1, k = 3
  **Output:** 3
  **Explanation:** Each post can be any of the three colors.

## Approach
Use dynamic programming with two states:
- **same** – ways where the last two posts share the same color.
- **diff** – ways where the last two posts have different colors.
Initialize for the first two posts and iterate from the third to **n**, updating the states.

```text
FUNCTION numWays(n, k):
    IF n == 0: RETURN 0
    IF n == 1: RETURN k
    SET same ← k               // two same colors for first two posts
    SET diff ← k * (k - 1)     // two different colors for first two posts
    FOR i ← 3 TO n:
        SET newSame ← diff
        SET newDiff ← (same + diff) * (k - 1)
        SET same ← newSame
        SET diff ← newDiff
    RETURN same + diff
```

## Walkthrough
| i | same | diff | Explanation |
|---|------|------|-------------|
|1|k|0|Only one post, all colors possible|
|2|k|k·(k‑1)|Two posts: either same or different|
|3|k·(k‑1)|k·(k‑1)·(k‑2)+k·(k‑1)·(k‑1)|Update using recurrence|

The table continues until **i = n**.

## Complexity Analysis
- **Time:** O(n) – one pass over the posts.
- **Space:** O(1) – only two variables are stored.

## Follow-Up Questions
1. How would you modify the solution to return the result modulo 10⁹+7?
2. Can the problem be extended to limit runs of the same color to at most **m** consecutive posts?
3. What if the colors have different costs?

## Key Takeaway
Track only two DP states—whether the last two posts are the same or different—to achieve linear time and constant space.
