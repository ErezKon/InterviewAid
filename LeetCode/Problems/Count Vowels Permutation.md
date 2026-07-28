# 1220. Count Vowels Permutation

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-vowels-permutation](https://leetcode.com/problems/count-vowels-permutation)
**Companies:** Mathworks

---

## Problem Description

Count strings of length `n` using lowercase vowels (a, e, i, o, u) with transition rules:
- `a` can only be followed by `e`
- `e` can be followed by `a` or `i`
- `i` cannot be followed by another `i`
- `o` can be followed by `i` or `u`
- `u` can only be followed by `a`

---

## Examples

| n | Output | Explanation |
|---|--------|-------------|
| 1 | 5 | Each single vowel is a valid string. |
| 2 | 10 | Valid strings: `ae, ea, ei, ia, ie, io, iu, oa, oi, ua`. |

---

## Key Insight

State machine DP. Track the count of strings ending with each vowel. The transition rules define which vowel can **precede** each vowel (reverse the rules for easier DP).

---

## Approach

```text
FUNCTION countVowelPermutation(n):
    MOD ← 1_000_000_007
    a ← e ← i ← o ← u ← 1   // length 1 counts
    FOR step ← 2 TO n DO
        aNew ← (e + i + u) % MOD        // a follows e, i, u
        eNew ← (a + i) % MOD            // e follows a, i
        iNew ← (e + o) % MOD            // i follows e, o
        oNew ← i % MOD                  // o follows i
        uNew ← (i + o) % MOD            // u follows i, o
        a, e, i, o, u ← aNew, eNew, iNew, oNew, uNew
    RETURN (a + e + i + o + u) % MOD
```

---

## Walkthrough

For `n = 2`:

| Vowel | Count after step 1 | Count after step 2 |
|-------|-------------------|--------------------|
| a | 1 | (e + i + u) = 1 + 1 + 1 = 3 |
| e | 1 | (a + i) = 1 + 1 = 2 |
| i | 1 | (e + o) = 1 + 1 = 2 |
| o | 1 | i = 1 |
| u | 1 | (i + o) = 1 + 1 = 2 |

Sum = 3 + 2 + 2 + 1 + 2 = 10, matching the example.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would the solution change if the transition rules were given dynamically at runtime?
2. Can you extend the DP to count strings modulo a different prime or without modulo?
3. What is the space‑optimal version if `n` can be up to 10⁹ (use matrix exponentiation)?

---

## Key Takeaway

> **Vowel permutation with transition rules: reverse the rules to get "who can precede me" and apply simple DP. Only 5 states needed, so O(1) space with rolling variables.**