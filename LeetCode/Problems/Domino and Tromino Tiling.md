# 790. Domino and Tromino Tiling

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/domino-and-tromino-tiling](https://leetcode.com/problems/domino-and-tromino-tiling)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP with Recurrence](#approach-dp-with-recurrence--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer `n`, return the number of ways to tile a `2 × n` board using **dominoes** (2×1) and **trominoes** (L-shaped, covering 3 cells). Return the answer modulo `10⁹ + 7`.

```
Domino:  ██    Tromino:  ██
         ██              █
                  (and 3 other rotations)
```

**Constraints:**
- `1 <= n <= 1000`

---

## Examples

```
Input: n = 3
Output: 5
Explanation: The 5 tilings of a 2×3 board:
  |██|█|  |█|██|  |█|█|  |██ |  | ██|
  |██|█|  |█|██|  |█|█|  | ██|  |██ |
  (VVV)   (VVV)   (HHH)  (tromino pair 1) (tromino pair 2)

Input: n = 1
Output: 1
```

---

## Key Insight

> The recurrence `f(n) = 2·f(n-1) + f(n-3)` captures all valid tiling transitions. At column n, you can:
> - Place a vertical domino → reduces to `f(n-1)`
> - Place two horizontal dominoes → reduces to `f(n-2)` (but this is subsumed)
> - Place a tromino pair that spans 3 columns → adds `f(n-3)` paths
>
> The factor of 2 on `f(n-1)` accounts for both domino orientations and the tromino "continuation" states.

---

## Approach: DP with Recurrence — O(n) ✅

```
FUNCTION numTilings(n):
    MOD = 10^9 + 7
    IF n <= 2: RETURN n
    dp = [0] * (n + 1)
    dp[1] = 1; dp[2] = 2; dp[3] = 5
    FOR i ← 4 TO n:
        dp[i] = (2 * dp[i-1] + dp[i-3]) % MOD
    RETURN dp[n]
```

**Derivation of f(n) = 2·f(n-1) + f(n-3):**
- Full states (both rows complete up to column i): `f(i)`
- From `f(i-1)`: add vertical domino (1 way) + tromino that creates a partial state resolved next step → combined factor 2
- From `f(i-3)`: a tromino pair that spans exactly 3 columns

---

## Walkthrough

```
n = 5

dp[1] = 1
dp[2] = 2
dp[3] = 5
dp[4] = 2×5 + 1 = 11
dp[5] = 2×11 + 2 = 24

Answer: 24 ✅
```

Visual verification for n=3 (5 tilings):
```
1. ||−   2. −||   3. |||   4. ⌐−|   5. |−⌐
   ||−      −||      |||      |−⌐      ⌐−|
(2 vert+    (same    (3      (tromino  (tromino
 1 horiz)  flipped)  horiz)  pair L)   pair R)
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(n) | Single pass through dp array |
| **Space** | O(n) | dp array (can optimize to O(1) with 3 variables) |

---

## Follow-Up Questions

**Q1: Can you reduce space to O(1)?**
> Yes — only need `dp[i-1]` and `dp[i-3]`, so keep 3 rolling variables.

**Q2: How do you derive the recurrence rigorously?**
> Model partial states: "both rows filled to column i" and "one row extends one cell past the other". Write transitions between states. After eliminating the partial states, you get `f(n) = 2f(n-1) + f(n-3)`.

**Q3: What if we only had dominoes (no trominoes)?**
> Classic problem: `f(n) = f(n-1) + f(n-2)` — Fibonacci! Vertical domino or two horizontal ones.

---

## Key Takeaway

> **Tiling problems → define states for partial column fills, derive recurrences from valid transitions. The tromino adds `f(n-3)` to the classic domino Fibonacci recurrence.**
