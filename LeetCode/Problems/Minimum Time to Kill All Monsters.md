# 2403. Minimum Time to Kill All Monsters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-kill-all-monsters](https://leetcode.com/problems/minimum-time-to-kill-all-monsters)
**Companies:** Trilogy

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Bitmask DP — O(n · 2ⁿ)](#4-approach-bitmask-dp--on--2ⁿ)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given `n` monsters with power levels, your damage increases after each kill (damage = number killed + 1). Time to kill monster `i` = `⌈power[i] / damage⌉`. Return the **minimum** total time.

**Constraints:**
- `1 <= n <= 17`

---

## 2. Examples

| monsters (power) | optimal order | minimum time |
|------------------|---------------|--------------|
| `[9,5,3]` | kill 3 → 5 → 9 | `⌈3/1⌉ + ⌈5/2⌉ + ⌈9/3⌉ = 3 + 3 + 3 = 9` |
| `[4,4,4]` | any order | `⌈4/1⌉ + ⌈4/2⌉ + ⌈4/3⌉ = 4 + 2 + 2 = 8` |

---

## 3. Key Insight

> Kill order matters because damage grows. With `n ≤ 17`, use **bitmask DP**: `dp[mask]` = min time to kill the monsters in `mask`. When `popcount(mask) = k`, damage = `k + 1` for the next kill.

---

## 4. Approach: Bitmask DP — O(n · 2ⁿ) ✅

```text
FUNCTION minimumTime(power):
    n ← LENGTH(power)
    dp[0 ← 0] ← 0
    FOR mask ← 0 TO (1 << n) - 1:
        killed ← POPCOUNT(mask)
        damage ← killed + 1
        FOR i ← 0 TO n - 1:
            IF mask & (1 << i): CONTINUE
            time ← CEIL(power[i] / damage)
            newMask ← mask | (1 << i)
            dp[newMask] ← MIN(dp[newMask], dp[mask] + time)
    RETURN dp[(1 << n) - 1]
```

---

## 5. Walkthrough

Consider `power = [9,5,3]`.

1. **Initial state** `mask = 0`, `killed = 0`, `damage = 1`.
2. Try killing monster 2 (power 3): `time = ⌈3/1⌉ = 3`, new `mask = 100`.
3. From `mask = 100`, `killed = 1`, `damage = 2`.
   - Kill monster 1 (power 5): `time = ⌈5/2⌉ = 3`, new `mask = 110`.
4. From `mask = 110`, `killed = 2`, `damage = 3`.
   - Kill monster 0 (power 9): `time = ⌈9/3⌉ = 3`, final `mask = 111`.
5. Total time = `3 + 3 + 3 = 9`, which is optimal.

The DP table records the minimum time for each subset, guaranteeing the best ordering.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 2ⁿ) |
| **Space** | O(2ⁿ) |

---

## 7. Follow-Up Questions

- How would the solution change if `n` were up to 10⁵? (Consider greedy or sorting strategies.)
- What if the damage increase rule were non‑linear, e.g., `damage = (killed)^2 + 1`?
- Can this approach be adapted for a variant where monsters have shields that reduce damage?

---

## 8. Key Takeaway

> **Bitmask DP for order‑dependent optimization.** When the cost of each action depends on how many prior actions have been taken, and `n` is small, bitmask DP enumerates all orderings efficiently.
