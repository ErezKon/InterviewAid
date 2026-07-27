# 2954. Count the Number of Infection Sequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-infection-sequences](https://leetcode.com/problems/count-the-number-of-infection-sequences)
**Companies:** Meta, Microsoft, Oracle, Sap, Tekion, Uber

---

## Problem Description

`n` children sit in a row. Some are initially `sick`. Each second, a sick child infects an adjacent healthy child. Count distinct infection orderings modulo `10^9 + 7`.

---

## Key Insight

Gaps between sick children are independent infection groups. Each **internal gap** of length `g` can be infected from both ends, giving `2^(g-1)` orderings. **Edge gaps** (at the ends) can only be infected from one direction, giving 1 ordering each. The total count is a **multinomial coefficient** (interleaving the groups) × product of internal gap orderings.

---

## Approach: Combinatorics — O(n) ✅

```
FUNCTION numberOfSequence(n, sick):
    MOD = 10^9 + 7
    gaps = []
    // Left gap, internal gaps, right gap
    gaps.ADD(sick[0])
    FOR i ← 1 TO len(sick) - 1:
        gaps.ADD(sick[i] - sick[i-1] - 1)
    gaps.ADD(n - 1 - sick[-1])

    total = SUM(gaps)
    // Multinomial(total; gaps) * product(2^(g-1) for internal gaps)
    result = factorial(total)
    FOR g IN gaps: result /= factorial(g)
    FOR internal gaps (not first/last): result *= pow(2, g-1)
    RETURN result % MOD
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) with precomputed factorials |
| **Space** | O(n) |

---

## Key Takeaway

> **Infection sequence counting: decompose into independent gaps. Internal gaps have 2^(g-1) orderings (infected from both sides). Combine with multinomial coefficient for interleaving.**
