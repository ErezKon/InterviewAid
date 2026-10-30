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

You are given a string `s` and an integer `k`. Your task is to find the **maximum** difference between the frequency of **two** characters, `freq[a] - freq[b]`, in a substring `subs` of `s`, such that:

- `subs` has a size of **at least** `k`.
- Character `a` has an *odd frequency* in `subs`.
- Character `b` has a **non-zero** *even frequency* in `subs`.

Return the **maximum** difference.

**Note** that `subs` can contain more than 2 **distinct** characters.

**Constraints:**
- `3 <= s.length <= 3 * 10^4`
- `s` consists only of digits `'0'` to `'4'`.
- The input is generated that at least one substring has a character with an even frequency and a character with an odd frequency.
- `1 <= k <= s.length`

---

## Examples

**Example 1:**
```
Input: s = "12233", k = 4
Output: -1
Explanation: For the substring "12233", the frequency of '1' is 1 and the frequency of '3' is 2. The difference is 1 - 2 = -1.
```

**Example 2:**
```
Input: s = "1122211", k = 3
Output: 1
Explanation: For the substring "11222", the frequency of '2' is 3 and the frequency of '1' is 2. The difference is 3 - 2 = 1.
```

**Example 3:**
```
Input: s = "110", k = 3
Output: -1
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
