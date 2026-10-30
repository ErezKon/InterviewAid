# 1155. Number of Dice Rolls With Target Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-dice-rolls-with-target-sum](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum)
**Companies:** Amazon, Citadel, Coindcx, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(n · target · k)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You have `n` dice, and each dice has `k` faces numbered from `1` to `k`.

Given three integers `n`, `k`, and `target`, return *the number of possible ways (out of the* `k^n` *total ways) to roll the dice, so the sum of the face-up numbers equals* `target`. Since the answer may be too large, return it **modulo** `10⁹ + 7`.

**Constraints:**

- `1 <= n, k <= 30`
- `1 <= target <= 1000`

---

## 2. Examples

```
Example 1:
  Input: n = 1, k = 6, target = 3
  Output: 1
  Explanation: You throw one die with 6 faces.
  There is only one way to get a sum of 3.
```

```
Example 2:
  Input: n = 2, k = 6, target = 7
  Output: 6
  Explanation: You throw two dice, each with 6 faces.
  There are 6 ways to get a sum of 7: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1.
```

```
Example 3:
  Input: n = 30, k = 30, target = 500
  Output: 222616187
  Explanation: The answer must be returned modulo 10^9 + 7.
```

---

## 3. Key Insight

> Classic bounded knapsack / coin change variant. `dp[t]` = ways to reach sum `t` using dice rolled so far. For each new die, try all faces 1..k.

---

## 4. Approach: DP — O(n · target · k) ✅

```text
FUNCTION numRollsToTarget(n, k, target):
    MOD ← 1_000_000_007
    dp ← ARRAY[0..target] INITIALIZED TO 0
    dp[0] ← 1

    FOR die ← 1 TO n:
        newDp ← ARRAY[0..target] INITIALIZED TO 0
        FOR t ← 1 TO target:
            FOR face ← 1 TO MIN(k, t):
                newDp[t] ← (newDp[t] + dp[t - face]) MOD MOD
        dp ← newDp

    RETURN dp[target]
```

---

## 5. Walkthrough

**Example:** `n = 2, k = 6, target = 7`

1. Initialize `dp[0] = 1`.
2. First die:
   - `newDp[1..6]` become 1 (each face yields one way).
   - `dp = [1,1,1,1,1,1,1]` (indices 0‑6).
3. Second die:
   - For each target `t` from 1 to 7, sum contributions from previous `dp[t‑face]`.
   - `newDp[7] = dp[6] + dp[5] + dp[4] + dp[3] + dp[2] + dp[1] = 1+1+1+1+1+1 = 6`.
4. Result `dp[7] = 6`, matching the six possible pairs.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · target · k) |
| **Space** | O(target) — rolling array |

---

## 7. Follow-Up Questions

- How can you reduce the inner loop using prefix sums to achieve O(n·target) time?
- What changes if each die has a different number of faces?
- Can you extend the solution to return the actual combinations, not just the count?

---

## 8. Key Takeaway

> **Bounded knapsack DP.** Each die adds one item with value 1..k. Rolling array optimization keeps only the previous DP row. Prefix‑sum tricks can further speed up the computation.
