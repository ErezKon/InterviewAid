# 1220. Count Vowels Permutation

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-vowels-permutation](https://leetcode.com/problems/count-vowels-permutation)
**Companies:** Mathworks

---

## Problem Description

Given an integer `n`, your task is to count how many strings of length `n` can be formed under the following rules:

- Each character is a lower case vowel (`'a'`, `'e'`, `'i'`, `'o'`, `'u'`)
- Each vowel `'a'` may only be followed by an `'e'`.
- Each vowel `'e'` may only be followed by an `'a'` or an `'i'`.
- Each vowel `'i'` **may not** be followed by another `'i'`.
- Each vowel `'o'` may only be followed by an `'i'` or a `'u'`.
- Each vowel `'u'` may only be followed by an `'a'`.

Since the answer may be too large, return it modulo `10^9 + 7`.

**Constraints:**
- `1 <= n <= 2 * 10^4`

---

## Examples

```
Example 1:
  Input: n = 1
  Output: 5
  Explanation: All possible strings are: "a", "e", "i", "o" and "u".
```

```
Example 2:
  Input: n = 2
  Output: 10
  Explanation: All possible strings are: "ae", "ea", "ei", "ia", "ie", "io", "iu", "oi", "ou" and "ua".
```

```
Example 3:
  Input: n = 5
  Output: 68
```

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
3. What is the space-optimal version if `n` can be up to 10⁹ (use matrix exponentiation)?

---

## Key Takeaway

> **Vowel permutation with transition rules: reverse the rules to get "who can precede me" and apply simple DP. Only 5 states needed, so O(1) space with rolling variables.**