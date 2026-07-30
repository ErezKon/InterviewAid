
# 70. Climbing Stairs

**Difficulty:** 🟢 Easy
**Acceptance:** 54.1%
**LeetCode:** [https://leetcode.com/problems/climbing-stairs](https://leetcode.com/problems/climbing-stairs)
**Companies:** Accenture, Accolite, Adobe, Agoda, Amazon, Amd, Apple, Barclays, Blackrock, Bloomberg, Bytedance, Citadel, Cognizant, Deloitte, Disney, Fractal Analytics, Goldman Sachs, Google, Grammarly, Hpe, Hsbc, Ibm, Infosys, Intuit, Josh Technology, Medianet, Meta, Microsoft, Nvidia, Oracle, Paypal, Qualcomm, Rakuten, Tcs, Tiktok, Uber, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight: Fibonacci](#3-key-insight-fibonacci)
4. [Approach 1: Recursion (Naive) — O(2^n)](#4-approach-1-recursion-naive--o2n)
5. [Approach 2: DP Bottom-Up — O(n) / O(n)](#5-approach-2-dp-bottom-up--on--on)
6. [Approach 3: Space-Optimized — O(n) / O(1) ✅](#6-approach-3-space-optimized--on--o1-)
7. [Walkthrough](#7-walkthrough)
8. [Complexity Analysis](#8-complexity-analysis)
9. [Follow-Up Questions](#9-follow-up-questions)

---

## 1. Problem Description

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb **1** or **2** steps. In how many **distinct ways** can you climb to the top?

---

## 2. Examples

```
Example 1:
  Input:  n = 2
  Output: 2
  Ways:   1+1, 2

Example 2:
  Input:  n = 3
  Output: 3
  Ways:   1+1+1, 1+2, 2+1
```

---

## 3. Key Insight: Fibonacci

To reach step `n`, you came from either step `n-1` (1 step) or step `n-2` (2 steps).

```
ways(n) = ways(n-1) + ways(n-2)
```

This is the **Fibonacci sequence**: 1, 1, 2, 3, 5, 8, 13, 21, ...

---

## 4. Approach 1: Recursion (Naive) — O(2^n)

```
FUNCTION climbStairsNaive(n):
    IF n <= 1:
        RETURN 1
    RETURN climbStairsNaive(n - 1) + climbStairsNaive(n - 2)
```

Exponential time due to overlapping subproblems. **Do not use this.**

---

## 5. Approach 2: DP Bottom-Up — O(n) / O(n)

```
FUNCTION climbStairsDP(n):
    IF n <= 1: RETURN 1

    dp = ARRAY of n + 1
    dp[0] = 1
    dp[1] = 1

    FOR i ← 2 TO n:
        dp[i] = dp[i-1] + dp[i-2]

    RETURN dp[n]
```

---

## 6. Approach 3: Space-Optimized — O(n) / O(1) ✅

We only need the last two values.

```
FUNCTION climbStairs(n):
    IF n <= 1: RETURN 1

    prev2 = 1        // ways(0)
    prev1 = 1        // ways(1)

    FOR i ← 2 TO n:
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    RETURN prev1
```

---

## 7. Walkthrough

```
n = 5

i=2: current=1+1=2   prev2=1, prev1=2
i=3: current=2+1=3   prev2=2, prev1=3
i=4: current=3+2=5   prev2=3, prev1=5
i=5: current=5+3=8   prev2=5, prev1=8

Result: 8 ✅

Verification:
  11111, 1112, 1121, 1211, 2111, 122, 212, 221 → 8 ways
```

---

## 8. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Naive Recursion | O(2^n) | O(n) call stack |
| DP Array | O(n) | O(n) |
| **Space-Optimized** | **O(n)** | **O(1)** |
| Matrix Exponentiation | O(log n) | O(1) |

---

## 9. Follow-Up Questions

### 9.1 What if you can climb 1, 2, or 3 steps?

```
dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
```

Generalize with a window of size 3. **LeetCode #1137 (Tribonacci)**.

### 9.2 What if you can climb any of k different step sizes?

```
FUNCTION climbStairsK(n, steps):
    dp = ARRAY of n + 1, all zeros
    dp[0] = 1

    FOR i ← 1 TO n:
        FOR each step IN steps:
            IF i - step >= 0:
                dp[i] += dp[i - step]

    RETURN dp[n]
```

This is the **Coin Change II** problem (count ways, not min coins).

### 9.3 Min Cost Climbing Stairs (LeetCode #746)

Each step has a cost. Find the minimum cost to reach the top:

```
FUNCTION minCostClimbingStairs(cost):
    prev2 = 0
    prev1 = 0

    FOR i ← 2 TO n:
        current = MIN(prev1 + cost[i-1], prev2 + cost[i-2])
        prev2 = prev1
        prev1 = current

    RETURN prev1
```

### 9.4 How is this related to Fibonacci?

`climbStairs(n) = fib(n+1)` where `fib(1) = fib(2) = 1`.

For O(log n) solution, use **matrix exponentiation**:

```
| F(n+1) |   | 1 1 |^n   | F(1) |
| F(n)   | = | 1 0 |   × | F(0) |
```

Matrix power via repeated squaring gives O(log n) time.

---

## Key Takeaway

> Climbing Stairs is the simplest **1D DP problem** — the entry point to dynamic programming. The recurrence `f(n) = f(n-1) + f(n-2)` generalizes to many problems: coin change, decode ways, house robber, etc. Always look for the **overlap between subproblems** and **optimal substructure**.
