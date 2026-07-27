# 3138. Minimum Length of Anagram Concatenation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-length-of-anagram-concatenation](https://leetcode.com/problems/minimum-length-of-anagram-concatenation)
**Companies:** Turing, Ukg

---

## Problem Description

Given string `s`, find the **minimum length** `k` such that `s` can be formed by concatenating anagrams of some string of length `k`.

## Key Insight

> `k` must divide `n`. For each divisor `k` of `n`, check if all `n/k` chunks of length `k` are anagrams of each other (same character frequency).

## Approach: Check Divisors — O(n · d(n)) ✅

```
FUNCTION minAnagramLength(s):
    n ← len(s)
    FOR k IN divisors of n (ascending):
        // Check if all chunks of length k are anagrams
        baseFreq ← frequency of s[0..k-1]
        valid ← true
        FOR i ← k TO n-1 STEP k:
            IF frequency(s[i..i+k-1]) ≠ baseFreq:
                valid ← false; BREAK
        IF valid: RETURN k
    RETURN n
```

| Time | Space |
|------|-------|
| O(n · d(n)) | O(26) |

## Key Takeaway

> The smallest repeating anagram unit must have length dividing `n`. Check divisors in ascending order — the first valid one is the answer.
