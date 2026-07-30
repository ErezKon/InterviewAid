# 3138. Minimum Length of Anagram Concatenation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-length-of-anagram-concatenation](https://leetcode.com/problems/minimum-length-of-anagram-concatenation)
**Companies:** Turing, Ukg

---

## Problem Description

Given string `s`, find the **minimum length** `k` such that `s` can be formed by concatenating anagrams of some string of length `k`.

## Examples

| s | Output |
|---|--------|
| "abcabc" | 3 |
| "aaaa" | 1 |
| "abacabadabacaba" | 7 |

*Explanation*: In the first example, `s` can be split into `"abc"` + `"abc"`, both anagrams of `"abc"`. The smallest possible `k` is 3.

## Approach

**Algorithm**: Enumerate divisors of `n = len(s)` and check each candidate `k` in ascending order.

For each `k`, compute the character frequency of the first `k` characters as the reference. Then verify that every subsequent block of length `k` has the same frequency. The first `k` that passes is the answer.

```text
FUNCTION minAnagramLength(s):
    SET n ← LENGTH(s)
    FOR each k IN divisors_of(n) sorted ascending:
        // reference frequency for first block
        SET baseFreq ← frequency(s[0..k-1])
        SET valid ← true
        FOR i ← k TO n-1 STEP k:
            IF frequency(s[i..i+k-1]) ≠ baseFreq:
                SET valid ← false
                BREAK
        IF valid:
            RETURN k
    RETURN n
```

## Walkthrough

Example: `s = "abcabc"`

1. `n = 6`. Divisors in order: 1, 2, 3, 6.
2. `k = 1`: baseFreq = {a:1}. Block `"b"` differs → invalid.
3. `k = 2`: baseFreq = {a:1,b:1}. Block `"ca"` differs → invalid.
4. `k = 3`: baseFreq = {a:1,b:1,c:1}. Block `"abc"` matches → valid → return 3.

## Complexity Analysis

- **Time**: O(n · d(n)) where `d(n)` is the number of divisors of `n` (at most ~O(√n)).
- **Space**: O(26) for character frequency counters (constant).

## Follow‑Up Questions

1. How would you adapt the solution if the string could contain Unicode characters beyond lowercase English letters?
2. Can you solve the problem in O(n) time without enumerating all divisors?
3. What changes are needed if the concatenated blocks are allowed to be in any order, not necessarily sequential?

## Key Takeaway

> The smallest repeating anagram unit must have a length that divides the total string length. Checking divisors in ascending order yields the minimal `k` efficiently.
