# 1659. Maximize Grid Happiness

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-grid-happiness](https://leetcode.com/problems/maximize-grid-happiness)
**Companies:** Salesforce

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Bitmask DP — O(m·3ⁿ·3ⁿ·I·E)](#approach-bitmask-dp)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` grid (m ≤ 5, n ≤ 5), place at most `introvertsCount` introverts and `extrovertsCount` extroverts to maximize total happiness. Introverts start at 120 happiness and lose 30 per neighbor; extroverts start at 40 and gain 20 per neighbor.

**Constraints:**
- `1 ≤ m, n ≤ 5`
- `0 ≤ introvertsCount, extrovertsCount ≤ min(6, m·n)`

---

## Key Insight

> With m, n ≤ 5, use **profile DP** (bitmask/tritmask). The state is the current row's configuration (each cell: empty/introvert/extrovert = base-3), plus remaining introvert/extrovert counts. Transition row by row, computing happiness changes from vertical neighbors (previous row) and horizontal neighbors (within the row).

---

## Approach: Bitmask DP — O(m·3ⁿ·3ⁿ·I·E) ✅

```
FUNCTION getMaxGridHappiness(m, n, introverts, extroverts):
    // Each row configuration is a base-3 number of length n
    // 0 = empty, 1 = introvert, 2 = extrovert
    
    // dp[row][prevMask][intLeft][extLeft] = max happiness
    // Transition: for each valid current row mask, compute
    //   happiness from placed people + neighbor penalties/bonuses
    //   with the previous row mask
    
    RETURN dp[0][0][introverts][extroverts]  // start from row 0
```

Due to small constraints (3⁵ = 243 masks, ≤ 6 of each type), this is feasible with memoization.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Profile DP | **O(m · 3²ⁿ · I · E)** | O(3ⁿ · I · E) |

With n ≤ 5: 3⁵ = 243, so 243² ≈ 59K masks per row. With I, E ≤ 6: manageable.

---

## Key Takeaway

> **Small grid dimensions (≤ 5) signal profile/bitmask DP.** Encode each row's state as a base-3 number and transition row by row, tracking remaining resource counts.
