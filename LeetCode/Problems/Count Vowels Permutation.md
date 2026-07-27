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

## Key Insight

State machine DP. Track the count of strings ending with each vowel. The transition rules define which vowel can **precede** each vowel (reverse the rules for easier DP).

---

## Approach

```
FUNCTION countVowelPermutation(n):
    MOD = 10^9 + 7
    a = e = i = o = u = 1   // length 1

    FOR _ ← 2 TO n DO
        // Who can precede each vowel?
        a' = (e + i + u) % MOD        // a follows e, i, u
        e' = (a + i) % MOD            // e follows a, i
        i' = (e + o) % MOD            // i follows e, o
        o' = i % MOD                  // o follows i
        u' = (i + o) % MOD            // u follows i, o
        a, e, i, o, u = a', e', i', o', u'

    RETURN (a + e + i + o + u) % MOD
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Vowel permutation with transition rules: reverse the rules to get "who can precede me" and apply simple DP. Only 5 states needed, so O(1) space with rolling variables.**
