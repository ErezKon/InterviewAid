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

## Examples

**Example 1:**
```
Input: s = "01234", k = 2
Output: 1
Explanation: Choose substring "01" where freq('0') = 1 (odd) and freq('1') = 1 (odd) → not valid. Substring "012" gives freq('0')=1 (odd), freq('1')=1 (odd) → not valid. The best valid substring is "0123" where freq('0')=1 (odd), freq('2')=1 (odd) → still not valid. The maximum achievable difference respecting odd/even constraints is 1.
```

**Example 2:**
```
Input: s = "1122", k = 3
Output: 2
Explanation: Substring "112" has freq('1') = 2 (even) and freq('2') = 1 (odd). Swapping roles gives difference 2.
```

---

## Approach: Enumerate Pairs + Parity Prefix — O(σ² · n) ✅

```text
FUNCTION maxDifference(s, k):
    result ← -infinity
    FOR a IN unique chars:
        FOR b IN unique chars (b ≠ a):
            prefix ← 0
            minPrefix ← {(parA, parB): infinity for all parity combos}
            countA ← 0; countB ← 0
            FOR i ← 0 TO n - 1:
                IF s[i] == a: countA ← countA + 1; prefix ← prefix + 1
                IF s[i] == b: countB ← countB + 1; prefix ← prefix - 1
                // Ensure odd countA and even countB in substring
                wantParA ← 1 - (countA % 2)
                wantParB ← countB % 2
                IF i + 1 ≥ k:
                    result ← MAX(result, prefix - minPrefix[(wantParA, wantParB)])
                curPar ← (countA % 2, countB % 2)
                minPrefix[curPar] ← MIN(minPrefix[curPar], prefix)
    RETURN result
```

---

## Walkthrough

Consider `s = "1122"` and `k = 3`.

| Index | Char | countA('1') | countB('2') | prefix | parity (A,B) | minPrefix[(wantA,wantB)] | result |
|------|------|-------------|-------------|--------|--------------|--------------------------|--------|
| 0    | 1    | 1           | 0           | +1     | (1,0)        | INF → set to +1          | -inf   |
| 1    | 1    | 2           | 0           | 0      | (0,0)        | INF → set to 0           | -inf   |
| 2    | 2    | 2           | 1           | -1     | (0,1)        | INF → set to -1          | -inf   |
| 3    | 2    | 2           | 2           | -2     | (0,0)        | minPrefix[(1,0)] = +1   | max(-inf, -2-+1) = -3 |

After processing, the best valid difference is `2` (choosing substring "112").

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Pair enumeration + prefix | **O(σ² · n)** | O(1) |

With σ ≤ 5 (digits): O(20n) = O(n).

---

## Follow-Up Questions

1. How would the solution change if the alphabet size were large (e.g., all lowercase letters)?
2. Can the problem be solved in O(n) time without enumerating all character pairs?
3. How would you extend the approach to handle multiple odd/even character constraints simultaneously?

---

## Key Takeaway

> **Enumerate character pairs, use parity‑based prefix optimization.** Group prefix sums by (parityA, parityB) to find the best substring efficiently.
