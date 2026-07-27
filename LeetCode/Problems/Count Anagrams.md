# 2514. Count Anagrams

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-anagrams](https://leetcode.com/problems/count-anagrams)
**Companies:** Mathworks

---

## 1. Problem Description

Given a string `s` of words, count the total number of distinct strings that are anagrams of `s` (rearranging characters within each word independently). Return modulo 10^9+7.

---

## 2. Key Insight

> For each word of length `L` with character frequencies `f1, f2, ...`, the number of distinct anagrams is `L! / (f1! × f2! × ...)`. Multiply across all words (independent rearrangements).

---

## 3. Approach: Multinomial Coefficients — O(total length) ✅

```
FUNCTION countAnagrams(s):
    MOD = 10^9 + 7
    result = 1
    FOR word IN s.split():
        freq = Counter(word)
        result *= factorial(len(word))
        FOR f IN freq.values():
            result *= modInverse(factorial(f), MOD)
        result %= MOD
    RETURN result
```

Precompute factorials and inverse factorials up to max word length.

| Time | Space |
|------|-------|
| O(n) where n = total string length | O(n) |

---

## Key Takeaway

> Counting distinct anagrams = multinomial coefficient per word. Use modular inverse for division under modulo. Multiply results across independent words.
