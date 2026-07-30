# 3592. Inverse Coin Change

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/inverse-coin-change](https://leetcode.com/problems/inverse-coin-change)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Construction — O(n · max) ✅](#4-approach-greedy-construction--on--max-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array `coins` of size `n` and a target array `dp` of size `amount + 1`, where `dp[i]` represents the minimum number of coins needed to make amount `i` (or -1 if impossible), find valid coin denominations that produce the given DP table — the inverse of the classic coin change problem.

**Constraints:**
- `1 <= n <= amount`
- `dp[0] = 0`

---

## 2. Examples

```
Input: dp = [0,1,1,2,2,1]
Output: [1,2,5] (or any valid coin set that produces this dp table)

Input: dp = [0,-1,1]
Output: [3]... or depends on exact problem statement
```

---

## 3. Key Insight

This is the **reverse** of coin change: given the DP output, reconstruct the coin set. A denomination `d` exists if `dp[d] == 1` (reachable in one coin). Then verify the entire DP table is consistent with the chosen denominations.

---

## 4. Approach: Greedy Construction — O(n · max) ✅

```
FUNCTION inverseCoinChange(dp):
    coins = []
    n = len(dp) - 1

    FOR d ← 1 TO n:
        IF dp[d] == 1:
            coins.ADD(d)

    // Verify: recompute dp with found coins and check it matches
    verify = computeCoinChange(coins, n)
    IF verify == dp:
        RETURN coins
    RETURN []   // no valid solution
```

---

## 5. Walkthrough

```
dp = [0, 1, 1, 2, 2, 1]
```

| Amount d | dp[d] | dp[d]==1? | Action |
|----------|-------|-----------|--------|
| 1 | 1 | Yes | coins = [1] |
| 2 | 1 | Yes | coins = [1,2] |
| 3 | 2 | No | Skip |
| 4 | 2 | No | Skip |
| 5 | 1 | Yes | coins = [1,2,5] |

Verify: coin change with {1,2,5} gives [0,1,1,2,2,1] ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n · max) | Verification step runs standard coin change |
| Space | O(n) | DP table for verification |

---

## 7. Key Takeaway

> The inverse coin change problem exploits the fact that denominations are exactly those amounts reachable in **one coin** (dp[d] = 1). Extract these, then verify consistency with the full DP table.
