# 3445. Maximum Difference Between Even and Odd Frequency II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-ii](https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-ii)
**Companies:** Amazon, Bloomberg, Fractal Analytics, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Enumerate Pairs + Parity Prefix — O(σ² · n)](#approach-enumerate-pairs--parity-prefix--oσ²--n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string of digits and a minimum substring length `k`, find a substring where the difference `freq(a) - freq(b)` is maximized, subject to `freq(a)` being odd and `freq(b)` being even (and both > 0).

---

## Key Insight

> Enumerate all pairs (a, b) of distinct characters (at most 5×4 = 20 pairs for digits 0-4). For each pair, transform the problem: assign +1 for char a, -1 for char b, 0 for others. Use **prefix sums with parity tracking** — group prefix states by (parity of count_a, parity of count_b) and track the minimum prefix sum for each parity state to maximize the difference.

---

## Approach: Enumerate Pairs + Parity Prefix — O(σ² · n) ✅

```
FUNCTION maxDifference(s, k):
    result = -infinity
    FOR a IN unique chars:
        FOR b IN unique chars (b ≠ a):
            // Prefix sum: +1 for a, -1 for b
            prefix = 0
            minPrefix = {(parA, parB): infinity for all parity combos}
            countA = countB = 0
            FOR i ← 0 TO n - 1:
                IF s[i] == a: countA += 1; prefix += 1
                IF s[i] == b: countB += 1; prefix -= 1
                // We want odd countA, even countB in substring
                // Need prefix parity: current vs previous must differ for a, same for b
                wantParA = 1 - (countA % 2)
                wantParB = countB % 2
                IF valid window length >= k:
                    result = MAX(result, prefix - minPrefix[(wantParA, wantParB)])
                // Update min prefix for current parity state
                curPar = (countA % 2, countB % 2)
                minPrefix[curPar] = MIN(minPrefix[curPar], prefix)
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Pair enumeration + prefix | **O(σ² · n)** | O(1) |

With σ ≤ 5 (digits): O(20n) = O(n).

---

## Key Takeaway

> **Enumerate character pairs, use parity-based prefix optimization.** Group prefix sums by (parityA, parityB) to find the best substring efficiently.
