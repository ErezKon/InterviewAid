# 2318. Number of Distinct Roll Sequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-roll-sequences](https://leetcode.com/problems/number-of-distinct-roll-sequences)
**Companies:** Servicenow

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP with Last Two Rolls — O(n · 36)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given an integer `n`. You roll a fair 6-sided dice `n` times. Determine the total number of **distinct** sequences of rolls possible such that the following conditions are satisfied:

1. The **greatest common divisor** of any **adjacent** values in the sequence is equal to `1`.
2. There is **at least** a gap of `2` rolls between **equal** valued rolls. More formally, if the value of the `i^th` roll is **equal** to the value of the `j^th` roll, then `abs(i - j) > 2`.

Return *the **total number** of distinct sequences possible*. Since the answer may be very large, return it **modulo** `10⁹ + 7`.

Two sequences are considered distinct if at least one element is different.

**Constraints:**

- `1 <= n <= 10⁴`

---

## 2. Examples

```
Example 1:
  Input: n = 4
  Output: 184
  Explanation: Some of the possible sequences are (1, 2, 3, 4), (6, 1, 2, 3), (1, 2, 3, 1), etc.
  Some invalid sequences are (1, 2, 1, 3), (1, 2, 3, 6).
  (1, 2, 1, 3) is invalid since the first and third roll have an equal value and abs(1 - 3) = 2 (i and j are 1-indexed).
  (1, 2, 3, 6) is invalid since the greatest common divisor of 3 and 6 = 3.
  There are a total of 184 distinct sequences possible, so we return 184.
```

```
Example 2:
  Input: n = 2
  Output: 22
  Explanation: Some of the possible sequences are (1, 2), (2, 1), (3, 2).
  Some invalid sequences are (3, 6), (2, 4) since the greatest common divisor is not equal to 1.
  There are a total of 22 distinct sequences possible, so we return 22.
```

---

## 3. Key Insight

> State depends on the last two rolls. `dp[i][prev][prevprev]` = ways to reach position `i` ending with `(prev, prevprev)`. Constraints: `curr ≠ prev`, `curr ≠ prevprev`, `gcd(curr, prev) == 1`.

---

## 4. Approach: DP with Last Two Rolls — O(n · 36) ✅

```text
FUNCTION distinctSequences(n):
    MOD ← 10^9 + 7
    // dp[prev][prevprev] = number of sequences ending with these two values
    // Transition: try all curr where curr != prev, curr != prevprev, gcd(curr, prev) == 1
    // Base cases: n=1 → 6, n=2 → count valid pairs
    // Iterate for each position 3..n
    RETURN SUM(dp[all states])
```

---

## 5. Walkthrough

Consider `n = 3`.

1. **Initialize**: For position 1, each face (1‑6) has count 1.
2. **Position 2**: For each previous face `p`, choose any `c` ≠ `p`. This yields `6 × 5 = 30` pairs.
3. **Position 3**: For each pair `(prev, prevprev)`, iterate possible `curr`:
   - `curr` must differ from `prev` and `prevprev`.
   - `gcd(curr, prev) == 1` (coprime condition).
   - Count valid `curr` for each pair and accumulate.
4. **Sum** all counts for position 3 → 150.

The DP table only stores 6 × 6 = 36 states, making the transition cheap.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 36) |
| **Space** | O(36) — only need current and previous |

---

## 7. Key Takeaway

> **DP on last two states with GCD constraint.** Only 36 possible `(prev, prevprev)` states. Precompute valid transitions for efficiency.
