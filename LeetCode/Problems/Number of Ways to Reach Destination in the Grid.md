# 2912. Number of Ways to Reach Destination in the Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-reach-destination-in-the-grid](https://leetcode.com/problems/number-of-ways-to-reach-destination-in-the-grid)
**Companies:** Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP / Combinatorics](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count ways to reach a destination cell in a grid with movement constraints. Return mod 10⁹+7.

---

## 2. Key Insight

> Depending on exact constraints, either grid DP or combinatorial counting (e.g., C(m+n-2, m-1) for basic grid paths). Obstacles require inclusion-exclusion or DP.

---

## 3. Approach: DP / Combinatorics ✅

```
// Standard grid DP: dp[r][c] = sum of dp from valid predecessors
// Or combinatorial formula for unrestricted paths
// Adjust for specific movement rules
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) or O(m + n) with combinatorics |
| **Space** | O(m · n) or O(1) |

---

## 5. Key Takeaway

> **Grid path counting.** Basic = combinations. With obstacles = DP. With restricted moves = state-based DP or matrix exponentiation.
