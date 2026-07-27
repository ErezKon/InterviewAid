# 2318. Number of Distinct Roll Sequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-roll-sequences](https://leetcode.com/problems/number-of-distinct-roll-sequences)
**Companies:** Servicenow

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP with Last Two Rolls — O(n · 36)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Roll a die `n` times. Adjacent rolls must differ, and rolls two apart must not be equal. Count distinct valid sequences mod 10⁹+7.

---

## 2. Key Insight

> State depends on the last two rolls. `dp[i][prev][prevprev]` = ways to reach position `i` ending with `(prev, prevprev)`. Constraints: `curr ≠ prev`, `curr ≠ prevprev`, `gcd(curr, prev) == 1`.

---

## 3. Approach: DP with Last Two Rolls — O(n · 36) ✅

```
FUNCTION distinctSequences(n):
    MOD = 10^9 + 7
    // dp[prev][prevprev] = number of sequences ending with these two values
    // Transition: try all curr where curr != prev, curr != prevprev, gcd(curr, prev) == 1
    // Base cases: n=1 → 6, n=2 → count valid pairs
    // Iterate for each position 3..n
    RETURN SUM(dp[all states])
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 6²) = O(36n) |
| **Space** | O(36) — only need current and previous |

---

## 5. Key Takeaway

> **DP on last two states with GCD constraint.** Only 36 possible (prev, prevprev) states. Precompute valid transitions for efficiency.
