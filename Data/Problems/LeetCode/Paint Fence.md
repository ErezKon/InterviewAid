# 276. Paint Fence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/paint-fence](https://leetcode.com/problems/paint-fence)
**Companies:** Google, Meta, Rubrik, Snowflake

---

## Problem Description
You are painting a fence of `n` posts with `k` different colors. You must paint the posts following these rules:

- Every post must be painted **exactly one** color.
- There **cannot** be three or more **consecutive** posts with the same color.

Given the two integers `n` and `k`, return *the **number of ways** you can paint the fence*.

**Constraints:**

- `1 <= n <= 50`
- `1 <= k <= 10^5`
- The testcases are generated such that the answer is in the range `[0, 2^31 - 1]` for the given `n` and `k`.

## Examples

```
Example 1:
  Input: n = 3, k = 2
  Output: 6
  Explanation: All the possibilities are shown (posts colored with red R / green G):
    RRG, RGR, RGG, GRR, GRG, GGR
  Note that painting all the posts red or all the posts green is invalid because there cannot be three posts in a row with the same color.
```

```
Example 2:
  Input: n = 1, k = 1
  Output: 1
```

```
Example 3:
  Input: n = 7, k = 2
  Output: 42
```

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
|2|k|k·(k-1)|Two posts: either same or different|
|3|k·(k-1)|k·(k-1)·(k-2)+k·(k-1)·(k-1)|Update using recurrence|

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
