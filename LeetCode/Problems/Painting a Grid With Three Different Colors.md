# 1931. Painting a Grid With Three Different Colors

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/painting-a-grid-with-three-different-colors](https://leetcode.com/problems/painting-a-grid-with-three-different-colors)
**Companies:** Amazon, Bloomberg, Google, Intuit, Meta, Microsoft, Uber

---

## Approach: State Machine DP — O(n · S²) ✅

```
FUNCTION colorTheGrid(m, n):
    MOD = 10^9 + 7
    // Generate all valid column colorings (no adjacent same color)
    validStates = generate all 3^m colorings where no two adjacent are same

    // Precompute compatible pairs (no same color in same row)
    compatible = {state: [other states with no position conflict]}

    dp = {state: 1 for state in validStates}
    FOR col ← 1 TO n - 1:
        newDp = {}
        FOR state IN validStates:
            newDp[state] = SUM(dp[prev] for prev in compatible[state])
        dp = newDp

    RETURN SUM(dp.values()) % MOD
```

For m ≤ 5, at most 48 valid column states. Precompute transitions.
