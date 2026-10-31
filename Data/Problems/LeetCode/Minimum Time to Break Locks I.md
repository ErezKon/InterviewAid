# 3376. Minimum Time to Break Locks I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-break-locks-i](https://leetcode.com/problems/minimum-time-to-break-locks-i)
**Companies:** Ivp

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Bitmask DP — O(n² · 2ⁿ)](#4-approach-bitmask-dp)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: the Approach below uses power `K^broken`. Officially the factor `X` starts at 1 and **increases by `K`** after each lock (energy resets), so after `b` locks `X = 1 + b·K` and the time for lock `i` is `ceil(strength[i] / (1 + b·K))`. Keep the same bitmask DP or try all permutations.*

Bob is stuck in a dungeon and must break `n` locks, each requiring some amount of **energy** to break. The required energy for each lock is stored in an array called `strength` where `strength[i]` indicates the energy needed to break the `i^th` lock.

To break a lock, Bob uses a sword with the following characteristics:

- The initial energy of the sword is 0.
- The initial factor `x` by which the energy of the sword increases is 1.
- Every minute, the energy of the sword increases by the current factor `x`.
- To break the `i^th` lock, the energy of the sword must reach **at least** `strength[i]`.
- After breaking a lock, the energy of the sword resets to 0, and the factor `x` increases by a given value `k`.

Your task is to determine the **minimum** time in minutes required for Bob to break all `n` locks and escape the dungeon.

Return the **minimum **time required for Bob to break all `n` locks.

**Constraints:**
- `n == strength.length`
- `1 <= n <= 8`
- `1 <= k <= 10`
- `1 <= strength[i] <= 10^6`

---

## 2. Examples

**Example 1:**
```
Input: strength = [3,4,1], k = 1
Output: 4
Explanation:
  Time
  Energy
  x
  Action
  Updated x
  0
  0
  1
  Nothing
  1
  1
  1
  1
  Break 3^rd Lock
  2
  2
  2
  2
  Nothing
  2
  3
  4
  2
  Break 2^nd Lock
  3
  4
  3
  3
  Break 1^st Lock
  3
The locks cannot be broken in less than 4 minutes; thus, the answer is 4.
```

**Example 2:**
```
Input: strength = [2,5,4], k = 2
Output: 5
Explanation:
  Time
  Energy
  x
  Action
  Updated x
  0
  0
  1
  Nothing
  1
  1
  1
  1
  Nothing
  1
  2
  2
  1
  Break 1^st Lock
  3
  3
  3
  3
  Nothing
  3
  4
  6
  3
  Break 2^n^d Lock
  5
  5
  5
  5
  Break 3^r^d Lock
  7
The locks cannot be broken in less than 5 minutes; thus, the answer is 5.
```

---

## 3. Key Insight

> With `n ≤ 8`, enumerate all orderings via **bitmask DP**. `dp[mask]` = min time to break the locks in `mask`. Power depends on number of locks broken = `popcount(mask)`.

---

## 4. Approach: Bitmask DP — O(n² · 2ⁿ) ✅

```text
FUNCTION findMinimumTime(strength, K):
    n ← LENGTH(strength)
    dp ← ARRAY[0 .. (1 << n) - 1] FILLED WITH INFINITY
    dp[0] ← 0
    FOR mask ← 0 TO (1 << n) - 1:
        broken ← POPCOUNT(mask)
        power ← K ^ broken  // actual power = x * K^broken in real problem
        FOR i ← 0 TO n - 1:
            IF mask AND (1 << i) ≠ 0: CONTINUE
            time ← CEIL(strength[i] / power)
            newMask ← mask OR (1 << i)
            dp[newMask] ← MIN(dp[newMask], dp[mask] + time)
    RETURN dp[(1 << n) - 1]
```

---

## 5. Walkthrough

Consider `strength = [4,6]`, `x = 1`, `K = 2`.
| mask (binary) | broken | power | choose i | time | newMask | dp value |
|---------------|--------|-------|---------|------|---------|----------|
| 00            | 0      | 1     | i=0     | ⌈4/1⌉=4 | 01      | dp[01]=4 |
| 00            | 0      | 1     | i=1     | ⌈6/1⌉=6 | 10      | dp[10]=6 |
| 01            | 1      | 2     | i=1     | ⌈6/2⌉=3 | 11      | dp[11]=7 |
| 10            | 1      | 2     | i=0     | ⌈4/2⌉=2 | 11      | dp[11]=8 (keep 7) |
Result: dp[11] = 7 seconds, the optimal total time.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 2ⁿ) |
| **Space** | O(2ⁿ) |

---

## 7. Follow-Up Questions

1. How would the approach change if `n` could be up to 20? Discuss state-compression techniques.
2. What if the power increase factor `K` varied after each lock instead of being constant?
3. Could a greedy strategy work for special cases where strengths are sorted?

---

## 8. Key Takeaway

> **Bitmask DP for small n** — when n ≤ ~20, enumerate subsets with bitmask. The power depends on how many locks are already broken, making it order-dependent and perfect for bitmask DP.
