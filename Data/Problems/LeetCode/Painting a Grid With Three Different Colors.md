# 1931. Painting a Grid With Three Different Colors

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/painting-a-grid-with-three-different-colors](https://leetcode.com/problems/painting-a-grid-with-three-different-colors)
**Companies:** Amazon, Bloomberg, Google, Intuit, Meta, Microsoft, Uber

---

## Problem Description
You are given two integers `m` and `n`. Consider an `m x n` grid where each cell is initially white. You can paint each cell **red**, **green**, or **blue**. All cells **must** be painted.

Return *the number of ways to color the grid with **no two adjacent cells having the same color***. Since the answer can be very large, return it **modulo** `10^9 + 7`.

**Constraints:**

- `1 <= m <= 5`
- `1 <= n <= 1000`

## Examples

```
Example 1:
  Input: m = 1, n = 1
  Output: 3
  Explanation: The three possible colorings are: R, G, B.
```

```
Example 2:
  Input: m = 1, n = 2
  Output: 6
  Explanation: The six possible colorings are: RG, RB, GR, GB, BR, BG.
```

```
Example 3:
  Input: m = 5, n = 5
  Output: 580986
```

## Approach
State‑Compression Dynamic Programming – treat each column as a state (a length‑`m` string of colors with no vertical adjacency). Pre‑compute all valid states and which pairs of states are compatible (no same color in the same row). Then iterate column by column, accumulating counts.

```text
FUNCTION colorTheGrid(m, n):
    MOD ← 1_000_000_007
    // Generate all valid column states
    validStates ← []
    FOR mask FROM 0 TO 3^m - 1:
        state ← decode(mask, m) // list of m colors
        IF no two adjacent colors in state are equal:
            APPEND state TO validStates
    // Pre‑compute compatibility
    compatible ← MAP from state TO list of states
    FOR s1 IN validStates:
        FOR s2 IN validStates:
            IF for all i: s1[i] ≠ s2[i]:
                APPEND s2 TO compatible[s1]
    // DP over columns
    dp ← MAP from state TO 1  // first column
    FOR col FROM 1 TO n-1:
        newDp ← MAP from state TO 0
        FOR curState IN validStates:
            total ← 0
            FOR prevState IN compatible[curState]:
                total ← (total + dp[prevState]) % MOD
            newDp[curState] ← total
        dp ← newDp
    answer ← SUM(dp[state] for state IN validStates) % MOD
    RETURN answer
```

## Walkthrough
For `m = 2`, valid column states are `01,02,10,12,20,21` (6 states). Compatibility excludes states with same color in any row. After processing three columns, summing the DP values yields `54`.

## Complexity Analysis
- **Time:** O(n · S²) where `S` is the number of valid states (≤ 48 for `m ≤ 5`).
- **Space:** O(S) for the DP table and compatibility lists.

## Follow‑Up Questions
1. How would the solution change if diagonal adjacency were also prohibited?
2. Can you extend the method to more than three colors?
3. What optimizations reduce the O(S²) transition cost?

## Key Takeaway
By compressing each column into a state and pre‑computing compatible transitions, we transform a 2‑D coloring problem into a linear DP over columns.
