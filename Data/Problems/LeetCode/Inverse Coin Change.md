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

You are given a **1-indexed** integer array `numWays`, where `numWays[i]` represents the number of ways to select a total amount `i` using an **infinite** supply of some *fixed* coin denominations. Each denomination is a **positive** integer with value **at most** `numWays.length`.

However, the exact coin denominations have been *lost*. Your task is to recover the set of denominations that could have resulted in the given `numWays` array.

Return a **sorted** array containing **unique** integers which represents this set of denominations.

If no such set exists, return an **empty** array.

**Constraints:**
- `1 <= numWays.length <= 100`
- `0 <= numWays[i] <= 2 * 10^8`

---

## 2. Examples

**Example 1:**
```
Input: numWays = [0,1,0,2,0,3,0,4,0,5]
Output: [2,4,6]
Explanation:
  Amount
  Number of ways
  Explanation
  1
  0
  There is no way to select coins with total value 1.
  2
  1
  The only way is [2].
  3
  0
  There is no way to select coins with total value 3.
  4
  2
  The ways are [2, 2] and [4].
  5
  0
  There is no way to select coins with total value 5.
  6
  3
  The ways are [2, 2, 2], [2, 4], and [6].
  7
  0
  There is no way to select coins with total value 7.
  8
  4
  The ways are [2, 2, 2, 2], [2, 2, 4], [2, 6], and [4, 4].
  9
  0
  There is no way to select coins with total value 9.
  10
  5
  The ways are [2, 2, 2, 2, 2], [2, 2, 2, 4], [2, 4, 4], [2, 2, 6], and [4, 6].
```

**Example 2:**
```
Input: numWays = [1,2,2,3,4]
Output: [1,2,5]
Explanation:
  Amount
  Number of ways
  Explanation
  1
  1
  The only way is [1].
  2
  2
  The ways are [1, 1] and [2].
  3
  2
  The ways are [1, 1, 1] and [1, 2].
  4
  3
  The ways are [1, 1, 1, 1], [1, 1, 2], and [2, 2].
  5
  4
  The ways are [1, 1, 1, 1, 1], [1, 1, 1, 2], [1, 2, 2], and [5].
```

**Example 3:**
```
Input: numWays = [1,2,3,4,15]
Output: []
Explanation: No set of denomination satisfies this array.
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
