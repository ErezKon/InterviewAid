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

Roll a die `n` times. Adjacent rolls must differ, and rolls two apart must not be equal. Count distinct valid sequences mod 10⁹+7.

---

## 2. Examples

| n | Output |
|---|--------|
| 1 | 6 |
| 2 | 30 |
| 3 | 150 |

*Explanation*: For `n = 1` any of the 6 faces is valid. For `n = 2` we must choose two different faces, giving `6 × 5 = 30` sequences. For `n = 3` we must avoid equal faces two apart and also ensure adjacent faces differ; enumerating yields 150 valid sequences.

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
