# 3317. Find the Number of Possible Ways for an Event

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-possible-ways-for-an-event](https://leetcode.com/problems/find-the-number-of-possible-ways-for-an-event)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Combinatorics with Stirling Numbers — O(n·x) ✅](#4-approach-combinatorics-with-stirling-numbers)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given `n` performers, `x` acts, and `y` scores, count the number of ways to assign performers to acts and scores to acts. Each act must have ≥ 1 performer. Performers are distinguishable.

**Constraints:**
- `1 <= n, x, y <= 1000`
- Answer modulo `10^9+7`

---

## 2. Examples

**Example 1:**
```
n = 3, x = 2, y = 2
```
Possible assignments:
- Choose 1 act out of 2 → `C(2,1)=2`
- Partition 3 performers into 1 group → `S(3,1)=1`
- Assign one of 2 scores → `2^1=2`
Ways = `2 * 1 * 2 = 4`

**Example 2:**
```
n = 2, x = 2, y = 3
```
- Use both acts (`k=2`): `C(2,2)=1`
- Partition 2 performers into 2 groups → `S(2,2)=1`
- Assign scores → `3^2=9`
Ways = `1 * 1 * 9 = 9`

---

## 3. Key Insight

> For a fixed number `k` of used acts (1 ≤ k ≤ min(n,x)), the total ways are:
> `C(x, k) × S(n, k) × y^k`.
> Summing over all feasible `k` yields the answer.

---

## 4. Approach: Combinatorics with Stirling Numbers — O(n·x) ✅

```text
FUNCTION numberOfWays(n, x, y):
    SET MOD ← 1_000_000_007
    // Pre‑compute factorials and inverse factorials for binomial coefficients
    PRECOMPUTE fact[0..x], invFact[0..x]
    // DP for Stirling numbers of the second kind S(i, j)
    SET S[0][0] ← 1
    FOR i ← 1 TO n DO
        FOR j ← 1 TO MIN(i, x) DO
            SET S[i][j] ← (j * S[i-1][j] + S[i-1][j-1]) MOD MOD
    SET result ← 0
    FOR k ← 1 TO MIN(n, x) DO
        SET comb ← fact[x] * invFact[k] * invFact[x-k] MOD MOD   // C(x, k)
        SET ways ← comb * S[n][k] MOD MOD
        SET ways ← ways * pow(y, k, MOD) MOD MOD                // y^k
        SET result ← (result + ways) MOD MOD
    RETURN result
```

---

## 5. Walkthrough

Take Example 1 (`n=3, x=2, y=2`):

| k (used acts) | C(x,k) | S(n,k) | y^k | Contribution |
|---------------|--------|--------|-----|--------------|
| 1             | 2      | 1      | 2   | 2 × 1 × 2 = 4 |
| 2             | 1      | 3      | 4   | 1 × 3 × 4 = 12 |
Total = 4 + 12 = 16 (mod MOD). The algorithm computes `S[3][1]=1`, `S[3][2]=3`, then aggregates as shown.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n·x) — DP for Stirling numbers and summation |
| **Space** | O(n·x) for DP table |

---

## 7. Follow-Up Questions

1. How would the solution change if acts could be empty?
2. Can the DP be reduced to O(min(n,x)) space using rolling arrays?
3. What if the scores themselves had constraints (e.g., limited repetitions)?

---

## 8. Key Takeaway

> Decomposing the problem by the number of used acts and using Stirling numbers of the second kind turns a combinatorial explosion into a manageable DP with linear‑time summation.
