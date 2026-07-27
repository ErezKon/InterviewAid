
# 322. Coin Change

**Difficulty:** 🟡 Medium
**Acceptance:** 46.1%
**LeetCode:** [https://leetcode.com/problems/coin-change](https://leetcode.com/problems/coin-change)
**Companies:** Accenture, Accolite, Adobe, Affirm, Agoda, Amazon, Apple, Bloomberg, C3 Ai, Capgemini, Datadog, Deloitte, Deutsche Bank, Epam Systems, Fractal Analytics, Geico, Goldman Sachs, Google, Ibm, Infosys, Intuit, Jpmorgan, Mastercard, Meta, Microsoft, Morgan Stanley, Netflix, Oracle, Paypal, Phonepe, Pinterest, Salesforce, Samsung, Sap, Servicenow, Sigmoid, Squarepoint Capital, Tiktok, Uber, Walmart Labs, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Why Greedy Fails](#3-why-greedy-fails)
4. [Solution: DP Bottom-Up — O(n × amount) ✅](#4-solution-dp-bottom-up--on--amount-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an integer array `coins` representing coin denominations and an integer `amount`, return the **fewest number of coins** needed to make up that amount. If it cannot be made, return `-1`.

You may use each coin denomination an **unlimited** number of times.

---

## 2. Examples

```
Example 1:
  Input:  coins = [1, 5, 11], amount = 15
  Output: 3
  Reason: 5 + 5 + 5 = 15

Example 2:
  Input:  coins = [2], amount = 3
  Output: -1

Example 3:
  Input:  coins = [1], amount = 0
  Output: 0
```

---

## 3. Why Greedy Fails

Greedy (always pick the largest coin) doesn't work:

```
coins = [1, 5, 11], amount = 15

Greedy: 11 + 1 + 1 + 1 + 1 = 15  →  5 coins ✗
Optimal: 5 + 5 + 5 = 15          →  3 coins ✓
```

---

## 4. Solution: DP Bottom-Up — O(n × amount) ✅

### Recurrence

```
dp[a] = minimum coins to make amount a

dp[0] = 0                          // base case
dp[a] = MIN( dp[a - coin] + 1 )   for each coin where coin <= a
```

### Pseudocode

```
FUNCTION coinChange(coins, amount):
    dp = ARRAY of (amount + 1), filled with INFINITY
    dp[0] = 0

    FOR a ← 1 TO amount:
        FOR each coin IN coins:
            IF coin <= a AND dp[a - coin] + 1 < dp[a]:
                dp[a] = dp[a - coin] + 1

    RETURN dp[amount] IF dp[amount] != INFINITY ELSE -1
```

---

## 5. Walkthrough

```
coins = [1, 5, 11], amount = 15

dp[0]  = 0
dp[1]  = dp[0]+1  = 1     (use coin 1)
dp[2]  = dp[1]+1  = 2     (1+1)
dp[3]  = dp[2]+1  = 3     (1+1+1)
dp[4]  = dp[3]+1  = 4     (1+1+1+1)
dp[5]  = MIN(dp[4]+1, dp[0]+1) = 1  (use coin 5)
dp[6]  = MIN(dp[5]+1, dp[1]+1) = 2  (5+1)
dp[7]  = 3                (5+1+1)
dp[8]  = 4                (5+1+1+1)
dp[9]  = 5                (5+1+1+1+1)
dp[10] = MIN(dp[9]+1, dp[5]+1) = 2  (5+5)
dp[11] = MIN(dp[10]+1, dp[6]+1, dp[0]+1) = 1  (use coin 11)
dp[12] = MIN(dp[11]+1, dp[7]+1, dp[1]+1) = 2  (11+1)
dp[13] = 3
dp[14] = 4
dp[15] = MIN(dp[14]+1, dp[10]+1, dp[4]+1)
       = MIN(5, 3, 5)
       = 3  (5+5+5) ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(amount × n) where n = number of coin types |
| **Space** | O(amount) |

---

## 7. Follow-Up Questions

### 7.1 Coin Change II (LeetCode #518) — Count ways

Count the **number of combinations** (not minimum coins):

```
FUNCTION change(amount, coins):
    dp = ARRAY of (amount + 1), all zeros
    dp[0] = 1

    FOR each coin IN coins:              // iterate coins in outer loop!
        FOR a ← coin TO amount:
            dp[a] += dp[a - coin]

    RETURN dp[amount]
```

**Key difference:** Outer loop iterates over coins (not amounts) to avoid counting permutations as different combinations. `[1,5]` and `[5,1]` are the same combination.

### 7.2 How to reconstruct which coins were used?

Track the coin chosen at each amount:

```
FUNCTION coinChangeWithPath(coins, amount):
    dp   = ARRAY of (amount + 1), filled with INFINITY
    used = ARRAY of (amount + 1), filled with -1
    dp[0] = 0

    FOR a ← 1 TO amount:
        FOR each coin IN coins:
            IF coin <= a AND dp[a - coin] + 1 < dp[a]:
                dp[a] = dp[a - coin] + 1
                used[a] = coin

    // Reconstruct
    IF dp[amount] == INFINITY: RETURN -1

    result = []
    a = amount
    WHILE a > 0:
        result.ADD(used[a])
        a -= used[a]

    RETURN result
```

### 7.3 What if each coin can only be used once?

This is the **0/1 Knapsack** problem variant. Iterate amounts in **reverse**:

```
FOR each coin IN coins:
    FOR a ← amount DOWNTO coin:
        dp[a] = MIN(dp[a], dp[a - coin] + 1)
```

### 7.4 What about the unbounded knapsack relationship?

Coin Change is a special case of the **Unbounded Knapsack** problem where:
- Items = coins (unlimited supply)
- Weight = coin denomination
- Objective = minimize count (instead of maximize value)

The DP structure is identical.

### 7.5 Perfect Squares (LeetCode #279)

Find the minimum number of perfect squares that sum to `n`. Same as Coin Change where coins = `[1, 4, 9, 16, 25, ...]`.

```
FUNCTION numSquares(n):
    dp = ARRAY of (n + 1), filled with INFINITY
    dp[0] = 0

    FOR i ← 1 TO n:
        j = 1
        WHILE j * j <= i:
            dp[i] = MIN(dp[i], dp[i - j*j] + 1)
            j += 1

    RETURN dp[n]
```

---

## DP Problem Family (Unbounded Knapsack)

| Problem | Objective | Items per type |
|---------|-----------|---------------|
| **Coin Change** (#322) | Min coins | Unlimited |
| **Coin Change II** (#518) | Count ways | Unlimited |
| **Perfect Squares** (#279) | Min squares | Unlimited |
| **0/1 Knapsack** | Max value | One each |
| **Word Break** (#139) | Feasibility | Unlimited |

---

## Key Takeaway

> Coin Change is the quintessential **unbounded knapsack DP** problem. The recurrence `dp[a] = min(dp[a - coin] + 1)` is clean and generalizable. The key skill is recognizing when a problem reduces to "minimum/count ways to reach a target from a set of choices" — that's your cue for this DP pattern.
