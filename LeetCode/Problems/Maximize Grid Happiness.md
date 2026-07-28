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

```text
FUNCTION getMaxGridHappiness(m, n, introverts, extroverts):
    // dp[row][prevMask][intLeft][extLeft] = max happiness so far
    // Iterate over all possible masks for the current row (0 … 3^n - 1)
    // For each mask, compute:
    //   - happiness contributed by placed introverts/extroverts
    //   - neighbor effects with prevMask (vertical) and within mask (horizontal)
    //   - update remaining counts
    // Store the best value in dp for the next row.
    RETURN dp[0][0][introverts][extroverts]
```

---

## Examples

**Example 1:**
```
Input: m = 2, n = 3, introvertsCount = 1, extrovertsCount = 2
Output: 240
Explanation: Place one introvert at (0,0) and two extroverts at (0,1) and (1,0).
The introvert loses 30 for each neighbor (2 neighbors) → 120‑60 = 60.
Each extrovert gains 20 for each neighbor (introvert neighbor gives +20, extrovert‑extrovert gives +20).
Total happiness = 60 + 2·(40+20) = 240.
```

**Example 2:**
```
Input: m = 1, n = 2, introvertsCount = 2, extrovertsCount = 0
Output: 180
Explanation: Both cells hold introverts. Each introvert loses 30 for the single neighbor.
Total = 2·(120‑30) = 180.
```

---

## Walkthrough

Consider the first example (m=2, n=3). The DP processes rows sequentially.

| Row | PrevMask (base‑3) | CurrMask (base‑3) | Introverts Used | Extroverts Used | Row Happiness |
|-----|-------------------|-------------------|-----------------|-----------------|----------------|
| 0   | 0 (empty)         | 012 (cells: empty, introvert, extrovert) | 1 | 1 | 120 (introvert) + 40 (extrovert) + neighbor effects = 160 |
| 1   | 012               | 020 (empty, extrovert, empty) | 0 | 1 | Additional happiness from vertical neighbor (introvert‑extrovert) = 80 |

The DP accumulates the best total (240) after processing both rows.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Profile DP | **O(m · 3²ⁿ · I · E)** | O(3ⁿ · I · E) |

---

## Follow-Up Questions

- How would the algorithm change if the grid dimensions were larger (e.g., up to 10×10)?
- Can we reduce the state space by compressing masks using symmetry?
- What if each cell had a different base happiness value?

---

## Key Takeaway

> **Small grid dimensions (≤ 5) signal profile/bitmask DP.** Encode each row's state as a base‑3 number and transition row by row, tracking remaining resource counts.
