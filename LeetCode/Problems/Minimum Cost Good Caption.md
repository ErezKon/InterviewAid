# 3441. Minimum Cost Good Caption

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-good-caption](https://leetcode.com/problems/minimum-cost-good-caption)
**Companies:** Fractal Analytics, Tiktok

---

## Key Insight

> A "good caption" requires every group of consecutive identical characters to have length ≥ 3. Use DP where `dp[i][c]` = min cost to make `s[0..i]` valid, ending with character `c`. Group characters and decide whether to extend or start new groups.

---

## Approach: DP with Character Groups ✅

```
FUNCTION minCostGoodCaption(s):
    n ← LEN(s)
    // dp[i][c] = min cost to process s[0..i-1] where position i-1 ends with char c
    // Must ensure all runs have length ≥ 3
    // Try grouping consecutive positions into runs of same character
    // For each group of 3+, cost = sum of changes to make all same
    
    // Implementation: sliding window DP over groups of size ≥ 3
    // For each position and each possible character (26),
    // track minimum cost of making a valid grouping
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(26 · n)** | **O(26 · n)** |

---

## Key Takeaway

> **Run-length constrained DP** — ensure every character run has length ≥ 3 while minimizing character change costs.

---
