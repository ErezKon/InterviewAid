# 2514. Count Anagrams

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-anagrams](https://leetcode.com/problems/count-anagrams)
**Companies:** Mathworks

---

## 1. Problem Description

You are given a string `s` containing one or more words. Every consecutive pair of words is separated by a single space `' '`.

A string `t` is an **anagram** of string `s` if the `i`-th word of `t` is a **permutation** of the `i`-th word of `s`.

- For example, `"acb dfe"` is an anagram of `"abc def"`, but `"def cab"` and `"adc bef"` are not.

Return *the number of **distinct anagrams** of* `s`. Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters and spaces `' '`.
- There is single space between consecutive words.

---

## 2. Key Insight

> For each word of length `L` with character frequencies `f1, f2, ...`, the number of distinct anagrams is `L! / (f1! × f2! × ...)`. Multiply across all words (independent rearrangements).

---

## 3. Approach: Multinomial Coefficients — O(total length) ✅

```text
FUNCTION countAnagrams(s):
    SET MOD ← 1_000_000_007
    SET result ← 1
    FOR word IN split(s, " "):
        SET freqMap ← characterFrequencies(word)
        SET result ← result * factorial(len(word)) MOD MOD
        FOR f IN values(freqMap):
            SET result ← result * modInverse(factorial(f), MOD) MOD MOD
    RETURN result
```

Precompute factorials and inverse factorials up to max word length.

| Time | Space |
|------|-------|
| O(n) where n = total string length | O(n) |

---

## Examples

```
Example 1:
  Input: s = "too hot"
  Output: 18
  Explanation: Some of the anagrams of the given string are "too hot", "oot hot", "oto toh", "too toh", and "too oht".
```

```
Example 2:
  Input: s = "aa"
  Output: 1
  Explanation: There is only one anagram possible for the given string.
```

---

## Walkthrough

Take Example 2 (`"aab aa"`).
1. Split into words: ["aab", "aa"].
2. Word "aab": length 3, frequencies {a:2, b:1}. Permutations = 3! / (2!·1!) = 6 / 2 = 3.
3. Word "aa": length 2, frequencies {a:2}. Permutations = 2! / 2! = 1.
4. Multiply results: 3 × 1 = 3 → final answer.

---

## Complexity Analysis

- **Time:** O(n) – each character is processed once to build frequency maps.
- **Space:** O(k) – additional space for frequency map of a word, where k ≤ word length.

---

## Follow-Up Questions

1. How would the solution change if the words could share letters (global rearrangement across the whole sentence)?
2. Can you adapt the algorithm to handle very large strings where precomputing factorials up to the maximum length is infeasible?
3. What if the modulo were a non‑prime number? How would you compute modular inverses?

---

## Key Takeaway

> Counting distinct anagrams reduces to a multinomial coefficient per word; using modular arithmetic and pre‑computed factorials enables an O(n) solution.
