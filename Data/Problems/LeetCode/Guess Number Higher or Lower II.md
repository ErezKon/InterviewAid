# 375. Guess Number Higher or Lower II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/guess-number-higher-or-lower-ii](https://leetcode.com/problems/guess-number-higher-or-lower-ii)
**Companies:** Bloomberg, Google, Zeta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Guessing game: pick a number 1..n, wrong guesses cost the guessed amount. Find the minimum guaranteed cost to identify the number (minimax).

---

## 2. Examples

| n | Minimum guaranteed cost |
|---|--------------------------|
| 1 | 0 |
| 2 | 1 |
| 10 | 16 |

**Explanation:**
- For `n = 1` no guess is needed, cost is `0`.
- For `n = 2` guess `1`; if wrong you pay `1` and know the answer is `2`.
- For `n = 10` the optimal strategy yields a worst‑case cost of `16`.

---

## 3. Approach

```
FUNCTION getMoneyAmount(n):
    dp = (n+2) × (n+2) zeros
    FOR length ← 2 TO n:
        FOR lo ← 1 TO n - length + 1:
            hi = lo + length - 1
            dp[lo][hi] = infinity
            FOR k ← lo TO hi:
                cost = k + MAX(dp[lo][k-1], dp[k+1][hi])
                dp[lo][hi] = MIN(dp[lo][hi], cost)
    RETURN dp[1][n]
```

---

## 4. Walkthrough

Consider `n = 4`.

| Step | Guess `k` | Cost paid | Left sub‑range | Right sub‑range | Worst‑case cost |
|------|-----------|-----------|----------------|-----------------|-----------------|
| 1 | 1 | 1 | [] | [2,4] | 1 + dp[2][4]
| 2 | 2 | 2 | [1] | [3,4] | 2 + max(dp[1][1], dp[3][4])
| 3 | 3 | 3 | [1,2] | [4] | 3 + max(dp[1][2], dp[4][4])
| 4 | 4 | 4 | [1,3] | [] | 4 + dp[1][3]

Evaluating the DP values gives `dp[1][4] = 4`, meaning the optimal worst‑case cost is `4`.

---

## 5. Complexity Analysis

- **Time:** `O(n³)` – three nested loops over interval length, start index, and guess position.
- **Space:** `O(n²)` – DP table storing results for each interval.

---

## 6. Follow-Up Questions

- How would the solution change if the cost of a guess were a constant instead of the guessed number?
- Can the DP be optimized to `O(n²)` using monotonicity of the optimal `k`?
- How does this problem relate to the classic “optimal binary search tree” problem?

---

## 7. Key Takeaway

> **Minimax interval DP**: minimize over guesses `k`, maximize over outcomes (left/right). Classic game theory DP pattern.
